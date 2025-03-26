import { getCollections } from '@/actions/collection'
import { getJournalEntries } from '@/actions/journal';
import { prisma } from '@/lib/prisma';

import React from 'react'
import Collections from './_components/collections';
import MoodAnalytics from './_components/mood-analytics';

const Dashboard = async () => {
  const collections = await getCollections();
  const entriesData = await getJournalEntries();
  console.log("entriesData:", entriesData.error);
  console.log("collections:", collections);

  // Group entries by collection
  const entriesByCollection = (entriesData?.data?.entries || []).reduce(
    (acc, entry) => {
      const collectionId = entry.collectionId || "unorganized";
      if (!acc[collectionId]) {
        acc[collectionId] = [];
      }
      acc[collectionId].push(entry);
      return acc;
    },
    {}
  );
  

  return (
    <div className="px-4 py-8 space-y-8">
      {/* Analytics Section */}
      <section className="space-y-4">
        <MoodAnalytics />
      </section>

      <Collections
        collections={collections}
        entriesByCollection={entriesByCollection}
      />
    </div>
  );
};

export default Dashboard;
// import { getCollections } from '@/actions/collection'
// import { getJournalEntries } from '@/actions/journal';
// import React from 'react'
// import Collections from './_components/collections';

// const Dashboard = async () => {
//   const collections = await getCollections();
//   const entriesData = await getJournalEntries();

//   const entriesByCollection = entriesData?.data?.entries?.reduce((acc, entry) => {
//     const collectionId = entry.collectionId || "unorganized";
//     if(!acc[collectionId]){
//       acc[collectionId] =[];
//     }
//     acc[collectionId].push(entry)
//     return acc;
//   }, {});

//   return (
//     <div className='px-4 py-8 space-y-8'>
//       <section className='space-y-4'>
//         Mood Analytics
//       </section>
//       <Collections collections={collections} entriesByCollection={entriesByCollection}/>

//     </div>
//   )
// }

// export default Dashboard