import React, { useState } from 'react';
import Link from 'next/link'
import { sideBarLinks } from '@/constants';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@mui/material';

const SideBar = () => {
    const [profileDropdown, setProfileDropwdown] = useState(false);
    const { student, logout } = useAuth();

  return (
    <div className='hidden md:flex border-r border-blue-300'>
        <div className='flex flex-col gap-11 bg-purple-500 pr-11 pl-5'>
            <Link href="/" className="flex gap-3 items-center">
                Wave
            </Link>

            <div>
                Profile Pic
            </div>

            <div>
                {student?.username}
            </div>

            <ul className="flex flex-col gap-6">
                {sideBarLinks.map((link, index) => (
                    <li key={index}>
                        <Link href={link.href} className="flex items-center gap-3">
                            <img src={ link.imgURL } alt={ link.label } className='w-6 h-6' />
                            <span className="text-white hover:text-blue-300">{link.label}</span>
                        </Link>
                    </li>
                ))}

                <Button onClick={logout}>
                    Logout
                </Button>
            </ul>
        </div>
    </div>
  );
};

export default SideBar;
