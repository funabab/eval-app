import { initializeApp } from "firebase-admin/app";
import { HttpsError, onCall } from "firebase-functions/v2/https";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";
import { registerAccountBodySchema } from "../../src/schemas";
import { FirebaseError } from "@firebase/util";
import { ZodError } from "zod";
import { auth } from "firebase-functions";
import * as canvas from "canvas";
import * as faceapi from "face-api.js";
import { PineconeClient, ScoredVector } from "@pinecone-database/pinecone";

initializeApp();

export const registerAccount = onCall({ maxInstances: 10 }, async (request) => {
  try {
    const firestore = getFirestore();
    const auth = getAuth();

    const data = registerAccountBodySchema.parse(request.data);
    const user = await auth.createUser({
      email: data.email,
      displayName: data.fullName,
      password: data.password,
      phoneNumber: data.phoneNumber,
    });

    await firestore.doc(`users/${user.uid}`).set({
      ...JSON.parse(JSON.stringify(user)),
      matricNumber: data.matricNumber,
      department: data.department,
      id: user.uid,
    });

    return {
      success: true,
      message: "Account created successfully",
    };
  } catch (e) {
    console.error("/registerAccount", e);
    if (e instanceof ZodError) {
      throw new HttpsError("invalid-argument", "Invalid arguments", e.issues);
    } else {
      const error = e as FirebaseError;
      if (error.code === "auth/email-already-exists") {
        throw new HttpsError(
          "already-exists",
          "Account with email already exists"
        );
      } else {
        throw new HttpsError("internal", "Something went wrong", e);
      }
    }
  }
});

export const handleOnCreateUser = auth.user().onCreate(async (user) => {
  const firestore = getFirestore();

  await firestore.doc(`users/${user.uid}`).set(
    {
      ...JSON.parse(JSON.stringify(user)),
      id: user.uid,
    },
    {
      merge: true,
    }
  );
});

export const handleOnDeleteUser = auth.user().onDelete(async (user) => {
  const pinecone = new PineconeClient();
  await pinecone.init({
    apiKey: process.env.PINECONE_API_KEY as string,
    environment: process.env.PINECONE_API_ENV as string,
  });

  const firestore = getFirestore();
  await firestore.runTransaction(async (tx) => {
    // eslint-disable-next-line new-cap
    const index = pinecone.Index(
      process.env.PINECONE_API_FACE_RECOGNITION_INDEX as string
    );

    await index.delete1({
      ids: [user.uid],
    });

    tx.delete(firestore.doc(`/users/${user.uid}`));
  });
});

export const registerUserFace = onCall(
  { maxInstances: 10, memory: "512MiB" },
  async (request) => {
    if (!request.auth) {
      throw new HttpsError("unauthenticated", "Unauthenticated");
    }

    const imageBase64: string = request.data;

    if (!imageBase64) {
      throw new HttpsError("invalid-argument", "Invalid arguments");
    }

    await faceapi.nets.ssdMobilenetv1.loadFromDisk("./models");
    await faceapi.nets.faceLandmark68Net.loadFromDisk("./models");
    await faceapi.nets.faceRecognitionNet.loadFromDisk("./models");

    const { Canvas, Image, ImageData } = canvas;
    faceapi.env.monkeyPatch({
      Canvas,
      Image,
      ImageData,
    } as unknown as faceapi.Environment);

    const input = (await canvas.loadImage(
      `data:image/jpg;base64,${imageBase64}`
    )) as unknown as HTMLImageElement;

    const result = await faceapi
      .detectSingleFace(input)
      .withFaceLandmarks()
      .withFaceDescriptor();

    if (!result) {
      throw new HttpsError("not-found", "No face found");
    }

    const pinecone = new PineconeClient();
    await pinecone.init({
      apiKey: process.env.PINECONE_API_KEY as string,
      environment: process.env.PINECONE_API_ENV as string,
    });

    const uid = request.auth.uid;
    const embedding = Array.from(result.descriptor);
    const firestore = getFirestore();

    await firestore.runTransaction(async (tx) => {
      // eslint-disable-next-line new-cap
      const index = await pinecone.Index(
        process.env.PINECONE_API_FACE_RECOGNITION_INDEX as string
      );

      await index.upsert({
        upsertRequest: {
          vectors: [
            {
              id: uid,
              values: embedding,
            },
          ],
        },
      });

      tx.update(firestore.doc(`/users/${uid}`), {
        faceEmbeddings: embedding,
      });
    });

    return {
      success: true,
      message: "Face registered successfully",
    };
  }
);

export const verifyUserFace = onCall(
  { maxInstances: 10, memory: "512MiB" },
  async (request) => {
    if (!request.auth) {
      throw new HttpsError("unauthenticated", "Unauthenticated");
    }

    const imageBase64: string = request.data;

    if (!imageBase64) {
      throw new HttpsError("invalid-argument", "Invalid arguments");
    }

    await faceapi.nets.ssdMobilenetv1.loadFromDisk("./models");
    await faceapi.nets.faceLandmark68Net.loadFromDisk("./models");
    await faceapi.nets.faceRecognitionNet.loadFromDisk("./models");

    const { Canvas, Image, ImageData } = canvas;
    faceapi.env.monkeyPatch({
      Canvas,
      Image,
      ImageData,
    } as unknown as faceapi.Environment);

    const input = (await canvas.loadImage(
      `data:image/jpg;base64,${imageBase64}`
    )) as unknown as HTMLImageElement;

    const result = await faceapi
      .detectSingleFace(input)
      .withFaceLandmarks()
      .withFaceDescriptor();

    if (!result) {
      throw new HttpsError("not-found", "No face found");
    }

    const pinecone = new PineconeClient();
    await pinecone.init({
      apiKey: process.env.PINECONE_API_KEY as string,
      environment: process.env.PINECONE_API_ENV as string,
    });

    const uid = request.auth.uid;
    const embedding = Array.from(result.descriptor);

    // eslint-disable-next-line new-cap
    const index = await pinecone.Index(
      process.env.PINECONE_API_FACE_RECOGNITION_INDEX as string
    );
    const { matches } = await index.query({
      queryRequest: {
        topK: 1,
        vector: embedding,
      },
    });

    const THRESHOLD = 0.9;

    if (
      !matches ||
      matches.length === 0 ||
      !(
        matches[0].score &&
        matches[0].score >= THRESHOLD &&
        matches[0].id === uid
      )
    ) {
      throw new HttpsError("not-found", "No face found");
    }

    return {
      success: true,
      message: "Face verified successfully",
    };
  }
);
