"use server"
import axios from 'axios';
import { handleGetCookie } from './context/auth-handler';
const base_url = "https://2no444qa0h.execute-api.us-east-1.amazonaws.com"



const getToken =  async ()=> await handleGetCookie()
// // console.log(getToken(), "-----")




export async function POST({ body, path = "/", headers = null }) {
    try {
        const response = await axios.post(`${base_url}${path}`, body, { headers });
        // // console.log('Signup successful:', response.data);
        return response.data
    } catch (error) {
        // console.error('Error during signup:', error.response ? error.response.data : error.message);
        return error.response ? error.response.data : error.message
    }
}



export async function GET({ path = "/", headers = null }) {
    try {
        const response = await axios.get(`${base_url}${path}`, { headers });
        // // console.log('Signup successful:', response.data);
        return response.data
    } catch (error) {
        // console.error('Error during signup:', error.response ? error.response.data : error.message);
        return error.response ? error.response.data : error.message
    }
}
