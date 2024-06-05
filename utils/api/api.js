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

// POST
export const postRequest = async (endpoint, data) => {
  try {
    const response = await fetch(`${URL}/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export default URL;
