import axios from "axios";

const HOST_NAME = "http://localhost:8080/";

// include for all authorized endpoint calls
const getAuthConfig = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`
    }
})

// const getAuthAndTimeZoneConfig = async () => {
//     const options = await Intl.DateTimeFormat().resolvedOptions();
//     const timezone = options.timeZone;
  
//     return {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("access_token")}`,
//         'timezone': timezone
//       }
//     };
//   };
  

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

export const getStudentCourses = async (studentId) => {
    try {
        const response = await axios.get(`${HOST_NAME}student/getStudentCourses/${studentId}`,
            getAuthConfig());
            
        return response.data;
    } catch (err) {
        console.log("GETCOURSES CLIENT ERROR: " + err);
        throw err;
    }
};

export const getCourse = async (courseId) => {
    try {
        const response = await axios.get(`${HOST_NAME}course/getCourse/${courseId}`,
            getAuthConfig());

        return response.data;
    } catch (err) {
        console.log("GETCOURSE CLIENT ERROR: " + err);
        throw err;
    }
};

export const addTask = async (task) => {
    try {
        const response = await axios.post(`${HOST_NAME}task/add`, task,
            getAuthConfig());

        return response.data;
    } catch (err) {
        console.log("ADDTASK CLIENT ERROR: " + err);
        throw err;
    }
};

export const getTasksByCourse = async (courseId) => {
    try {
        const options = Intl.DateTimeFormat().resolvedOptions();
        const timezone = options.timeZone;

        const response = await axios.get(`${HOST_NAME}course/getTasksByCourse/${courseId}`,
            {headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                'timezone': timezone
            }});
            
        return response.data;
    } catch (err) {
        console.log("GETTASKS CLIENT ERROR: " + err);
        throw err;
    }
};

export const getTasksByStudent = async (studentId) => {
    try {
        const options = Intl.DateTimeFormat().resolvedOptions();
        const timezone = options.timeZone;

        const response = await axios.get(`${HOST_NAME}student/getStudentTasks/${studentId}`,
            {headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                'timezone': timezone
            }});
            
        return response.data;
    } catch (err) {
        console.log("GETTASKSSTUDENT CLIENT ERROR: " + err);
        throw err;
    }
};

export const deleteTask = async (taskId) => {
    try {
        const response = await axios.delete(`${HOST_NAME}task/delete/${taskId}`,
            getAuthConfig());

        return response.data;
    } catch (err) {
        console.log("DELETETASK CLIENT ERROR: " + err);
        throw err;
    }
};

export const markCompleted = async (task) => {
    try {
        const response = await axios.put(`${HOST_NAME}task/markCompleted`, task,
            getAuthConfig());

        return response.data;
    } catch (err) {
        console.log("MARKCOMPLETED CLIENT ERROR: " + err);
        throw err;
    }
};