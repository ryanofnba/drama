export default (state = null, action) => {
    switch (action.type) {
        case 'select_list':
            return action.id;
        default:
            return state;
    }
};
