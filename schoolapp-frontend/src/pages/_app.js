// // import '../app/globals.css';
// // import { ToastContainer } from 'react-toastify';
// // import 'react-toastify/dist/ReactToastify.css';
// // import SideBar from '@/components/SideBar';
// // import AuthProvider from '@/context/AuthContext';
// // import { useRouter } from 'next/router';
// // import CourseSideBar from '@/components/CourseSideBar';

// // function MyApp({ Component, pageProps }) {
// //   const router = useRouter();
// //   const showSidebar = router.pathname !== '/login' && router.pathname !== '/register' && router.pathname !== '/';

// //   return (
// //     <AuthProvider>
// //       <div className="flex h-screen">
// //         {showSidebar && <SideBar />}
// //         <CourseSideBar/>
// //         <div className={`${showSidebar ? 'ml-48' : ''} flex-grow`}>
// //           <Component {...pageProps} />
// //         </div>
// //       </div>
// //       <ToastContainer limit={5} />
// //     </AuthProvider>
// //   );
// // }

// // export default MyApp;


// import '../app/globals.css';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import SideBar from '@/components/SideBar';
// import AuthProvider from '@/context/AuthContext';
// import { useRouter } from 'next/router';
// import CourseSideBar from '@/components/CourseSideBar';

// function MyApp({ Component, pageProps }) {
//   const router = useRouter();
//   const showSidebar = router.pathname !== '/login' && router.pathname !== '/register' && router.pathname !== '/';
//   const showCourseSideBar = router.pathname.startsWith('/courses/'); // Assuming your course page route starts with '/course'

//   return (
//     <AuthProvider>
//       <div className="flex h-screen">
//         {/* {showSidebar && <SideBar />} */}
//         {showCourseSideBar && <CourseSideBar />}
//         <div className={`${showSidebar ? 'ml-32' : ''} ${showCourseSideBar ? 'ml-64' : ''} flex-grow`}>
//           <Component {...pageProps} />
//         </div>
//       </div>
//       <ToastContainer limit={5} />
//     </AuthProvider>
//   );
// }

// export default MyApp;

// MyApp.jsx



import '../app/globals.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SideBar from '@/components/SideBar';
import AuthProvider from '@/context/AuthContext';
import { useRouter } from 'next/router';
import CourseSideBar from '@/components/CourseSideBar';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const showSidebar = router.pathname !== '/login' && router.pathname !== '/register' && router.pathname !== '/';
  const showCourseSideBar = router.pathname.startsWith('/courses/') && router.pathname !== '/courses';

  return (
    <AuthProvider>
      <div className="flex h-screen">
        {showSidebar && <SideBar />}
        <div className={`${showSidebar ? 'ml-32' : ''} flex-grow flex`}>
          {showCourseSideBar && (
            <>
              <SideBar/>
              <CourseSideBar/>
            </>
          )}
          <Component {...pageProps} />
        </div>
      </div>
      <ToastContainer limit={5} />
    </AuthProvider>
  );
}

export default MyApp;