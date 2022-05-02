import axios from 'axios';

const axiosHelper = axios.create({ baseURL: 'http://localhost:8000/' });

export default axiosHelper;