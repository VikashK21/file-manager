'use client'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from 'zod'
import axios from 'axios'
import { base_URL } from '@/app/types/variables'
import { DirecotryDataInterface, PayloadData } from '@/app/types/interfaces'

const formSchema = z.object({
    name: z.string().min(1),
    type: z.string().optional(),
    path: z
        .instanceof(File)
        .refine((file) => file.size <= 1024 * 1024 * 10, {
            message: "File size should not exceed 10MB",
        }).optional()
})

const delFormSchema = z.object({
    dirID: z.string().optional()
})


export default function FormComp({
    formType,
    levelID,
    setIsOpen,
    setRefetch
}: {
    formType: 'ren' | 'del' | 'new'
    levelID: string;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    setRefetch: Dispatch<SetStateAction<boolean>>;
}) {
    const [fetchedData, setFetchedData] = useState<DirecotryDataInterface>()
    const [dirType, setDirType] = useState('')

    console.log(levelID, 'form')

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });

    const isLoading = form.formState.isSubmitting;
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            console.log('is it coming here')
            const payload: PayloadData = values
            if (formType === 'new') {
                console.log(formType, levelID, 'from the props')
                console.log(values, 'form values')
                if (!values.path) {
                    delete payload.path
                }
                payload.level = levelID
                console.log(payload, 'payload')
                const res = await axios.post(base_URL + '/dir', payload, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                console.log(res, 'response from the server')
                setRefetch((prev) => !prev)
            }
            if (formType === 'ren') {
                console.log(values, formType, levelID, 'from the rename sec')
                payload.type = fetchedData?.type
                console.log(payload, 'payload')
                const res = await axios.put(base_URL + '/dir/update/' + fetchedData?._id, payload, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                console.log(res, 'resposne from the server')
                setRefetch((prev) => !prev)
            }
            setIsOpen(false)
        } catch (err) {
            console.log(err)
        }
    }

    // delete
    const delForm = useForm<z.infer<typeof delFormSchema>>({
        resolver: zodResolver(delFormSchema),
        defaultValues: {
            dirID: fetchedData?._id,
        },
    });

    const isDelLoading = form.formState.isSubmitting;

    const onDelSubmit = async () => {
        try {
            const res = await axios.delete(base_URL + '/dir/del/' + fetchedData?._id)
            console.log(res, 'resposne from server')
            setIsOpen(false);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (levelID !== 'root') {
            const data = axios.get(base_URL + '/dir/by/' + levelID)
            data.then((data) => setFetchedData(data.data))
        }
        // react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            {
                formType === 'del' ? (
                    <Form {...delForm}>
                        <form
                            onSubmit={delForm.handleSubmit(onDelSubmit)}
                            className="space-y-6  sm:px-0 px-4"
                        >
                            <p className='text-[18px]' >Are you sure you want to delete this directory?</p>
                            <div className="w-full flex justify-center sm:space-x-6">
                                <Button
                                    size="lg"
                                    variant="outline"
                                    disabled={isLoading}
                                    className="w-full hidden sm:block"
                                    type="button"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    size="lg"
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full bg-red-500 hover:bg-red-400"
                                >
                                    {isDelLoading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Deleting
                                        </>
                                    ) : (
                                        <span>Delete</span>
                                    )}
                                </Button>
                            </div>
                        </form>
                    </Form>
                ) : (
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className='flex flex-col space-y-2 sm:px-0 px-4'
                        >

                            {/* #This part will only rendered for folder update */}
                            {/* ##This part will again render for file update*/}
                            <FormField
                                name='name'
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem className='col-span-2 md:col-span-1'>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder='Directory name'
                                                className='text-md'
                                                required
                                                autoFocus
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* # */}
                            {/* ###This part has to hide when updating file */}
                            {formType === 'new' &&
                                <FormField
                                    control={form.control}
                                    name="type"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Dicretory type</FormLabel>
                                            <Select onValueChange={(value) => {
                                                field.onChange(value);
                                                setDirType(value);
                                            }}
                                                defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select directory type" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="file">
                                                        File
                                                    </SelectItem>
                                                    <SelectItem value="folder">
                                                        Folder
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            }
                            {/* ### */}
                            {
                                (dirType === 'file' || (fetchedData && formType == 'ren' && fetchedData.type === 'file')) && <FormField
                                    name='path'
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem className='col-span-2 md:col-span-1'>
                                            <FormLabel>Choose file</FormLabel>
                                            <FormControl>
                                                <Input
                                                    // {...field}
                                                    onChange={(e) => {
                                                        field.onChange(e.target.files?.[0])
                                                    }}
                                                    className='text-md'
                                                    type='file'
                                                    required
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            }
                            {/* ## */}

                            <div className='flex w-full sm:justify-end mt-4'>
                                <Button
                                    type='submit'
                                    disabled={isLoading}
                                    className='w-full sm:w-auto'>
                                    <>
                                        {
                                            isLoading ? (
                                                <>
                                                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                                    Saving...
                                                </>
                                            ) : (
                                                "Save"
                                            )
                                        }
                                    </>
                                </Button>
                            </div>
                        </form>
                    </Form >
                )
            }

        </>
    )
}
