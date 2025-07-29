import axios from 'axios'

const client = axios.create({
    baseURL: "https://corpzo.onrender.com/api"
    // baseURL: "http://localhost:8080/api"
}, {
    withCredentials: true,
})

export default client;

export const reCapchaMatching = async (value) => {
    try {
        const response = await client.post("/verify-recapcha", value)
        return response.data;
    } catch (error) {
        return error
    }
}
