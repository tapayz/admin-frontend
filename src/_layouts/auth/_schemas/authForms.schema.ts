import { z } from "zod";

export const loginSchema = z.object({
  id: z.string()
    .min(4, { message: "validation.id.min" })
    .max(50, { message: "validation.id.max" })
    .transform(val => val?.trim()),
  password: z.string()
    .min(4, { message: "validation.password.min" })
    .max(100, { message: "validation.password.max" })
    .transform(val => val?.trim()),
  provider: z.string().optional(),
});

export type LoginSchema = z.infer<typeof loginSchema>;

export const joinSchema = z
  .object({
    id: z
      .string()
      .min(5, { message: "validation.id.min" })
      .max(24, { message: "validation.id.max" })
      .regex(/^[a-zA-Z0-9_]+$/, { message: "validation.id.pattern" })
      .transform(val => val?.trim()),
    password: z
      .string()
      .min(4, { message: "validation.password.min" })
      .max(30, { message: "validation.password.max" })
      .transform(val => val?.trim()),
    rePassword: z.string()
      .transform(val => val?.replaceAll(' ', '')),
    name: z
      .string()
      .min(2, { message: "validation.name.min" })
      .max(50, { message: "validation.name.max" })
      .transform(val => val?.trim()),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "validation.password.mismatch",
    path: ["rePassword"],
  });

export type JoinSchema = z.infer<typeof joinSchema>;

export const checkDuplicateSchema = z.object({
  id: z
    .string()
    .min(5, { message: "validation.id.min" })
    .max(24, { message: "validation.id.max" })
    .regex(/^[a-zA-Z0-9_]+$/, { message: "validation.id.pattern" }),
});

export type CheckDuplicateSchema = z.infer<typeof checkDuplicateSchema>;
