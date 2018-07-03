import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-reactjs-4c3ab.firebaseio.com/'
});

export default instance;