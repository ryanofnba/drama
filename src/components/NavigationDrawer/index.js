import React, { Component } from 'react';
import { StyleSheet, Text, View, ViewPropTypes } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Button from 'react-native-button';
import { CardSection } from './cardSection';

const styles = StyleSheet.create({
  viewContainer: {
    backgroundColor: '#fff'
  },
  container: {
    padding: 15,
    height: 45,
    overflow: 'hidden',
    alignSelf: 'flex-start',
  },
  textStyle: {
    fontSize: 18,
    color: '#555',
  }
});

class SideMenu extends Component {
  render() {
    return (
      <View style={[styles.viewContainer, this.props.sceneStyle]}>
        <CardSection style={{ flexDirection: 'column' }}>
          <Button
            containerStyle={styles.container}
            style={styles.textStyle}
            onPress={() => {
                Actions.channels()
            }}
          >Home Page</Button>
        </CardSection>
        <CardSection style={{ flexDirection: 'column', borderBottomWidth: 0, }}>
          <Button
            containerStyle={styles.container}
            style={styles.textStyle}
            onPress={() => Actions.favorites()}
          >Favorites</Button>
        </CardSection>
      </View>
    );
  }
}

export default SideMenu;
