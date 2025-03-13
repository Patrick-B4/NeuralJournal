"use client";
import React from 'react'
import CollectionPreview from './collection-preview';
import { useState } from 'react';
import CollectionForm from '@/components/collection-dialog';
import useFetch from '@/hooks/use-fetch';
import { toast } from 'sonner';
import { createCollection } from '@/actions/collection';
import { useEffect } from 'react';

const Collections = ({collections = [], entriesByCollection}) => {
    const [isCollectionDialogOpen, setIsCollectionDialogOpen] = useState(false);

    const handleCreateCollection = async (data) => {
        createCollectionFn(data);
    };

    if(collections.length === 0) return <></>;

    const {loading: createCollectionLoading, fn: createCollectionFn, data: createdCollection} = useFetch(createCollection);

    useEffect(() => {
        if(createdCollection){
            setIsCollectionDialogOpen(false);
            // fetchCollections();
            setValue("collectionId", createdCollection.id);
            toast.success(`Collection ${createdCollection.name} created!`);
        }
    }, [createdCollection]);

    console.log("ENTRIES BY COLLECTION HERE")
    console.log(entriesByCollection)

  return (
    <section id='collections' className='space-y-6'>
        <h2 className='text-3xl font-bold gradient-title'>Collections</h2>
        <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
            <CollectionPreview
            isCreateNew={true}
            onCreateNew={()=> setIsCollectionDialogOpen(true)}
            />

            {entriesByCollection?.unorganized?.length > 0 &&(
                <CollectionPreview
                name='Unorganized'
                entries ={entriesByCollection.unorganized}
                isUnorganized={true}/>
            )}

            {collections?.map((collection) => (
                <CollectionPreview
                key={collection.id}
                id={collection.id}
                name={collection.name}
                entries={entriesByCollection?.[collection.id] || []}/> //SOMETHING IS WRONG HERE 
            ))}

            <CollectionForm 
                loading={createCollectionLoading}
                onSuccess={handleCreateCollection}
                open ={isCollectionDialogOpen}
                setOpen={setIsCollectionDialogOpen}
            />
        </div>
    </section>
  )
}

export default Collections