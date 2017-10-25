import React from 'react';
import { connect } from 'react-redux';
import { Scene, Router } from 'react-native-router-flux';
import Main from './components/main/index';
import Video from './components/Video/index';
import Shows from './components/Shows/index';
import Sources from './components/Sources/index';
import * as actions from './actions/index';

const RouterComponent = () => {
    return (
        <Router>
            <Scene key="root">
                <Scene
                    key="channels"
                    component={Main}
                    title='Channels'
                    initial
                />
                <Scene
                    key="shows"
                    component={Shows}
                    title='Shows'
                    leftTitle='back'
                />
                <Scene
                    key="sources"
                    component={Sources}
                    title='Sources'
                    leftTitle='back'
                />
                <Scene
                    key='video'
                    component={Video}
                    title='Player'
                />
            </Scene>
        </Router>
    )
};

const mapStateToProps = (state) => {
    return {
        homeChannels: state.homeChannels
    };
};

export default connect(mapStateToProps, actions)(RouterComponent);
