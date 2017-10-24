import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Video from 'react-native-video';

class Channel extends Component {
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
            >
                <View
                    style={styles.container}
                >
                    <Image
                        style={{ width: 150, height: 150 }}
                        source={{ uri: imageURL }}
                    />
                    <View style={styles.titleContainer}>
                        <Text
                            style={styles.titleText}
                        >
                            {this.props.title}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#F8F8F8',
    borderBottomWidth: 1
  },
  titleContainer: {
      flex: 1,
      height: 150,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'pink'
  },
  titleText: {
      fontSize: 25
  }
});

export default Channel;
