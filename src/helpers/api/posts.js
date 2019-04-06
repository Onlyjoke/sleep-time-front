import axios from 'axios';

export default {
    getAllData: () => axios.get('https://st-back1.herokuapp.com/actions')
        .then((response) => response),
    setAction: (action) => axios.post('https://st-back1.herokuapp.com/actions', { action }),
    delAction: (id) => axios.delete(`https://st-back1.herokuapp.com/action/${id}`)
};
