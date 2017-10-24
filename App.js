import React, { Component } from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './src/reducers/index';
import ChannelList from './src/components/ChannelList/index';
import Video from './src/components/Video/index';

export default class App extends Component<{}> {
  render() {
    return (
        <Provider store={createStore(reducers)}>
            <View style={styles.container}>
                <Video />
            </View>
        </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
