import z from "zod"

export const userSchema = z.object({
    name: z.string()
        .max(50, "Name is too long, it can be max 50 characters."),

    email: z.string()
        .email("Please enter a valid email."),

    number: z.string()
        .min(10, "phone number should have 10 digits.")
        .max(10, "phone number should have 10 digits."),

    password: z.string()
        .min(6, "password should be minimum 6 characters")
})

export const transferSchema = z.object({
    number: z.string()
        .min(10, "Phone number cannot have less than 10 digits")
        .max(10, "Phone number cannot have greater than 10 digits"),

    amount: z.number()
})
