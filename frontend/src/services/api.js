import axios from 'axios';
const API_BASE_URL = 'https://my-portfolio-api-euq5.onrender.com/api/v1';

// Create an Axios instance
const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
});

// --- Utkarsh Log Service ---

export const loginAdmin = async (password) => {
    try {
        const response = await api.post('/auth/login', { password });
        return response.data; 
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Login failed.');
    }
};

// --- DailyWork Log Service ---

export const getDailyLogs = async (limit, skip) => {
    try {
        const response = await api.get(
            `/worklog/alltask?limit=${limit}&skip=${skip}`
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching daily logs:", error);
        return { data: [], totalLogs: 0 };
    }
};

export const addTask = async (title) => {
    try {
        const response = await api.post('/worklog/createtask', { title });
        return response.data.data; 
    } catch (error) {
        throw new Error(error.response?.data?.error || 'Failed to add task.');
    }
};

export const updateTaskProgress = async (dayId, taskId, progress) => {
    try {
        const response = await api.patch(`/worklog/task/${dayId}/${taskId}`, { progress });
        return response.data.data; 
    } catch (error) {
        throw new Error(error.response?.data?.error || 'Failed to update progress.');
    }
};


// --- Post Log Service (FIXED) ---

// 1. ADD POST
export const addPost = async (category, content) => {
    try {
        const response = await api.post('/post/addpost', { category, content });
        return response.data.data;
    } catch (error) {
        throw new Error(error.response?.data?.error || 'Post not added');
    }
};

// 2. GET POSTS
export const getPost = async (category = "", page = 1, limit = 6) => {
    try {
        const response = await api.get('/post/getpost', {
            params: {
                category: category, 
                page: page,
                limit: limit
            }
        });
        console.log(response.data);
        return response.data; 
    } catch (error) {
        throw new Error(error.response?.data?.error || 'Posts not fetched');
    }
};

// 3. UPDATE POST
export const updatePost = async (id, content) => {
    try {
        const response = await api.patch(`/post/updatepost/${id}`, { content });
        return response.data.data;
    } catch (error) {
        throw new Error(error.response?.data?.error || 'Problem while updating post');
    }
}

// 4. DELETE POST
export const deletePost = async (id) => {
    try {
        const response = await api.delete(`/post/deletepost/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.error || 'Problem while deleting post');
    }
}

