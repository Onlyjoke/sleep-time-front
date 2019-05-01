import axios from 'axios';

export default {
    getAllData: () => axios.get('http://0.0.0.0:3030/actions')
        .then((response) => response),
    setAction: (action) => axios.post('http://0.0.0.0:3030/action', { action }),
    delAction: (id) => axios.delete(`http://0.0.0.0:3030/action/${id}`),
    updateTime: (id, createdAt) => axios.put(`http://0.0.0.0:3030/action/update/${id}`, { createdAt })
};
