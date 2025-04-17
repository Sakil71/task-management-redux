import React from 'react'
import { ArrowRightOnRectangleIcon, Cog6ToothIcon, UserIcon } from '@heroicons/react/24/outline';
import { Menu } from '@headlessui/react';
import { useDispatch } from 'react-redux';
import { signOut } from 'firebase/auth';
import auth from '../../utils/firebase.config';
import { logOut } from '../../redux/features/user/userSlice';
import { Link } from 'react-router-dom';

const UserDropDown = ({ children }) => {
    const dispatch = useDispatch();

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
                            <Link to={'profile'}>
                            <button
                                className={`${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                            >
                                <UserIcon className="w-5 h-5 mr-2" />
                                Profile
                            </button>
                            </Link>
                        )}
                    </Menu.Item>

                    <Menu.Item>
                        {({ active }) => (
                            <button
                                className={`${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                            >
                                <Cog6ToothIcon className="w-5 h-5 mr-2" />
                                Settings
                            </button>
                        )}
                    </Menu.Item>

                    <Menu.Item>
                        {({ active }) => (
                            <button
                                onClick={ohandleLogOut}
                                className={`${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                            >
                                <ArrowRightOnRectangleIcon className="w-5 h-5 mr-2" />
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