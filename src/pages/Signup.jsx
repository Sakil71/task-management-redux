import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { createUser, googleAuthentication } from '../redux/features/user/userSlice';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Signup = () => {
    const { register, handleSubmit } = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmit = async ({ email, name, password }) => {
        const user = await dispatch(createUser({ email, password, name }));
        if (createUser.fulfilled.match(user)) {
            navigate('/');
            toast.success("Sogn up successfull");
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
            <div className=' w-full md:w-[50%] mx-auto  p-8 bg-blue-500 rounded-md'>
                <h1 className='mb-4 text-xl text-center font-semibold'>Sign up</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='flex gap-2 flex-col mb-2'>
                        <small>Name</small>
                        <input {...register("name")} type="text" className='rounded-md' placeholder='Name' />
                    </div>
                    <div className='flex gap-2 flex-col mb-2'>
                        <small>Email</small>
                        <input {...register("email")} type="email" className='rounded-md' placeholder='Email' />
                    </div>
                    <div className='flex gap-2 flex-col'>
                        <small>Password</small>
                        <input {...register("password")} type="password" className='rounded-md' placeholder='Password' />
                    </div>

                    <div className='mt-4'>
                        <button className='btn btn-primary' type='submit'>Signup</button>
                    </div>

                    <div>
                        <small>Already have an account? <Link className='underline' to={'/login'}>Sign in</Link></small>
                    </div>
                </form>

                <div className='mt-4'>
                    <button onClick={handleGoogleAuth} className='border p-2 rounded-md w-full bg-white text-black flex items-center justify-center gap-2'>
                        <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className='w-5 h-5' />
                        Sign up with Google
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Signup;