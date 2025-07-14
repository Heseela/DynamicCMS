
import { z } from "zod";


export const LoginSchema = z.object({
    email: z.string().trim().regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid Email"),
    password: z.string().trim().min(1, "Required")

})
export type TLoginSchema = z.infer<typeof LoginSchema>

export const LoginFormDefaultValues: Partial<TLoginSchema> = {
    email: "",
    password: ""
};
