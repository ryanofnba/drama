export default (state = null, action) => {
    console.log(action);
    switch (action.type) {
        case 'set_channels':
            return action.payload;
        case 'set_home_channels':
            return action.payload;
        default:
            return state;
    }
};
