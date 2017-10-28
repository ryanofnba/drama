import React from 'react';
import { Scene, Router, ActionConst } from 'react-native-router-flux';
import Main from './components/main/index';
import Video from './components/Video/index';
import Shows from './components/Shows/index';
import Channels from './components/Channels/index';
import Sources from './components/Sources/index';
import NavigationDrawerComponent from './components/NavigationDrawer/index';

const RouterComponent = () => {
    return (
        <Router>
            <Scene key="root">
                <Scene
                    key='drawer'
                    drawer
                    contentComponent={NavigationDrawerComponent}
                >
                    <Scene
                        key="channels"
                        component={Main}
                        title='Channels'
                        initial
                    />
                    <Scene
                        key="subchannels"
                        component={Channels}
                        title='More Channels'
                        back
                    />
                    <Scene
                        key="shows"
                        component={Shows}
                        title='Shows'
                        back
                    />
                    <Scene
                        key="sources"
                        component={Sources}
                        title='Sources'
                        back
                    />
                    <Scene
                        key='video'
                        component={Video}
                        title='Player'
                        back
                    />
                </Scene>
            </Scene>
        </Router>
    );
};

export default RouterComponent;
