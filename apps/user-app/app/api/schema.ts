import z from "zod"

export const userSchema = z.object({
    name: z.string()
        .max(50, "Name is too long, it can be max 50 characters."),

    email: z.string()
        .email("Please enter a valid email."),

    number: z.string()
        .regex(/^\d{10}$/, "Phone number must be exactly 10 digits."),

    password: z.string()
        .min(6, "password should be minimum 6 characters")
})

export const transferSchema = z.object({
    number: z.string()
        .regex(/^\d{10}$/, "Phone number must be exactly 10 digits."),

    amount: z.number()
        .positive("You can't send negative money.")
        .max(50000, "You can't send more than ₹50,000.")
})
