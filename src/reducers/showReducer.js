export default (state = null, action) => {
    console.log(action);
    switch (action.type) {
        case 'select_show':
            return action.id;
        case 'clear_selected_show':
            return null;
        default:
            return state;
    }
};
