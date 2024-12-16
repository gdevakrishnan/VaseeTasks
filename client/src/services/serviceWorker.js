import Axios from 'axios';
const BASE_URL = "http://localhost:5000/api";

export const managerLogin = async (userData) => {
    const task = await Axios.post(`${BASE_URL}/manager/login`, userData);
    return task;
}

export const workerLogin = async (userData) => {
    const task = await Axios.post(`${BASE_URL}/worker/login`, userData);
    return task;
}