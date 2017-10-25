import React, { Component } from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './src/reducers/index';
import Router from './src/Router';

export const store = createStore(reducers);

export default class App extends Component<{}> {
  render() {
    return (
        <Provider store={store}>
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
