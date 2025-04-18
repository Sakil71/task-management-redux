import { Dialog } from '@headlessui/react';

export default function Modal({ isOpen, setIsOpen, title, children }) {  

    return (
        <>
            <Dialog open={isOpen} onClose={()=>setIsOpen(false)} className="relative z-10">
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <Dialog.Panel className="w-full max-w-md rounded-xl bg-blue-400/80 p-6 backdrop-blur-2xl transition duration-300 ease-out">
                            <Dialog.Title as="h3" className="text-base font-medium mb-2">
                                {title}
                            </Dialog.Title>
                            {children}
                        </Dialog.Panel>
                    </div>
                </div>
            </Dialog>
        </>
    );
}
