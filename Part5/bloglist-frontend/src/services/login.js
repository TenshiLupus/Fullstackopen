import axios from "axios"
const baseUrl = '/api/login'

const login = async credentials => {
    const response = await axios.post(baseUrl, credentials)
    console.log("THIS IS THE RESPONSE AFTER LOGIN: ", response)
    return response.data
}

export default {login}