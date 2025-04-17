import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import auth from '../../utils/firebase.config';
import { setUser, toggleLoading } from '../../redux/features/user/userSlice';
import Loading from '../ui/Loading';

const PrivateRoutes = ({ children }) => {
    const { pathname } = useLocation();
    const { email, isLoading } = useSelector(state => state.userSlice);
    const dispatch = useDispatch();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                dispatch(setUser({
                    name: user.displayName,
                    email: user.email,
                    photoURL : user.photoURL
                }));
                dispatch(toggleLoading(false));
            }
            else {
                dispatch(toggleLoading(false));
            }
        })
    }, [dispatch])

    if (isLoading) {
       return <Loading></Loading>
    }

    if (!isLoading && !email) {
        return <Navigate to={"/login"} state={{ path: pathname }}></Navigate>
    }

    return (
        children
    )
}

export default PrivateRoutes;