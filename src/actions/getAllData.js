import { postsApi } from '../helpers/api';

export const getAllData = () => (dispatch) => {
    postsApi.getAllData().then(({ data }) => {
        dispatch({
            type: 'FETCH_ALL_DATA_SUCCESS',
            payload: data
        });
    });
};

export const setAction = (action) => (dispatch) => {
    postsApi.setAction(action).then(() => {
        dispatch({
            type: 'FETCH_SET_ACTION_SUCCESS'
        });
    }).then(() => {
        dispatch(getAllData());
    })
};

export const delAction = (id, index) => (dispatch) => {
    postsApi.delAction(id).then(() => {
        dispatch({
            type: 'FETCH_DEL_ACTION_SUCCESS',
            payload: index
        });
    })
};