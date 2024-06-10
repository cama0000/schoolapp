// import React, { useEffect, useRef, useState } from 'react';
// import Link from 'next/link';
// import { sideBarLinks } from '@/constants';
// import { useAuth } from '@/context/AuthContext';
// import { Button } from '@mui/material';
// import { toast } from 'react-toastify';

// const SideBar = () => {
//   const { student, logout } = useAuth();
//   const [dropdownVisible, setDropdownVisible] = useState(false);
//   const dropdownRef = useRef(null);

//   const toggleDropdown = () => {
//     setDropdownVisible(!dropdownVisible);
//   };

//   const handleClickOutside = (event) => {
//     if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//       setDropdownVisible(false);
//     }
//   };

//   useEffect(() => {
//     if (dropdownVisible) {
//       document.addEventListener('mousedown', handleClickOutside);
//     } else {
//       document.removeEventListener('mousedown', handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, [dropdownVisible]);

//   return (
//     <div className='hidden md:flex border-r border-blue-300'>
//       <div className='flex flex-col gap-11 bg-purple-500 pr-11 pl-5 relative'>
//         <Link href="/" className="flex gap-3 items-center">
//           Wave
//         </Link>

//         <div onClick={toggleDropdown} ref={dropdownRef} className="hover:cursor-pointer">
//           Profile Pic
//         </div>

//         {dropdownVisible && (
//           <div className="absolute mt-2 w-48 bg-white rounded-md shadow-lg z-10">
//             <ul className="py-1">
//               <li className="px-4 py-2 hover:bg-gray-200 flex items-center gap-2">
//                 <img src="/assets/images/settings.png" alt="settings" className='w-4 h-4' />
//                 <Link href="/settings">
//                   <div className="hover:text-black">Settings</div>
//                 </Link>
//               </li>
//               <li className="px-4 py-2 hover:bg-gray-200 flex items-center gap-2">
//                 <Button
//                   onClick={() => {
//                     toast.success("Logout Successful!");
//                     logout();
//                   }}
//                 >
//                   Logout
//                 </Button>
//               </li>
//             </ul>
//           </div>
//         )}

//         <div>
//           {student?.username}
//         </div>

//         <ul className="flex flex-col gap-6">
//           {sideBarLinks.map((link, index) => (
//             <li key={index}>
//               <Link href={link.href} className="flex items-center gap-3">
//                 <img src={link.imgURL} alt={link.label} className='w-6 h-6' />
//                 <div lassName="text-white hover:text-black">{link.label}</div>
//               </Link>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default SideBar;
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { sideBarLinks } from '@/constants';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@mui/material';
import { toast } from 'react-toastify';

const SideBar = () => {
  const router = useRouter();
  const { student, logout } = useAuth();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleClickOutside = (event) => {
    // if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
    //   setDropdownVisible(false);
    // }

    if(dropdownVisible && dropdownRef.current && !dropdownRef.current.contains(event.target)){
        setDropdownVisible(false);
     };
  };

  

  useEffect(() => {
    // if (dropdownVisible) {
    //   document.addEventListener('mousedown', handleClickOutside);
    // } else {
    //   document.removeEventListener('mousedown', handleClickOutside);
    // }

    // return () => {
    //   document.removeEventListener('mousedown', handleClickOutside);
    // };

     // Bind the event listener
     document.addEventListener("mousedown", handleClickOutside);
     return () => {
       // Unbind the event listener on clean up
       document.removeEventListener("mousedown", handleClickOutside);
   };
  }, [dropdownVisible]);

  const handleSettingsClick = (event) => {
    // event.stopPropagation();
    router.push('/settings');
  };

  const handleLogoutClick = (event) => {
    // event.stopPropagation();
    toast.success("Logout Successful!");
    logout();
  };

  return (
    <div className='hidden md:flex border-r border-blue-300'>
      <div className='flex flex-col gap-11 bg-purple-500 pr-11 pl-5 relative'>
        <Link href="/" className="flex gap-3 items-center">
          Wave
        </Link>

        <div onClick={toggleDropdown} ref={dropdownRef} className="hover:cursor-pointer">
          Profile Pic
        </div>

        {dropdownVisible && (
          <div className="absolute mt-2 w-48 bg-white rounded-md shadow-lg z-10">
            <ul className="py-1">
              <li className="px-4 py-2 hover:bg-gray-200 flex items-center gap-2" onClick={handleSettingsClick}>
                <img src="/assets/images/settings.png" alt="settings" className='w-4 h-4' />
                <span className="hover:text-black cursor-pointer">Settings</span>
              </li>
              <li className="px-4 py-2 hover:bg-gray-200 flex items-center gap-2" onClick={handleLogoutClick}>
                <Button>
                  Logout
                </Button>
              </li>
            </ul>
          </div>
        )}

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
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
