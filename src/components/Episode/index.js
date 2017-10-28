import React, { Component } from 'react';
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import axios from 'axios';
import { parseString } from 'xml2js';
import { Actions } from 'react-native-router-flux';
import * as actions from '../../actions/index';

class Episode extends Component {
    constructor(props) {
        super(props);

        this.handlePress = this.handlePress.bind(this);
    }

    handlePress() {
        if (this.props.episodeLinkURL.url.includes('page=')) {
            this.props.onFetchEpisodes(this.props.episodeLinkURL.url, true);
        } else {
            this.fetchEpisodeSources(this.props.episodeLinkURL.url);
        }
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
        const title = this.props.title[0].split(' ');
        return (
            <TouchableHighlight
                onPress={this.handlePress}
                style={styles.container}
            >
                <Text style={styles.titleText}>{title[title.length - 1]}</Text>
            </TouchableHighlight>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#c7c7c7',
    borderWidth: 1,
    borderRadius: 10,
    margin: 5
},
    titleText: {
        fontWeight: 'bold'
    }
});

export default connect(null, actions)(Episode);
