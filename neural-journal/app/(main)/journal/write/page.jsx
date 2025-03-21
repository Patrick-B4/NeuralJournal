"use client"
import { journalSchema } from '@/app/lib/schemas';
import dynamic from 'next/dynamic';
import React, { act, useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form';
import 'react-quill-new/dist/quill.snow.css';
import { BarLoader } from 'react-spinners';
import {zodResolver} from "@hookform/resolvers/zod";
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectItem, SelectContent } from '@/components/ui/select';
import { getMoodById, MOODS } from '@/app/lib/moods';
import { Button } from '@/components/ui/button';
import useFetch from '@/hooks/use-fetch';
import { createJournalEntry, getDraft, getJounralEntry, saveDraft, updateJournalEntry } from '@/actions/journal';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import { getCollections } from '@/actions/collection';
import { useState } from 'react';
import { createCollection } from '@/actions/collection';
import CollectionForm from '@/components/collection-dialog';
import { Loader2 } from 'lucide-react';
import { Watch } from 'lucide-react';

const ReactQuill = dynamic(()=> import("react-quill-new"), {ssr:false})

const JournalEntryPage = () => {

    const[isCollectionDialogOpen, setIsCollectionDialogOpen] = useState(false);

    const searchParams = useSearchParams();
    const editId = searchParams.get("edit");
    const [isEditMode, setIsEditMode] = useState(false);

    const {loading: entryLoading, fn: fetchEntry, data: existingEntry} = useFetch(getJounralEntry);

    const {loading: draftLoading, fn: fetchDraft, data: draftData} = useFetch(getDraft);

    const {loading: savingDraft, fn: saveDraftFn, data: savedDraft} = useFetch(saveDraft);

    const {loading: actionLoading, fn: actionFn, data: actionResult} = useFetch(isEditMode?updateJournalEntry : createJournalEntry);

    const {loading: collectionsLoading, fn: fetchCollections, data: collections} = useFetch(getCollections);

    const {loading: createCollectionLoading, fn: createCollectionFn, data: createdCollection} = useFetch(createCollection);

    const router = useRouter();

    console.log(collections, "collections")


    const{register, handleSubmit, control, formState:{errors, isDirty}, getValues, setValue, watch, reset} = useForm({
        resolver: zodResolver(journalSchema),
        defaultValues: {
            title: "",
            content: "",
            mood: "",
            collectionId: "",
        },
    });

    useEffect(() => {
        fetchCollections();

        if(editId){
            setIsEditMode(true);
            fetchEntry();
        }
        else{
            setIsEditMode(false);
            fetchDraft();
        }
    }, [editId]);

    useEffect(() => {
        if (isEditMode && existingEntry) {
          reset({
            title: existingEntry.title || "",
            content: existingEntry.content || "",
            mood: existingEntry.mood || "",
            collectionId: existingEntry.collectionId || "",
          });
        } else if (draftData?.success && draftData?.data) {
          reset({
            title: draftData.data.title || "",
            content: draftData.data.content || "",
            mood: draftData.data.mood || "",
            collectionId: "",
          });
        } else {
          reset({
            title: "",
            content: "",
            mood: "",
            collectionId: "",
          });
        }
      }, [draftData, isEditMode, existingEntry]);
    

    
    useEffect(() => {
        console.log("actionResult", actionResult, "actionLoading", actionLoading);
        if (actionResult && !actionLoading) {
            if(!isEditMode){ // clear draft on entry create
                saveDraftFn({title: "", content: "", mood: ""});
            }

            toast.success(`Entry ${isEditMode? "updated" : "created"} successfully!`);
            setTimeout(() => {
                router.push(
                    `/collection/${actionResult.collectionId ? actionResult.collectionId : "unorganized"}`
                );
            }, 2000);
        }
    }, [actionResult, actionLoading]);
    
    
    
    const onSubmit = handleSubmit(async (data) => {
        const mood = getMoodById(data.mood);
        
        actionFn({
            ...data,
            moodScore:mood.score,
            moodQuery: mood.pixabayQuery,
            ...(isEditMode && {id: editId}),
        })
        
    });

    const formData = watch();
    
    useEffect(() => {
        if(createdCollection){
            setIsCollectionDialogOpen(false);
            fetchCollections();
            setValue("collectionId", createdCollection.id);
            toast.success(`Collection ${createdCollection.name} created!`);
        }
    }, [createdCollection]);

    const handleCreateCollection= async (data)=>{
        createCollectionFn(data);
    };
    
    const handleSaveDraft = async () => {
        if (!isDirty) {
          toast.error("No changes to save");
          return;
        }
        await saveDraftFn(formData);
    };

    useEffect(() => {
        if(savedDraft?.success && !savingDraft){
            toast.success("Draft saved successfully");
        }
    }, [savedDraft, savingDraft]);

    

    const isLoading = actionLoading || collectionsLoading || entryLoading || draftLoading || savingDraft;

    return (
        <div className='py-8'>
            <form className='space-y-2 mx-auto' onSubmit={onSubmit}>
                <h1 className='text-5xl md:text-6xl gradient-title'>
                    {isEditMode ? "Edit Entry" : "What's on your mind?"}
                </h1>

                {isLoading && <BarLoader color='orange' width={"100%"}/>}

                <div className='space-y-2'>
                    <label className='text-sm font-medium'>Title</label>
                    <Input {...register("title")}
                    placeholder='Give your entry a title...'
                    disabled = {isLoading}
                    className={`py-5 md:text-md ${errors.title?"border-red-500":""}`}
                    />
                    {errors.title && (
                        <p className='text-red-500 text-sm'>{errors.title.message}</p>
                    )}
                </div>

                <div className='space-y-2'>
                    <label className='text-sm font-medium'>How are you feeling?</label>
                    <Controller
                    name ="mood"    
                    control={control}                
                    render = {({field}) => {
                        return (
                            <Select onValueChange={field.onChange} value={field.value}>
                                <SelectTrigger className={errors.mood?"border-red-500" : ""}>
                                    <SelectValue placeholder="Select a mood..." />
                                </SelectTrigger>
                                <SelectContent>
                                    {Object.values(MOODS).map((mood) => {
                                        return (
                                        <SelectItem key={mood.id} value={mood.id}>
                                            <span className='flex items-center gap-2'>
                                                {mood.emoji} {mood.label}
                                            </span>
                                        </SelectItem>
                                        )
                                    })}
                                </SelectContent>
                            </Select>
                        )
                    }}/>
                    {errors.mood && (
                        <p className='text-red-500 text-sm'>{errors.mood.message}</p>
                    )}
                </div>

                <div className='space-y-2'>
                    <label className='text-sm font-medium'>{getMoodById(getValues("mood"))?.prompt?? "Write your thoughts..."}</label>
                    <Controller
                    name ="content"    
                    control={control}                
                    render = {({field}) => (
                        <ReactQuill
                        readOnly={isLoading}
                        theme='snow'
                        value={field.value}
                        onChange={field.onChange}
                        modules={{
                            toolbar:[
                                [{header:[1,2,3,false]}],
                                ['bold', 'italic', 'underline', 'strike'],
                                [{list: 'ordered'}, {list: 'bullet'}],
                                ['blockquote', 'code-block'],
                                ['link'],
                                ['clean'],
                            ]
                        }}
                        />
                    )}/>
                    {errors.content && (
                        <p className='text-red-500 text-sm'>{errors.content.message}</p>
                    )}
                </div>

                <div className='space-y-2'>
                    <label className='text-sm font-medium'>Add to Collection (Optional)</label>
                    <Controller
                    name ="collectionId"    
                    control={control}                
                    render = {({field}) => {
                        return (
                            <Select onValueChange={(value) => {
                                if(value==='new'){
                                    setIsCollectionDialogOpen(true)
                                } else{
                                    field.onChange(value);
                                }
                                }} value={field.value}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Choose a collection..." />
                                </SelectTrigger>
                                <SelectContent>
                                    {collections?.map((collection) => {
                                        return (
                                        <SelectItem key={collection.id} value={collection.id}>
                                            {collection.name}
                                        </SelectItem>
                                        )
                                    })}
                                    <SelectItem value='new'>
                                        <span className='text-orange-600'>
                                            + Create New Collection
                                        </span>
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        )
                    }}/>
                    {errors.collectionId && (
                        <p className='text-red-500 text-sm'>{errors.collectionId.message}</p>
                    )}
                </div>

                <div className='space-x-4 flex'>

                    {!isEditMode && (
                        <Button
                        type="button"
                        variant="outline"
                        onClick={handleSaveDraft}
                        disabled={savingDraft || !isDirty}
                        >
                        {savingDraft && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Save as Draft
                        </Button>
                    )}   
                    <Button type='submit' variant='journal' disabled={actionLoading || !isDirty}>
                        {isEditMode? "Update" : "Publish"}
                    </Button>

                    {isEditMode && (
                        <Button
                        onClick={(e) => {
                          e.preventDefault();
                          router.push(`/journal/${existingEntry.id}`);
                        }}
                        variant="destructive"
                      >
                        Cancel
                      </Button>
                    )}
                </div>
            </form>

            <CollectionForm 
            loading={createCollectionLoading}
            onSuccess={handleCreateCollection}
            open ={isCollectionDialogOpen}
            setOpen={setIsCollectionDialogOpen}/>
        </div>
    )
}

export default JournalEntryPage