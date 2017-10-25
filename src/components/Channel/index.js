import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import { parseString } from 'xml2js';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import * as actions from '../../actions/index';

class Channel extends Component {
    constructor(props) {
        super(props);
        debugger;
        this.handlePress = this.handlePress.bind(this);
    }

    fetchShows(url) {
        axios.get(url)
            .then(response => {
                parseString(response.data, (error, result) => {
                    const firstItem = result.rss.channel[0].item[0].enclosure[0].$.url;
                    const isShow = firstItem.includes('film');
                    if (isShow) {
                        this.props.setShows(result.rss.channel[0].item);
                        Actions.shows();
                    } else {
                        this.props.setChannels(result.rss.channel[0].item);
                        Actions.channels();
                    }
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    handlePress() {
        this.fetchShows(this.props.channelURL);
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
    backgroundColor: '#1e88e5',
    borderBottomWidth: 1
  },
  titleContainer: {
      flex: 1,
      height: 150,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#1e88e5'
  },
  titleText: {
      fontSize: 25
  }
});

export default connect(null, actions)(Channel);
