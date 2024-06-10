
// import AuthProvider from '@/context/AuthContext';
// import '../app/globals.css';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';


// function MyApp({ Component, pageProps }) {
//   return (
//     <AuthProvider>
//         <ToastContainer limit={5}/>
//         <Component {...pageProps} />
//     </AuthProvider>
//   );
// }

// export default MyApp;

import '../app/globals.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SideBar from '@/components/SideBar';
import AuthProvider from '@/context/AuthContext';
import { useRouter } from 'next/router';


function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const showSidebar = router.pathname !== '/login' && router.pathname !== '/register' && router.pathname !== '/';

  return (
    <AuthProvider>
      <div className="flex h-screen">
        {showSidebar && <SideBar />}
        <div className="flex-grow">
          <Component {...pageProps} />
        </div>
      </div>
      <ToastContainer limit={5}/>
    </AuthProvider>
  );
}

export default MyApp;
