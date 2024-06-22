import React, { useEffect, useState } from 'react'
import { getCurrentTime, timeAgo } from '@/utils/helpers';

export default function TimeAgo(props: { unixTime : number}) {

  const [currentTime, setCurrentTime] = useState<number>(getCurrentTime());

  useEffect(()=>{
    const interval = setInterval(() => {
      setCurrentTime(getCurrentTime());
    }, 1000);
    return () => clearInterval(interval);
  }
  ,[]);
  
  return (
    <div>{timeAgo(currentTime, props.unixTime )} ago</div>
  )
}
