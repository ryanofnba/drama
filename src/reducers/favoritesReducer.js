export default (state = [], action) => {
    switch (action.type) {
        case 'set_favorites':
            return action.payload;
        default:
            return state;
    }
};
