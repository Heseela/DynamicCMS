import { Toaster } from "react-hot-toast"
import { Outlet } from "react-router-dom"


const LoginLayout = () => {
    return (
        <div className=" min-h-screen">
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
            <Outlet />
        </div>
    )
}

export default LoginLayout