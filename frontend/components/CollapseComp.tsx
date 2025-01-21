'use client'
import React from 'react'

import { AiOutlineRight, AiOutlineDown } from 'react-icons/ai'
import { Collapse } from 'react-collapse';
import DropDownMenu from './DropDownMenu';
import { DirecotryDataInterface } from '@/app/types/interfaces';

interface CollapseProps {
    open: boolean;
    toggle: (levelID: string) => () => void;
    data: DirecotryDataInterface;
    children: React.ReactNode;
    handleOnClick: (updateType: 'ren' | 'del' | 'new', type: 'folder' | 'file', dirID: string) => () => void;
    bg?: string;
}

export default function CollapseComp(props: CollapseProps) {
    const { open, toggle, handleOnClick, data, children, bg = 'bg-white' } = props;

    return (
        <div className='pt-[4px]'>
            <div className={`${bg} py-[25px] px-[40px] gap-x-96 flex justify-between items-center cursor-pointer rounded-t-md`} onClick={toggle(data._id)}>
                <div className='flex gap-4'>
                    <div className='text-[30px]'>
                        {open ? <AiOutlineDown /> : <AiOutlineRight />}
                    </div>
                    <p className='text-[22px] font-semibold'>{data.name}</p>
                </div>

                <DropDownMenu handleOnClick={handleOnClick} folder={true} dirID={data._id} />
            </div>

            <Collapse isOpened={open}>
                <div className={bg}>
                    {children}
                </div>
            </Collapse>
        </div>
    )
}
