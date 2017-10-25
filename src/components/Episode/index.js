import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import axios from 'axios';
import { parseString } from 'xml2js';
import { Actions } from 'react-native-router-flux';
import * as actions from '../../actions/index';

class Episode extends Component {
    constructor(props) {
        super(props);

        this.state = {
            sources: []
        };

        this.handlePress = this.handlePress.bind(this);
    }

    handlePress() {
        this.fetchEpisodeSources(this.props.episodeLinkURL.url);
    }

    fetchEpisodeSources(url) {
        axios.get(url)
            .then(response => {
                parseString(response.data, (error, result) => {
                    this.props.setSources(result.rss.channel[0].item);
                    Actions.sources();
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

export default connect(null, actions)(Episode);
