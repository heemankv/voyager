import Image from 'next/image'
import React, { useState } from 'react'

export default function Copy(props: {text:string, className?: string}) {
  const [copySuccess, setCopySuccess] = useState('');

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(props.text);
      setCopySuccess('Copied');
    } catch (err) {
      setCopySuccess('Failed');
    }
  };

  return (
    <button>
      <Image 
       className={props.className} 
       src={'/copy_to_clipboard.svg'}
       height={26}
       width={26}
       quality={100}
       onClick={copyToClipboard}
       alt={"Copy"}
       />
    </button>
  )
}
