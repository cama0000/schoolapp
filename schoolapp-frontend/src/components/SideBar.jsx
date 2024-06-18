// import React, { useEffect, useRef, useState } from 'react';
// import Link from 'next/link';
// import { useRouter } from 'next/router';
// import { sideBarLinks } from '@/constants';
// import { useAuth } from '@/context/AuthContext';
// import { Button } from '@mui/material';
// import { toast } from 'react-toastify';

// const SideBar = () => {
//   const router = useRouter();
//   const { student, logout } = useAuth();

//   const handleSettingsClick = (event) => {
//     router.push('/settings');
//   };

//   const handleLogoutClick = (event) => {
//     toast.success("Logout Successful!");
//     logout();
//   };

//   return (
//     <div className='hidden md:flex border-r border-blue-300'>
//       <div className='flex flex-col gap-11 bg-purple-500 pr-11 pl-5 relative'>
//         <Link href="/" className="flex gap-3 items-center">
//           Wave
//         </Link>

//         <div>
//           Profile Pic
//         </div>

//         <div>
//           {student?.username}
//         </div>

//         <ul className="flex flex-col gap-6 mb-2">
//           {sideBarLinks.map((link, index) => (
//             <li key={index}>
//               <Link href={link.href} className="flex items-center gap-3">
//                 <img src={link.imgURL} alt={link.label} className='w-6 h-6' />
//                 <span className="text-white hover:text-black cursor-pointer">{link.label}</span>
//               </Link>
//             </li>
//           ))}

//             <li className="px-4 py-2 flex items-center gap-2" onClick={handleSettingsClick}>
              
//               <img src="/assets/images/settings.png" alt="settings" className='w-4 h-4' />
//               <span className="text-white hover:text-black cursor-pointer">Settings</span>
//             </li>

//             <li className="px-4 py-2 flex items-center gap-2 mb-11" onClick={handleLogoutClick}>
//                 <Button className='text-white hover:text-black'>
//                   Logout
//                 </Button>
//             </li>
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default SideBar;


// import React from 'react';
// import Link from 'next/link';
// import { useRouter } from 'next/router';
// import { sideBarLinks } from '@/constants';
// import { useAuth } from '@/context/AuthContext';
// import { Button } from '@mui/material';
// import { toast } from 'react-toastify';

// const SideBar = () => {
//   const router = useRouter();
//   const { student, logout } = useAuth();

//   const handleSettingsClick = () => {
//     router.push('/settings');
//   };

//   const handleLogoutClick = () => {
//     toast.success("Logout Successful!");
//     logout();
//   };

//   return (
//     <div className='fixed top-0 left-0 h-full border-r border-blue-300'>
//       <div className='flex flex-col gap-11 bg-purple-500 pr-11 pl-5 py-5 h-full'>
//         <Link href="/" className="flex gap-3 items-center">
//           Wave
//         </Link>

//         <div>
//           Profile Pic
//         </div>

//         <div>
//           {student?.username}
//         </div>

//         <ul className="flex flex-col gap-6">
//           {sideBarLinks.map((link, index) => (
//             <li key={index}>
//               <Link href={link.href} className="flex items-center gap-3">
//                 <img src={link.imgURL} alt={link.label} className='w-6 h-6' />
//                 <span className="text-white hover:text-black cursor-pointer">{link.label}</span>
//               </Link>
//             </li>
//           ))}
//           <li className="px-4 py-2 flex items-center gap-2" onClick={handleSettingsClick}>
//             <img src="/assets/images/settings.png" alt="settings" className='w-4 h-4' />
//             <span className="text-white hover:text-black cursor-pointer">Settings</span>
//           </li>
//           <li className="px-4 py-2 flex items-center gap-2" onClick={handleLogoutClick}>
//             <Button className='text-white hover:text-black'>
//               Logout
//             </Button>
//           </li>
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default SideBar;



import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { sideBarLinks } from '@/constants';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@mui/material';
import { toast } from 'react-toastify';

const SideBar = () => {
  const router = useRouter();
  const { student, logout } = useAuth();

  const handleSettingsClick = () => {
    router.push('/settings');
  };

  const handleLogoutClick = () => {
    toast.success("Logout Successful!");
    logout();
  };

  return (
    <div className='hidden md:flex fixed top-0 left-0 h-full w-50 border-r border-blue-300'>
      <div className='flex flex-col gap-11 bg-purple-500 pr-11 pl-5 py-5 h-full'>
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
                <img src={link.imgURL} alt={link.label} className='w-6 h-6' />
                <span className="text-white hover:text-black cursor-pointer">{link.label}</span>
              </Link>
            </li>
          ))}
          <li className="px-4 py-2 flex items-center gap-2" onClick={handleSettingsClick}>
            <img src="/assets/images/settings.png" alt="settings" className='w-4 h-4' />
            <span className="text-white hover:text-black cursor-pointer">Settings</span>
          </li>
          <li className="px-4 py-2 flex items-center gap-2" onClick={handleLogoutClick}>
            <Button className='text-white hover:text-black'>
              Logout
            </Button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
