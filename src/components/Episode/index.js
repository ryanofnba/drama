import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';

class Episode extends Component {
    constructor(props) {
        super(props);

        this.handlePress = this.handlePress.bind(this);
    }

    handlePress() {
        debugger;
        this.props.onPress(this.props.channelURL);
    }

    render() {
        return (
            <TouchableOpacity
                onPress={this.handlePress}
                style={styles.container}
            >
                <View style={styles.container}>
                    <Text>{this.props.title[0].split(' ')[1]}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6ab7ff'
  }
});

export default Episode;
