import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

import {login as performLogin} from "../services/client.js";
import {jwtDecode} from "jwt-decode";

const AuthContext = createContext({});

const AuthProvider = ({children}) => {
    const [student, setStudent] = useState();

    const setStudentFromToken = () =>{
        console.log("SETSTUDENTTOKEN")
        let token = localStorage.getItem("access_token");

        console.log("TOKEN: " + token);

        if(token){
            console.log("TOKEN EXISTS")
            token = jwtDecode(token);
            setStudent({
                username: token.sub,
                roles: token.scopes
            })
        }
    }

    useEffect(() =>{
        console.log("USE UEFFECT")
        setStudentFromToken()
    }, [])

    const login = async (usernamePassword) => {
        console.log("LOGIN")

        return new Promise((resolve, reject) => {

            performLogin(usernamePassword)
                .then(res => {
                    console.log("RES HEADERS: " + res.headers)
                    const jwtToken = res.headers["authorization"];

                    console.log("BEFORE DECODE TOKEN: " + jwtToken)

                    localStorage.setItem("access_token", jwtToken);

                    

                    const decodedToken = jwtDecode(jwtToken);

                    console.log("AFTER DECODE")

                    setStudent({
                        username: decodedToken.sub,
                        roles: decodedToken.scopes
                    })

                    
                    resolve(res);
                }).catch(err => {
                    reject(err);
                })
        })
    }

    const logout = () => {
        localStorage.removeItem("access_token")
        setStudent(null);
    }

    const isStudentAuthenticated = () =>{
        // check if token exists
        const token = localStorage.getItem("access_token");
        if(!token){
            return false;
        }
        
        // check if token expired
        const {exp: expiration} = jwtDecode(token);

        if(Date.now() > expiration * 1000){
            logout();
            return false;
        }

        return true;
    }
    
    return (
        <AuthContext.Provider value={{
            student,
            login,
            logout,
            isStudentAuthenticated,
            setStudentFromToken
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;

