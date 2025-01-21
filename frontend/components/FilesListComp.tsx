'use client'
import { DirecotryDataInterface } from "@/app/types/interfaces";
import DropDownMenu from "@/components/DropDownMenu";

interface FileListCompProps {
    toggle: (levelID: string) => () => void;
    children?: React.ReactNode;
    handleOnClick: (updateType: 'ren' | 'del' | 'new', type: 'folder' | 'file', dirID: string) => () => void;
    bg?: string;
    data: DirecotryDataInterface
}

export default function FilesListComp(props: FileListCompProps) {
    const { toggle, handleOnClick, data } = props
    return (
        <div className="border-l-4 border-white">
            <div className='bg-stone-400 py-[25px] px-10 flex justify-between items-center cursor-pointer border-t-4 border-white' onClick={toggle(data._id)}>
                <p className='text-[22px] font-semibold'>{data.name}</p>
                <div className='text-[30px]'>
                    <DropDownMenu folder={false} handleOnClick={handleOnClick} dirID={data._id} />
                </div>
            </div>
        </div>
    )

}
