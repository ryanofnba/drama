export default (state = null, action) => {
    console.log(action);
    switch (action.type) {
        case 'set_shows':
            return action.payload;
        default:
            return state;
    }
};
