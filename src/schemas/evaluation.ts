import { z } from "zod";

export const evaluationBodySchema = z.object({
  matricNumber: z
    .string({ required_error: "Matric Number is required" })
    .regex(
      /^[a-zA-Z0-9]{2}\/[a-zA-Z0-9]{2,5}\/[0-9]{3,5}$/,
      "Invalid matric number"
    ),
  courseCode: z
    .string({ required_error: "Course code is required" })
    .trim()
    .min(1, "Course code cannot be empty"),
  lecturerName: z
    .string({ required_error: "Lecturer name is required" })
    .trim()
    .min(1, "Lectuerer name cannot be empty"),

  lecturerPresence: z.string().optional(),
  lecturerRate: z.string().optional(),
  lecturerMaterial: z.string().optional(),
  lecturerPuntuality: z.string().optional(),
});

export type EvaluationBody = z.infer<typeof evaluationBodySchema>;
