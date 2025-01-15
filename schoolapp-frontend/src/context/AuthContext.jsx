import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

import { login as performLogin, getStudentFromUsername as getStudent, getCourse, getPage, deleteAccount } from "../services/client.js";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
    const [student, setStudent] = useState();
    const [course, setCourse] = useState();
    const [page, setPage] = useState();

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

    const setCourseFromId = async (id) =>{
        try {
            const courseData = await getCourse(id);
            setCourse(courseData);
          } catch (error) {
            console.error("Error fetching course data:", error);
          }
    }

    const setPageFromId = async (id) =>{
        try {
            const pageData = await getPage(id);
            setPage(pageData);
          } catch (error) {
            setPage(null);
            console.error("Error fetching page data:", error);
          }
    }

    const authDeleteAccount = async () => {
        try {
            await deleteAccount(student?.id);

            setStudent(null);
            localStorage.removeItem('access_token');
        } catch (error) {
            console.error("Error deleting account:", error);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                student,
                course,
                setCourseFromId,
                page,
                setPageFromId,
                login,
                logout,
                authDeleteAccount,
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
