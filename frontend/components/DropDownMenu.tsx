'use client'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { AiOutlineMore, AiOutlineEdit, AiOutlineDelete, AiOutlinePlus } from "react-icons/ai"

interface DropDownMenuProps {
    handleOnClick: (updateType: 'ren' | 'del' | 'new', type: 'folder' | 'file', dirID: string) => () => void;
    folder: boolean;
    dirID: string;
}

export default function DropDownMenu(props: DropDownMenuProps) {
    const { handleOnClick, folder, dirID} = props
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div
                    className='text-[30px] cursor-pointer'
                    onClick={() => console.log('The more button')}
                >
                    <AiOutlineMore />
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-32 text-xl font-semibold">
                <DropdownMenuGroup>
                    <DropdownMenuItem onClick={handleOnClick('ren', folder ? 'folder' : 'file', dirID)}>
                        <AiOutlineEdit /> Rename
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleOnClick('del', folder ? 'folder' : 'file', dirID)}>
                        <AiOutlineDelete /> Delete
                    </DropdownMenuItem>

                    {
                        folder && <DropdownMenuItem onClick={handleOnClick('new', 'folder', dirID)}>
                            <AiOutlinePlus /> New
                        </DropdownMenuItem>
                    }
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
