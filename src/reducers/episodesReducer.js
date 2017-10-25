export default (state = null, action) => {
    console.log(action);
    switch (action.type) {
        case 'set_episodes':
            return action.payload;
        default:
            return state;
    }
};
