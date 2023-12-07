const { z } = require("zod");

const registerSchema = z.object({
  username: z
    .string({ required_error: "Name is required." })
    .trim()
    .min(3, { message: "Name must be at least of 3 charactor" })
    .max(255, { message: "Name must not be more than 255 charactors" }),
  email: z
    .string({ required_error: "email is required." })
    .trim()
    .email({ message: "Invalid email address" })
    .min(3, { message: "email must be at least of 3 charactor" })
    .max(255, { message: "email must not be more than 255 charactors" }),
  phone: z
    .string({ required_error: "phone is required." })
    .trim()
    .min(11, { message: "phone must be at least of 11 charactor" })
    .max(22, { message: "phone must not be more than 255 charactors" }),
  password: z
    .string({ required_error: "password is required." })
    .min(8, { message: "password must be at least of 8 charactor" })
    .max(255, { message: "password must not be more than 255 charactors" }),
});

module.exports = registerSchema;
