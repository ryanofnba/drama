import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import Main from './components/main/index';
import Video from './components/Video/index';

const RouterComponent = () => {
    return (
        <Router>
            <Scene key="root">
                <Scene
                    key="main"
                    component={Main}
                    title='Home'
                    initial
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

export default RouterComponent;
