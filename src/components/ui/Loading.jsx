import { Transition } from '@headlessui/react';
import React, { useEffect, useState } from 'react'

const Loading = () => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        setShow(true);
    }, []);
    return (
        <>
            <Transition
                show={show}
                enter="transition-opacity duration-700"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-700"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div className="flex justify-center items-center h-screen">
                    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                </div>
            </Transition>
        </>
    )
}

export default Loading;