import React, { Component } from 'react';
import { WebView, View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

class Video extends Component {
    render() {
        return (
            <View style={styles.container}>
                <WebView
                    style={styles.video}
                    source={{ uri: this.props.videoLink }}
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

const mapStateToProps = (state) => {
    return {
        videoLink: state.videoLink
    };
};

export default connect(mapStateToProps, null)(Video);
