const selectShow = id => {
    return {
        type: 'select_show',
        id
    };
};

const clearSelectedShow = () => {
    return {
        type: 'clear_selected_show',
    };
}

export {
    selectShow,
    clearSelectedShow
};
