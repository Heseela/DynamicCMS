
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { LoginFormDefaultValues, LoginSchema, type TLoginSchema } from "../../Models/login.model";
import { useCustomMutation } from "../../Global/custom-muation";
import { QueryKey } from "../../Types/query.types";
import toast from "react-hot-toast";
import InputField from "../form-component/input-form";
import PasswordFieldForm from "../form-component/password-form.field";
import Loading from "../../Global/loader";
import { useAuth } from "../context/AuthProvider";
import { Button } from "../ui/button";


const LoginForm = () => {
    const { setAuth } = useAuth();
    const navigate = useNavigate();
    const form = useForm<TLoginSchema>({
        resolver: zodResolver(LoginSchema),
        defaultValues: LoginFormDefaultValues,
    });
    const { mutateAsync, isPending } = useCustomMutation<TLoginSchema>({
        endPoint: QueryKey.LOGIN,
        method: "post",
    });
    async function onSubmit(values: TLoginSchema) {

        try {
            const { data } = await mutateAsync(values);
            if (data) {
                localStorage.setItem("persist", "true");

                setAuth(data.access_token);
                toast.success("Login Successfully");
                navigate("/");
                form.reset();
            }
        } catch (error: any) {
            let errorMessage = "Something went wrong";

            if (error?.response?.data?.message instanceof Object) {
                errorMessage = error?.response.data?.message.message;
            } else if (error?.response?.data?.message) {
                errorMessage = error?.response.data?.message;

            }
            toast.error(errorMessage)

        }
    }

    return (
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mb-6">
                <InputField formField={{
                    label: "Email",
                    name: "email",
                    type: 'text',
                    placeholder: "Enter  your Email",

                }} />
                <PasswordFieldForm formField={{
                    label: "Password",
                    name: "password",
                    type: 'password',
                    placeholder: "Enter  your password",

                }} />

                <Button type="submit" className="w-full" disabled={isPending}>
                    {isPending ? <Loading color="white" size={10} /> : "Login"}
                </Button>
            </form>
        </FormProvider>
    )
}

export default LoginForm