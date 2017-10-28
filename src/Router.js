import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import Main from './components/main/index';
import Video from './components/Video/index';
import Shows from './components/Shows/index';
import Favorites from './components/Favorites/index';
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
                        key="favorites"
                        component={Favorites}
                        title='Favorite Shows'
                    />
                    <Scene
                        key="subchannels"
                        component={Channels}
                        title='More Channels'
                    />
                    <Scene
                        key="shows"
                        component={Shows}
                        title='Shows'
                    />
                    <Scene
                        key="sources"
                        component={Sources}
                        title='Sources'
                    />
                    <Scene
                        key='video'
                        component={Video}
                        title='Player'
                    />
                </Scene>
            </Scene>
        </Router>
    );
};

export default RouterComponent;
