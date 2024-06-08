
import AuthProvider from '@/context/AuthContext';
import '../app/globals.css';
import { ToastContainer } from 'react-toastify';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
        <ToastContainer/>
        <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;