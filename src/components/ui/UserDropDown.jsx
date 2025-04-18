import React from 'react'
import { ArrowRightOnRectangleIcon, Cog6ToothIcon, UserIcon } from '@heroicons/react/24/outline';
import { Menu } from '@headlessui/react';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from 'firebase/auth';
import auth from '../../utils/firebase.config';
import { logOut } from '../../redux/features/user/userSlice';
import { Link } from 'react-router-dom';

const UserDropDown = ({ children }) => {
    const dispatch = useDispatch();
    const { name, photoURL } = useSelector(state => state.userSlice);

    const ohandleLogOut = () => {
        signOut(auth);
        dispatch(logOut());
    }
    return (
        <Menu>
            <Menu.Button>
                {children}
            </Menu.Button>

            <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg focus:outline-none z-50">
                <div className="px-1 py-1">
                    <Menu.Item>
                        {({ active }) => (
                            <Link to={'profile'} className={`${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'} group flex rounded-md items-center w-full px-2 py-2 text-sm`}>
                                {
                                    photoURL ?
                                        <img className='w-6 h-6 rounded-full me-2 border border-blue-600 p-[1px] object-cover' src={photoURL} alt="" />
                                        :
                                        <UserIcon className="w-5 h-5 mr-2" />
                                }
                                {
                                    name
                                        ?
                                        <span className='font-semibold'>{name}</span>
                                        :
                                        "Profile"
                                }
                            </Link>
                        )}
                    </Menu.Item>

                    <Menu.Item>
                        {({ active }) => (
                            <Link to={'settings'}>
                                <button
                                    className={`${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                                        } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                                >
                                    <Cog6ToothIcon className="w-5 h-5 mr-2" />
                                    Settings
                                </button>
                            </Link>
                        )}
                    </Menu.Item>

                    <Menu.Item>
                        {({ active }) => (
                            <button
                                onClick={ohandleLogOut}
                                className={`${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                            >
                                <ArrowRightOnRectangleIcon className="w-5 h-5 mr-2 text-red-600" />
                                Logout
                            </button>
                        )}
                    </Menu.Item>
                </div>
            </Menu.Items>
        </Menu>
    )
}

export default UserDropDown;