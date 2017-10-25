import React, { Component } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { List } from 'react-native-elements';
import { connect } from 'react-redux';
import axios from 'axios';
import { parseString } from 'xml2js';
import * as actions from '../../actions/index';
import Channel from '../Channel/index';
import Show from '../Show/index';
import Episode from '../Episode/index';
import Source from '../Source/index';
import Video from '../Video/index';

class Main extends Component {

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
    }

    componentWillMount() {
        this.fetchChannel(this.rssLink);
    }

    fetchChannel(url) {
        axios.get(url)
            .then(response => {
                parseString(response.data, (error, result) => {
                    this.props.selectList('channels');
                    this.setState({
                        channels: result.rss.channel[0].item
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
                    this.props.selectList('shows');
                    this.setState({
                        shows: result.rss.channel[0].item
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
        this.fetchShows(url);
    }

    handleShowPress(url) {
        this.fetchEpisodes(url);
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
            imageURL={item.description ? item.description[0] : null}
            channelURL={item.enclosure[0].$.url}
            onPress={this.handleShowPress}
            episodes={this.state.episodes}
        />
    )

    renderSources = ({ item }) => (
        <Source
            key={item.title[0]}
            title={item.title[0]}
            bookmark={item.bookmark}
            videoURL={item.enclosure[0].$}
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
        switch (this.props.selectedList) {
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
            case 'sources':
                return (
                    <List>
                        <FlatList
                            data={this.props.sources}
                            keyExtractor={item => item.title}
                            renderItem={this.renderSources}
                            numColumns={1}
                        />
                    </List>
                );
            case 'video':
                return (
                    <Video
                        videoLink={this.props.videoLink}
                    />
                );
            default:
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

const mapStateToProps = (state) => {
    return {
        selectedList: state.selectedList,
        sources: state.sources,
        videoLink: state.videoLink
    };
};

export default connect(mapStateToProps, actions)(Main);
