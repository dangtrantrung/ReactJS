import axios from '../axios';


export const handleLoginAPI = (userEmail, userPassword) => {
    // React frontend call to Server NodeJS
    return axios.post('api/login', { email: userEmail, password: userPassword }) // pass 1 object key, value to server => with name req.body.email, password
}
export const getAllUserAPI = (inputId) => {
        // React frontend call to Server NodeJS
        return axios.get(`api/get-all-users?id=${inputId}`)
    } // get- query params - Postman - 1 object to server => with name req.query.params  =id