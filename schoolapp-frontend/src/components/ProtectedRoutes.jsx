import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

const ProtectedRoutes = (WrappedComponent) => {
    return (props) => {
        const { isStudentAuthenticated } = useAuth();
        const router = useRouter();
        const [loading, setLoading] = useState(true);

        useEffect(() =>{
            if(!isStudentAuthenticated()){
                router.push("/login");
            }
            else{
                setLoading(false);
            }
        })

        if(loading){
            return <div>LOADING</div>
        }

        return <WrappedComponent {...props} />;
    };
}

export default ProtectedRoutes;