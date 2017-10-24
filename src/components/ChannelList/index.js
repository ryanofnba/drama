import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import axios from 'axios';
import { parseString } from 'xml2js';

import Header from '../header/index';
import Channel from '../Channel/index';
import Show from '../Show/index';
import Episode from '../Episode/index';

class ChannelList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            channels: null,
            shows: null,
            episodes: null,
            currentList: null,
            loading: false,
            refreshing: false
        };

        this.rssLink = 'https://irss.se/dramas';
        this.handleChannelPress = this.handleChannelPress.bind(this);
        this.handleShowPress = this.handleShowPress.bind(this);
        this.handleEpisodePress = this.handleEpisodePress.bind(this);
    }

    componentWillMount() {
        this.fetchChannel(this.rssLink);
    }

    fetchChannel(url) {
        axios.get(url)
            .then(response => {
                parseString(response.data, (error, result) => {
                    console.log(result.rss.channel[0].item);
                    this.setState({
                        channels: result.rss.channel[0].item,
                        currentList: 'channels'
                    });
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    fetchShows(url) {
        axios.get(url)
            .then(response => {
                parseString(response.data, (error, result) => {
                    console.log(result.rss.channel[0].item);
                    this.setState({
                        shows: result.rss.channel[0].item,
                        currentList: 'shows'
                    });
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    fetchEpisodes(url) {
        axios.get(url)
            .then(response => {
                parseString(response.data, (error, result) => {
                    console.log(result.rss.channel[0].item);
                    this.setState({
                        episodes: result.rss.channel[0].item
                    });
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    imageURLParser(imageURL) {
        return imageURL.split("'")[1];
    }

    handleChannelPress(url) {
        console.log(url);
        this.fetchShows(url);
    }

    handleShowPress(url) {
        console.log(url);
        this.fetchEpisodes(url);
    }

    handleEpisodePress(url) {
        console.log(url);
    }

    renderChannel = ({ item }) => (
        <Channel
            key={item.title[0]}
            title={item.title[0]}
            bookmark={item.bookmark[0]}
            imageURL={item.description[0]}
            channelURL={item.enclosure[0].$.url}
            onPress={this.handleChannelPress}
        />
    )

    renderShow = ({ item }) => (
        <Show
            key={item.title}
            title={item.title}
            bookmark={item.bookmark}
            imageURL={item.description[0]}
            channelURL={item.enclosure[0].$.url}
            onPress={this.handleShowPress}
            episodes={this.state.episodes}
        />
    )

    renderEpisode = ({ item }) => (
        <Episode
            key={item.title}
            title={item.title}
            bookmark={item.bookmark}
            imageURL={item.description[0]}
            channelURL={item.enclosure.url}
            onPress={this.handleEpisodePress}
        />
    )

    renderList() {
        switch (this.state.currentList) {
            case 'channels':
                return (
                    <List>
                        <FlatList
                            data={this.state.channels}
                            keyExtractor={item => item.title[0]}
                            renderItem={this.renderChannel}
                            numColumns={1}
                        />
                    </List>
                );
            case 'shows':
                return (
                    <List>
                        <FlatList
                            data={this.state.shows}
                            keyExtractor={item => item.title}
                            renderItem={this.renderShow}
                            numColumns={1}
                        />
                    </List>
                );
            case 'episodes':
                return (
                    <List>
                        <FlatList
                            data={this.state.episodes}
                            keyExtractor={item => item.title}
                            renderItem={this.renderEpisode}
                            numColumns={2}
                        />
                    </List>
                );
        }
    }

    render() {
        return (
            <View style={styles.container}>
                { this.renderList() }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e0e0e0'
    }
});

export default ChannelList;
