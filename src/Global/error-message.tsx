import toast from "react-hot-toast";


type Props = {
    error?: unknown | any;
    showToast?: boolean
}
const ErrorMessage = ({ error, showToast }: Props) => {
    console.log("🚀 ~ ErrorMessage ~ error:", error)
    let errorMessage = "Something went wrong";

    if (error?.response?.data?.message instanceof Object) {
        errorMessage = error?.response.data?.message.message;
    } else if (error?.response?.data?.message) {
        errorMessage = error?.response.data?.message;

    }
    console.log("🚀 ~ ErrorMessage ~ errorMessage:", errorMessage)

    if (showToast) {
        toast.error(errorMessage);
        return null; 
    }

    return <p className="text-red-500">{errorMessage}</p>;
};

export default ErrorMessage;
