import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import axios from 'axios';
import { parseString } from 'xml2js';
import { Actions } from 'react-native-router-flux';

import * as actions from '../../actions/index';

class Source extends Component {
    constructor(props) {
        super(props);

        this.handlePress = this.handlePress.bind(this);
    }

    handlePress() {
        if (this.props.videoURL.type === 'application/rss+xml') {
            this.fetchVideoLink(this.props.videoURL.url);
        } else {
            this.props.setVideoLink(this.props.videoURL.url);
            Actions.video();
        }
    }

    fetchVideoLink(url) {
        axios.get(url)
            .then(response => {
                parseString(response.data, (error, result) => {
                    this.props.setVideoLink(result.rss.channel[0].item[0].enclosure[0].$.url);
                    Actions.video();
                    // this.props.selectList('video');
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        return (
            <TouchableOpacity
                onPress={this.handlePress}
                style={styles.container}
            >
                <View>
                    <Text>{this.props.title}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6ab7ff',
    borderBottomWidth: 1
  }
});

export default connect(null, actions)(Source);
