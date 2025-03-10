import axios from "axios"

const employeeApi = axios.create({
    baseURL: 'https://randomuser.me/api',
})

export default employeeApi
