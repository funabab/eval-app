import { z } from "zod";
import isMobilePhone from "validator/lib/isMobilePhone";
import { User as FirebaseUser } from "firebase/auth";

export const registerAccountBodySchema = z
  .object({
    fullName: z
      .string({ required_error: "Full Name is required" })
      .trim()
      .min(1, "Full Name cannot be empty"),
    matricNumber: z
      .string({ required_error: "Matric Number is required" })
      .regex(
        /^[a-zA-Z0-9]{2}\/[a-zA-Z0-9]{2,5}\/[0-9]{3,5}$/,
        "Invalid matric number"
      ),
    department: z
      .string({ required_error: "Department is required" })
      .trim()
      .min(1, "Department cannot be empty"),
    phoneNumber: z
      .string({ required_error: "Phone Number is required" })
      .refine(
        (value) =>
          isMobilePhone(value, "en-NG", {
            strictMode: true,
          }),
        "Invalid phone number"
      ),
    email: z
      .string({ required_error: "Email is required" })
      .email({ message: "Invalid email address" }),
    password: z.string({ required_error: "Password is required" }),
    confirmPassword: z.string({
      required_error: "Confirm Password is required",
    }),
  })
  .refine((schema) => schema.password === schema.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const loginAccountBodySchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email("Invalid email"),
  password: z.string({ required_error: "Password is required" }),
});

export const completeRegistrationBodySchema = z.object({
  matricNumber: z
    .string({ required_error: "Matric Number is required" })
    .regex(
      /^[a-zA-Z0-9]{2}\/[a-zA-Z0-9]{2,5}\/[0-9]{3,5}$/,
      "Invalid matric number"
    ),
  department: z
    .string({ required_error: "Department is required" })
    .trim()
    .min(1, "Department cannot be empty"),
});

export type RegisterAccountBody = z.infer<typeof registerAccountBodySchema>;
export type LoginAccountBody = z.infer<typeof loginAccountBodySchema>;
export type CompleteRegistrationBody = z.infer<
  typeof completeRegistrationBodySchema
>;
export type User = FirebaseUser & {
  matricNumber: string;
  department: string;
  id: string;
  faceEmbeddings: number[];
};
