import { initializeApp } from "firebase-admin/app";
import { HttpsError, onCall } from "firebase-functions/v2/https";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";
import { registerAccountBodySchema } from "../../src/schemas";
import { FirebaseError } from "@firebase/util";
import { ZodError } from "zod";
import { auth } from "firebase-functions";

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
