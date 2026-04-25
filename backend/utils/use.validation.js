import { z } from "zod";

export const registerValid = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .min(3, "Name must be at least 3 characters")
    .regex(/^[A-Za-z ]+$/, "Name can only contain letters and spaces")
    .refine(value => !/\s{2,}/.test(value), {
      message: "Name cannot contain multiple spaces",
    }),

  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Please enter a valid email")
    .max(254, "Email is too long")
    .refine(value => !value.includes(".."), {
      message: "Email cannot contain consecutive dots",
    }),

  password: z
    .string()
    .trim()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters")
    .max(20, "Password must be maximum 20 characters")
    .regex(/[A-Z]/, "Password must include at least 1 uppercase letter")
    .regex(/[0-9]/, "Password must include at least 1 number"),
});

export const loginValid = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Please enter a valid email")
    .max(254, "Email is too long")
    .refine(value => !value.includes(".."), {
      message: "Email cannot contain consecutive dots",
    }),

  password: z
    .string()
    .trim()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters")
    .max(20, "Password must be maximum 20 characters")
    .regex(/[A-Z]/, "Password must include at least 1 uppercase letter")
    .regex(/[0-9]/, "Password must include at least 1 number"),
});