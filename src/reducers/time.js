export default function time(state = {}, action) {
    if (action.type === 'FETCH_ALL_DATA_SUCCESS') {
        const data = action.payload;

        return {
            ...state,
            data
        }
    }

    if (action.type === 'FETCH_DEL_ACTION_SUCCESS') {
        const index = action.payload;
        const dataArr = state.data && state.data.slice();

        dataArr.splice(index, 1);

        return {
            data: dataArr
        };
    }

    return state;
}
