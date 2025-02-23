"use client";
import { getAnalytics } from '@/actions/analytics';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import useFetch from '@/hooks/use-fetch';
import { useUser } from '@clerk/nextjs';
import React, { useEffect, useState } from 'react'
import MoodAnalyticsSkeleton from './analytics-loading';
import { Card, CardHeader, CardContent } from '@/components/ui/card';

const timeOptions =[
  {value: "7d", label:"Last 7 Days"},
  {value: "15d", label:"Last 15 Days"},
  {value: "30d", label:"Last 30 Days"},
];

const MoodAnalytics = () => {

  const[period, setPeriod] = useState("7d");

  const {
    loading,
    data: analytics,
    fn: fetchAnalytics,
  } = useFetch(getAnalytics);

  const {isLoaded} = useUser();

  useEffect(() => {
    fetchAnalytics(period);
  }, [period]);

  if (loading || !analytics?.data || !isLoaded){
    return <MoodAnalyticsSkeleton/>
  }

  return (
    <>
      <div className='flex justify-between items-center'>
        <h2 className='text-5xl font-bold gradient-title'>Dashboard</h2>
        <Select value={period} onValueChange={setPeriod}>
          <SelectTrigger className='w-[140px]'>
            <SelectValue/>
          </SelectTrigger>
          <SelectContent>
            {timeOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <div>
        <Card key={i}>
            <CardHeader className="pb-2">
              <Skeleton className="h-4 w-24" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-16 mb-1" />
              <Skeleton className="h-3 w-32" />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}

export default MoodAnalytics