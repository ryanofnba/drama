import React, { Component } from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './src/reducers/index';
import Router from './src/Router';

export default class App extends Component<{}> {
  render() {
    return (
        <Provider store={createStore(reducers)}>
            <Router />
        </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
