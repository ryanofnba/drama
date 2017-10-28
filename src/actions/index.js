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
};

const selectList = id => {
    return {
        type: 'select_list',
        id
    };
};

const setSources = sourceList => {
    return {
        type: 'set_sources',
        payload: sourceList
    };
};

const setVideoLink = videoLink => {
    return {
        type: 'set_video_link',
        payload: videoLink
    };
};

const setShows = shows => {
    return {
        type: 'set_shows',
        payload: shows
    };
};

const setEpisodes = episodes => {
    return {
        type: 'set_episodes',
        payload: episodes
    };
};

const setChannels = channels => {
    return {
        type: 'set_channels',
        payload: channels
    };
};

const setHomeChannels = channels => {
    return {
        type: 'set_home_channels',
        payload: channels
    };
};

const setFavorites = shows => {
    return {
        type: 'set_favorites',
        payload: shows
    };
};

export {
    selectShow,
    clearSelectedShow,
    selectList,
    setSources,
    setVideoLink,
    setShows,
    setChannels,
    setHomeChannels,
    setFavorites
};
