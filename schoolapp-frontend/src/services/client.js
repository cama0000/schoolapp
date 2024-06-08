import axios from "axios";

const HOST_NAME = "http://localhost:8080/";

const getAuthConfig = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`
    }
})

export const login = async (usernamePassword) => {
    try{
        return await axios.post(
            `${HOST_NAME}authorization/authenticate`, usernamePassword
        )
    }catch(err){
        console.log("LOGIN CLIENT ERROR: " + err)
        throw err;
    }
}