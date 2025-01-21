'use client'
import CollapseComp from "@/components/CollapseComp";
import FilesListComp from "@/components/FilesListComp";
import FormComp from "@/components/FormComp";
import Modal from "@/components/Modal";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import axios from 'axios'
import { DirecotryDataInterface } from "./types/interfaces";
import { base_URL } from "./types/variables";


export default function Home() {

  const [open, setOpen] = useState(false)
  const [dirID, setDirID] = useState('root')
  const [showModal, setShowModal] = useState(false)
  const [actionType, setActionType] = useState('Show Modal')
  const [rootLevelData, setRootLevelData] = useState([])
  const [nestedLevelData, setNestedLevelData] = useState([])
  const [formOpeningAs, setFormOpeningAs] = useState<'ren' | 'del' | 'new'>('new')
  const [refetch, setRefetch] = useState(false)

  const toggle = (levelID: string) => () => {
    if (levelID !== dirID) {
      const data = axios.get(base_URL + '/dir/' + levelID)
      data.then(data => setNestedLevelData(data.data))
      setOpen(true)
      setDirID(levelID)
    }
    else {
      setOpen(false)
    }
  }

  const handleOnClick = (updateType: 'ren' | 'del' | 'new', type: 'folder' | 'file', dirType: string) => () => {
    console.log(dirID, 'handleClick')
    let title = ''
    if (updateType === 'ren') {
      title = 'Rename ' + type
    } else if (updateType === 'del') {
      title = 'Delete ' + type
    } else {
      title = "New " + type
    }
    setFormOpeningAs(updateType)
    setActionType(title)
    setDirID(dirType)
    setShowModal(true)
  }

  const getRootLevelD = async () => {
    try {
      const data = await axios.get(base_URL + '/dir/root')
      setRootLevelData(data.data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getRootLevelD()
  }, [refetch])

  return (
    <div>


      <section className="bg-black sticky top-0 px-[40px] py-6">
        <div className='flex justify-between'>
          <p className='text-[26px] font-bold text-orange-600'>VK</p>
          <Button variant="outline" onClick={handleOnClick('new', 'folder', 'root')}><AiOutlinePlus />New</Button>
        </div>
      </section>


      <section className="h-screen grid place-items-center">
        <div className="px-[40px] py-10 h-[100%] w-[100%]">
          {
            rootLevelData.length > 0 && rootLevelData.map((data: DirecotryDataInterface) => {
              if (data.type === 'folder') return (
                <CollapseComp key={data._id + 'root'} handleOnClick={handleOnClick} open={open && dirID === data._id} toggle={toggle} data={data} >
                  {nestedLevelData.length > 0 ? nestedLevelData.map((nestedData: DirecotryDataInterface, ind) => {
                    if (nestedData.type === 'folder') return (
                      <CollapseComp key={nestedData._id + ind} handleOnClick={handleOnClick} open={open && dirID === nestedData._id} toggle={toggle} data={nestedData} >
                        {null}
                      </CollapseComp>
                    )
                    return <FilesListComp key={nestedData._id + ind} handleOnClick={handleOnClick} data={nestedData} toggle={toggle} />
                  }) : <div className="text-center font-semibold bg-stone-400 text-gray-200 px-10 py-4">Empty directory</div>}
                </CollapseComp>)
              return <FilesListComp key={data._id + 'root'} handleOnClick={handleOnClick} data={data} toggle={toggle} />
            })
          }
        </div>
      </section>
      <Modal isOpen={showModal} setIsOpen={setShowModal} title={actionType} >
        <FormComp formType={formOpeningAs} levelID={dirID} setIsOpen={setShowModal} setRefetch={setRefetch} />
      </Modal>
    </div>
  );
}
