import axios from 'axios';

export default {
    getAllData: () => axios.get('https://st-back1.herokuapp.com/actions')
        .then((response) => response),
    setAction: (action) => axios.post('https://st-back1.herokuapp.com/action', { action }),
    delAction: (id) => axios.delete(`https://st-back1.herokuapp.com/action/${id}`),
    updateTime: (id, createdAt) => axios.put(`https://st-back1.herokuapp.com/action/update/${id}`, { createdAt })
};
