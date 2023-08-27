import axios from '../axios';


export const handleLoginAPI = (userEmail, userPassword) => {
    // React frontend call to Server NodeJS
    return axios.post('api/login', { email: userEmail, password: userPassword }) // pass 1 object key, value to server => with name req.body.email, password
}