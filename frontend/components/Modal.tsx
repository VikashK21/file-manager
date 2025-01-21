'use client'

import { DialogTitle } from '@radix-ui/react-dialog';
import {
    Dialog,
    // DialogOverlay,
    DialogContent,
    DialogHeader
} from './ui/dialog';
// import { useRouter } from 'next/router';


export default function Modal({
    children,
    isOpen,
    setIsOpen,
    title,
}: {
    children: React.ReactNode;
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    title: string;
}) {
    // const router = useRouter()

    // const handleOpenChange = () => {
    //     router.back()
    // }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            {/* <DialogOverlay> */}
            <DialogContent className='sm:max-w-[425px]'>
                <DialogHeader>
                    <DialogTitle className='text-lg font-bold'>
                        {title}
                    </DialogTitle>
                </DialogHeader>
                {children}
            </DialogContent>
            {/* </DialogOverlay> */}
        </Dialog>
    )
}