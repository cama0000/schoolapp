import React, { useState } from 'react';
import Link from 'next/link'

const SideBar = () => {
    const [profileDropdown, setProfileDropwdown] = useState(false);


  return (
    // <div className="sidebar">
    //   <div className="sidebar-title">Menu</div>
    //   <ul className="sidebar-list">
    //     <li className="sidebar-item">
    //       <Link to="/home">Home</Link>
    //     </li>
    //   </ul>
    // </div>
    <div className='hidden md:flex border-r border-blue-300 pr-8 ml-6'>
        <div className='flex flex-col gap-11 bg-purple-500'>
            <Link href="/" className="flex gap-3 items-center">
                Wave
            </Link>

            <div>
                ProfilePic
            </div>
        </div>
    </div>
  );
};

export default SideBar;
