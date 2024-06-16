import axios from "axios";

const HOST_NAME = "http://localhost:8080/";

// include for all authorized endpoint calls
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

export const getStudentFromUsername = async (username) => {
    try {
        const response = await axios.get(`${HOST_NAME}student/getStudentFromUsername/${username}`)
        return response.data;
    } catch (err) {
        console.log("GETSTUDENT CLIENT ERROR: " + err);
        throw err;
    }
};

export const addCourse = async (course) => {
    try {
        const response = await axios.post(`${HOST_NAME}course/add`, course,
            getAuthConfig());

        return response.data;
    } catch (err) {
        console.log("ADDCOURSE CLIENT ERROR: " + err);
        throw err;
    }
};

export const deleteCourse = async (courseId) => {
    try {
        const response = await axios.delete(`${HOST_NAME}course/delete/${courseId}`,
            getAuthConfig());

        return response.data;
    } catch (err) {
        console.log("DELETECOURSE CLIENT ERROR: " + err);
        throw err;
    }
};

export const getStudentCourses = async (id) => {
    try {
        const response = await axios.get(`${HOST_NAME}student/getStudentCourses/${id}`,
            getAuthConfig());
            
        return response.data;
    } catch (err) {
        console.log("GETCOURSES CLIENT ERROR: " + err);
        throw err;
    }
};