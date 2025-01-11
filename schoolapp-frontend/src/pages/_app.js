import '../app/globals.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SideBar from '@/components/SideBar';
import AuthProvider from '@/context/AuthContext';
import { useRouter } from 'next/router';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const publicRoutes = ['/login', '/register', '/', '/info', '/password-reset-request', '/password-reset'];
  const showSidebar = !publicRoutes.includes(router.pathname);

  return (
    <AuthProvider>
      <Head>
        <title>Prism</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-purple-50">
        <div className="flex">
          {showSidebar && <SideBar />}
          <main className={`flex-1 ${showSidebar ? 'pl-72' : ''}`}>
            <Component {...pageProps} />
          </main>
        </div>
        <ToastContainer 
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          limit={5}
        />
      </div>
    </AuthProvider>
  );
}

export default MyApp;
