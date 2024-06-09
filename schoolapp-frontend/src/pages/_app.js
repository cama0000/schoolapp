
import AuthProvider from '@/context/AuthContext';
import '../app/globals.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
        <ToastContainer limit={5}/>
        <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;