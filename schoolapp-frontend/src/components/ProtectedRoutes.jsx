// import { useAuth } from '@/context/AuthContext'
// import { useRouter } from 'next/router';
// import React, { useEffect, useState } from 'react'

// const ProtectedRoutes = (WrappedComponent) => {
//     return (props) => {
//         const { isStudentAuthenticated } = useAuth();
//         const router = useRouter();
//         const [loading, setLoading] = useState(true);

//         useEffect(() =>{
//             if(!isStudentAuthenticated()){
//                 router.push("/login");
//             }
//             else{
//                 setLoading(false);
//             }
//         }, [isStudentAuthenticated])

//         if(loading){
//             return <div>LOADING</div>
//         }

//         return <WrappedComponent {...props} />;
//     };
// }

// export default ProtectedRoutes;

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const ProtectedRoutes = (WrappedComponent) => {
  const HOC = (props) => {
    const { isStudentAuthenticated } = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      if (!isStudentAuthenticated()) {
        router.push("/");
      } else {
        setLoading(false);
      }
    }, [isStudentAuthenticated, router]);

    if (loading) {
      return <div>LOADING</div>;
    }

    return <WrappedComponent {...props} />;
  };

  HOC.displayName = `ProtectedRoutes(${getDisplayName(WrappedComponent)})`;
  return HOC;
};

// Helper function to set display name
function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export default ProtectedRoutes;
