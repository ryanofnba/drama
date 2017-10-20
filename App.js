/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import ShowList from "./src/components/ShowList/index";

export default class App extends Component<{}> {
  render() {
    return (
      <View style={styles.container}>
        <ShowList />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8'
  }
});
