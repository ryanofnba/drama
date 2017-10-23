import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

class Show extends Component {
    constructor(props) {
        super(props);

        this.handlePress = this.handlePress.bind(this);
    }

    handlePress() {
        this.props.onPress(this.props.channelURL);
    }

    render() {
        const imageURL = this.props.imageURL.split("'")[1];

        return (
            <TouchableOpacity
                onPress={this.handlePress}
                style={styles.container}
            >
                <View>
                    <Image
                        style={{ width: 150, height: 150 }}
                        source={{ uri: imageURL }}
                    />
                    <Text>{this.props.title}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: '#F8F8F8'
  }
});

export default Show;
