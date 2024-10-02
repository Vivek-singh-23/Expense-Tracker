import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

function Header() {
  return (
    <div className='p-5 flex justify-between items-center border shadow-sm'>
        <Image  
            src={"./logo.svg"}
            width={75}
            height={100}
            alt="logo"/>

         <Button>Get Started</Button>   
    </div>
  )
}

export default Header