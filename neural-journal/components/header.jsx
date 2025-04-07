import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { SignedOut } from '@clerk/nextjs'
import { SignInButton } from '@clerk/nextjs'
import { UserButton } from '@clerk/nextjs'
import { SignedIn } from '@clerk/nextjs'
import { Button } from './ui/button'
import { FolderOpen, PenBox } from 'lucide-react';
import UserMenu from './user-menu';
import { checkUser } from '@/lib/checkUser';


const SiteHeader = async() => {
    await checkUser();
  return (
    <header className='container mx-auto'>
        <nav className='py-6 px-4 flex justify-between items-center'>
            <Link href={"/dashboard"}>
                <Image
                src={'/neuraljournallogo.png'} alt='Neural Journal Logo' width={300} height={300}
                className='h-10 w-auto object-contain'
                />
            </Link>

            <div className='flex items-center gap-4'>
                <SignedIn>
                    <Link href='/dashboard#collections'>
                        <Button variant="outline" className='flex items-center gap-2'>
                            <FolderOpen size={18}/>
                            <span className='hidden md:inline'>Collections</span>
                        </Button>
                    </Link>
                </SignedIn>

                <Link href='/journal/write'>
                    <Button variant="journal" className='flex items-center gap-2'>
                        <PenBox size={18}/>
                        <span className='hidden md:inline'>Write New</span>
                    </Button>
                </Link>

                <SignedOut>
                    <SignInButton forceRedirectUrl='/dashboard'>
                        <Button variant="outline">Login</Button>
                    </SignInButton>
                </SignedOut>

                <SignedIn>
                    <UserMenu/>
                </SignedIn>
            </div>
        </nav>
    </header>
  )
}

export default SiteHeader