export default (state = null, action) => {
    switch (action.type) {
        case 'set_video_link':
            return action.payload;
        default:
            return state;
    }
};
