import z from "zod";

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long" })
    .max(63, { message: "Username must be at most 63 characters long" })
    .regex(
      /^[a-z0-9][a-z0-9-]*[a-z0-9]$/,
      "Username must be lowercase letters, numbers, and hyphens only"
    )
    .refine(
      (val) => !val.includes("--"),
      "Username cannot contain consecutive hyphens"
    )
    .transform((val) => val.toLowerCase()),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
