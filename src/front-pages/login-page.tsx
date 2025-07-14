import { Link } from 'react-router-dom';
import LoginForm from '../components/auth/login-form';

const LoginPage = () => {
    return (
        <div className='flex items-center justify-center min-h-screen  '>
            <div className='border rounded-xl flex flex-col gap-5 px-8 py-4  shadow-lg max-w-md w-full bg-white'>
                <div className='w-full flex items-center justify-center '>
                <img src="/logo1.png" alt="LOGO" className="h-14 w-14" />
                
                </div>
                <LoginForm />
                <Link to='/forget-password' className='text-red-500 text-center -mt-3 '>
                    Forgot Password?
                </Link>
            </div>
        </div>
    );
}

export default LoginPage;
