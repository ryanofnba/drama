import React, { Component } from 'react';
import { WebView, View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import VideoPlayer from 'react-native-video-player';

class Video extends Component {
    render() {
        return (
            <View style={styles.container}>
                <WebView
                    style={styles.video}
                    source={{ uri: 'http://videobug.se/v/040HiS7WUBCgyICyxXH0Jw?xml=1&title=Oh+My+Grad+-+Episode+22' }}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    video: {
        width: 400,
        height: 500
    }
});

export default Video;
