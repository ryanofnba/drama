import React, { Component } from 'react';
import { WebView, View, StyleSheet } from 'react-native';
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
        flex: 1
    },
    video: {
        flex: 1
    }
});

const mapStateToProps = (state) => {
    return {
        videoLink: state.videoLink
    };
};

export default connect(mapStateToProps, null)(Video);
