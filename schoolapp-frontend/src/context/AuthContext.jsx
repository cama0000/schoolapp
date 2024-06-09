// import {
//     createContext,
//     useContext,
//     useEffect,
//     useState
// } from "react";

// import {login as performLogin, getStudentFromUsername as getStudent} from "../services/client.js";
// import {jwtDecode} from "jwt-decode";

// const AuthContext = createContext({});

// const AuthProvider = ({children}) => {
//     const [student, setStudent] = useState();

//     const setStudentFromToken = () =>{
//         let token = localStorage.getItem("access_token");

//         if(token){
//             token = jwtDecode(token);

//             // setStudent(getStudent(token.sub))

//             setStudent({
//                 username: token.sub,
//                 roles: token.scopes
//             })
//         }

//     }

//     useEffect(() =>{
//         setStudentFromToken()
//     }, [])

//     const login = async (usernamePassword) => {
//         return new Promise((resolve, reject) => {

//             performLogin(usernamePassword)
//                 .then(res => {
//                     const jwtToken = res.headers["authorization"];

//                     localStorage.setItem("access_token", jwtToken);

//                     const decodedToken = jwtDecode(jwtToken);

//                     // setStudent(getStudent(decodedToken.sub))

//                     setStudent({
//                         username: decodedToken.sub,
//                         roles: decodedToken.scopes
//                     })

//                     resolve(res);
//                 }).catch(err => {
//                     reject(err);
//                 })
//         })
//     }

//     const logout = () => {
//         localStorage.removeItem("access_token")
//         setStudent(null);
//     }

//     const isStudentAuthenticated = () =>{
//         // check if token exists
//         const token = localStorage.getItem("access_token");
//         if(!token){
//             return false;
//         }
        
//         // check if token expired
//         const {exp: expiration} = jwtDecode(token);

//         if(Date.now() > expiration * 1000){
//             logout();
//             return false;
//         }

//         return true;
//     }
    
//     return (
//         <AuthContext.Provider value={{
//             student,
//             login,
//             logout,
//             isStudentAuthenticated,
//             setStudentFromToken
//         }}>
//             {children}
//         </AuthContext.Provider>
//     )
// }

// export const useAuth = () => useContext(AuthContext);

// export default AuthProvider;

import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

import { login as performLogin, getStudentFromUsername as getStudent } from "../services/client.js";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
    const [student, setStudent] = useState();

    const setStudentFromToken = async () => {
        let token = localStorage.getItem("access_token");

        if(token){
            token = jwtDecode(token);
            try{
                const studentData = await getStudent(token.sub);
                setStudent(studentData);
            } catch (error) {
                console.error("Error fetching student data:", error);
            }
        }
    };

    useEffect(() => {
        setStudentFromToken();
    }, []);

    const login = async (usernamePassword) => {
        return new Promise((resolve, reject) => {
            performLogin(usernamePassword)
                .then(async (res) => {
                    const jwtToken = res.headers["authorization"];
                    localStorage.setItem("access_token", jwtToken);
                    const decodedToken = jwtDecode(jwtToken);
                    try{
                        const studentData = await getStudent(decodedToken.sub);

                        setStudent(studentData);
                        resolve(res);
                    } catch (error) {
                        console.error("Error fetching student data:", error);
                        reject(error);
                    }
                })
                .catch((err) => {
                    reject(err);
                });
        });
    };

    const logout = () => {
        localStorage.removeItem("access_token");
        setStudent(null);
    };

    const isStudentAuthenticated = () => {
        // check if token exists
        const token = localStorage.getItem("access_token");
        if (!token) {
            return false;
        }

        // check if token expired
        const { exp: expiration } = jwtDecode(token);
        if (Date.now() > expiration * 1000) {
            logout();
            return false;
        }

        return true;
    };

    return (
        <AuthContext.Provider
            value={{
                student,
                login,
                logout,
                isStudentAuthenticated,
                setStudentFromToken,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
