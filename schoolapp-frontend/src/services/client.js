import axios from "axios";

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
            `${process.env.NEXT_PUBLIC_HOST_NAME}authorization/authenticate`, usernamePassword
        )
    }catch(err){
        console.log("LOGIN CLIENT ERROR: " + err)
        throw err;
    }
}

export const getStudentFromUsername = async (username) => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_HOST_NAME}student/getStudentFromUsername/${username}`)
        return response.data;
    } catch (err) {
        console.log("GETSTUDENT CLIENT ERROR: " + err);
        throw err;
    }
};

export const addCourse = async (course) => {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_HOST_NAME}course/add`, course,
            getAuthConfig());

        return response.data;
    } catch (err) {
        console.log("ADDCOURSE CLIENT ERROR: " + err);
        throw err;
    }
};

export const deleteCourse = async (courseId) => {
    try {
        const response = await axios.delete(`${process.env.NEXT_PUBLIC_HOST_NAME}course/delete/${courseId}`,
            getAuthConfig());

        return response.data;
    } catch (err) {
        console.log("DELETECOURSE CLIENT ERROR: " + err);
        throw err;
    }
};

export const getStudentCourses = async (studentId) => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_HOST_NAME}student/getStudentCourses/${studentId}`,
            getAuthConfig());
            
        return response.data;
    } catch (err) {
        console.log("GETCOURSES CLIENT ERROR: " + err);
        throw err;
    }
};

export const getCourse = async (courseId) => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_HOST_NAME}course/getCourse/${courseId}`,
            getAuthConfig());

        return response.data;
    } catch (err) {
        console.log("GETCOURSE CLIENT ERROR: " + err);
        throw err;
    }
};

export const addTask = async (task) => {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_HOST_NAME}task/add`, task,
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

        const response = await axios.get(`${process.env.NEXT_PUBLIC_HOST_NAME}course/getTasksByCourse/${courseId}`,
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

        const response = await axios.get(`${process.env.NEXT_PUBLIC_HOST_NAME}student/getStudentTasks/${studentId}`,
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
        const response = await axios.delete(`${process.env.NEXT_PUBLIC_HOST_NAME}task/delete/${taskId}`,
            getAuthConfig());

        return response.data;
    } catch (err) {
        console.log("DELETETASK CLIENT ERROR: " + err);
        throw err;
    }
};

export const markCompleted = async (task) => {
    try {
        const response = await axios.put(`${process.env.NEXT_PUBLIC_HOST_NAME}task/markCompleted`, task,
            getAuthConfig());

        return response.data;
    } catch (err) {
        console.log("MARKCOMPLETED CLIENT ERROR: " + err);
        throw err;
    }
};

export const getPagesByCourse = async (courseId) => {
    try {
        // const options = Intl.DateTimeFormat().resolvedOptions();
        // const timezone = options.timeZone;

        const response = await axios.get(`${process.env.NEXT_PUBLIC_HOST_NAME}page/getPagesByCourse/${courseId}`,
            getAuthConfig());
            
        return response.data;
    } catch (err) {
        console.log("GETPAGESCOURSE CLIENT ERROR: " + err);
        throw err;
    }
};

export const addPage = async (page) => {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_HOST_NAME}page/add`, page,
            getAuthConfig());

        return response.data;
    } catch (err) {
        console.log("ADDPAGE CLIENT ERROR: " + err);
        throw err;
    }
};

export const getPage = async (pageId) => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_HOST_NAME}page/getPage/${pageId}`,
            getAuthConfig());

        return response.data;
    } catch (err) {
        console.log("GETPAGE CLIENT ERROR: " + err);
        throw err;
    }
};

export const savePageContent = async (pageId, rawContent) => {
    try {
        console.log("THE REALL ONE ID IS : " + pageId);
        console.log("THE RAW CONTENT IS : " + rawContent);
        const response = await axios.put(`${process.env.NEXT_PUBLIC_HOST_NAME}page/savePageContent/${pageId}`, 
            { content: rawContent },
            getAuthConfig());

        return response.data;
    } catch (err) {
        console.log("SAVEPAGECONTENT CLIENT ERROR: " + err);
        throw err;
    }
};

export const loadPageContent = async (pageId) => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_HOST_NAME}page/loadPageContent/${pageId}`, 
            getAuthConfig());

        return response.data;
    } catch (err) {
        console.log("LOADPAGECONTENT CLIENT ERROR: " + err);
        throw err;
    }
};

export const deletePage = async (pageId) => {
    try {
        const response = await axios.delete(`${process.env.NEXT_PUBLIC_HOST_NAME}page/delete/${pageId}`,
            getAuthConfig());

        return response.data;
    } catch (err) {
        console.log("DELETEPAGE CLIENT ERROR: " + err);
        throw err;
    }
};

export const getPagesByStudent = async (studentId) => {
    try {
        // const options = Intl.DateTimeFormat().resolvedOptions();
        // const timezone = options.timeZone;

        const response = await axios.get(`${process.env.NEXT_PUBLIC_HOST_NAME}page/getPagesByStudent/${studentId}`,
            getAuthConfig());
            
        return response.data;
    } catch (err) {
        console.log("GETPAGESSTUDENT CLIENT ERROR: " + err);
        throw err;
    }
};

export const getPagesBySearch = async (search) => {
    try {
        // const options = Intl.DateTimeFormat().resolvedOptions();
        // const timezone = options.timeZone;

        const response = await axios.post(`${process.env.NEXT_PUBLIC_HOST_NAME}page/getPagesBySearch`, search, 
            getAuthConfig());
            
        return response.data;
    } catch (err) {
        console.log("GETPAGESSEARCH CLIENT ERROR: " + err);
        throw err;
    }
};