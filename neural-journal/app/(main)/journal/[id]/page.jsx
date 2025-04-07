import { getJournalEntry } from '@/actions/journal';
import { getMoodById } from '@/app/lib/moods';
import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import EditButton from './_components/edit-button';
import DeleteDialog from './_components/delete-dialogue';

const JournalEntryPage = async ({ params }) => {
    const { id } = await params;

    const entry = await getJournalEntry(id);
    const mood = getMoodById(entry.mood);
    const imageUrl = entry.moodImageUrl && entry.moodImageUrl.startsWith("http")
        ? entry.moodImageUrl
        : "/neuraljournallogo.png"; // Default image in /public

    return (
        <>
            {/* Render image only if moodImageUrl is present */}
            {entry.moodImageUrl && (
                <div className='relative h-48 md:h-64 w-full'>
                    <Image
                        src={imageUrl}
                        alt="Mood visualization"
                        className="object-contain"
                        fill
                        priority
                    />
                </div>
            )}
    <div className='p-6 space-y-6'>
        <div className='space-y-4'>
            <div className='flex flex-wrap items-center justify-between gap-4'>
                <div className='space-y-1'>
                    <h1 className='text-5xl font-bold gradient-title'>
                        {entry.title}
                    </h1>
                    <p className='text-gray-500'>
                        Created {format(new Date(entry.createdAt), "PPP")}
                    </p>
                </div>

                <div className='flex items-center gap-2'>
                    <EditButton entryId={id}/>
                    <DeleteDialog entryId={id}/>
                </div>
            </div>

            <div>
                {entry.collection && (
                    <Link href={`/collection/${entry.collection.id}`}>
                        <Badge>Collection: {entry.collection.name}</Badge>
                    </Link>
                )}

                <Badge variant="outline" style={{
                        backgroundColor: `var(--${mood?.color}-50)`,
                        color: "#7c3aed",
                        borderColor: `var(--${mood?.color}-200)`,
                    }}
                >
                Feeling {mood?.label}
                </Badge>
            </div>
        </div>

        <hr/>

        <div className='text-violet-100 ql-snow'>
            <div className='ql-editor' dangerouslySetInnerHTML={{__html:entry.content}}/>
        </div>

        <div className="text-sm text-gray-500 pt-4 border-t">
          Last updated {format(new Date(entry.updatedAt), "PPP 'at' p")}
        </div>
    </div>
    </>
  )
}

export default JournalEntryPage