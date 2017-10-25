export default (state = null, action) => {
    console.log(action);
    switch (action.type) {
        case 'set_sources':
            return action.payload;
        default:
            return state;
    }
};
