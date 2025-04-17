import React from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { googleAuthentication, signInUser } from '../redux/features/user/userSlice';
import toast from 'react-hot-toast';

const Login = () => {
    const { register, handleSubmit } = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmit = async ({ email, password }) => {
        const user = await dispatch(signInUser({ email, password }));
        if (signInUser.fulfilled.match(user)) {
            navigate('/');
            toast.success("Sign in sucessfull");
        }
        else {
            toast.error(user.payload || user.error.message);
        }
    }

    const handleGoogleAuth = async () => {
        const user = await dispatch(googleAuthentication());
        if (googleAuthentication.fulfilled.match(user)) {
            toast.success("Sign up successfull");
            navigate('/');
        }
        else {
            toast.error(user.payload || user.error.message);
        }
    }
    return (
        <div className='bg-zinc-900 w-full h-[100vh] flex items-center'>
            <div className=' w-full md:w-[50%] mx-auto p-8 bg-blue-500 rounded-md'>
                <h1 className='mb-4 text-xl text-center font-semibold'>Sign In</h1>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <div className='flex gap-2 flex-col mb-2'>
                        <small>Email</small>
                        <input {...register("email")} type="email" className='rounded-md' placeholder='Email' />
                    </div>
                    <div className='flex gap-2 flex-col'>
                        <small>Password</small>
                        <input {...register("password")} type="password" className='rounded-md' placeholder='Password' />
                    </div>

                    <div className='mt-4'>
                        <button className='btn btn-primary' type='submit'>Signin</button>
                    </div>
                    <div>
                        <small>New in here? <Link className='underline' to={'/signup'}>Sign up</Link></small>
                    </div>
                </form>
                <div className='mt-4'>
                    <button onClick={handleGoogleAuth} className='border p-2 rounded-md w-full bg-white text-black flex items-center justify-center gap-2'>
                        <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className='w-5 h-5' />
                        Sign in with Google
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Login;