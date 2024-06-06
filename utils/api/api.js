import { getTokenFromStroage } from "../useAuthUtils";

const URL = "http://13.125.83.255:8080";

// GET
export const getRequest = async (endpoint) => {
    try {
        const response = await fetch(`${URL}/${endpoint}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        return await response.json();
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
};

// GET with Token
export const getTokenRequest = async (endpoint) => {
    const token = await getTokenFromStroage();
    console.log("token : ", token);
    try {
        const response = await fetch(`${URL}/${endpoint}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        return await response.json();
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
};

// POST
export const postRequest = async (endpoint, data) => {
    // console.log("확인 : ", data);
    try {
        const response = await fetch(`${URL}/${endpoint}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        return response.json();
    } catch (error) {
        console.error("POST Error:", error);
        con;
        throw error;
    }
};

export default URL;
