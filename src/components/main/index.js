import React, { Component } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { List } from 'react-native-elements';
import { connect } from 'react-redux';
import axios from 'axios';
import { parseString } from 'xml2js';
import * as actions from '../../actions/index';
import Channel from '../Channel/index';

class Main extends Component {

    constructor(props) {
        super(props);

        this.rssLink = 'https://irss.se/dramas';
    }

    componentWillMount() {
        if (!this.props.channels) {
            this.fetchChannel(this.rssLink, true);
        }
    }

    fetchChannel(url, isFirstFetch) {
        axios.get(url)
            .then(response => {
                parseString(response.data, (error, result) => {
                    if (isFirstFetch) {
                        this.props.setHomeChannels(result.rss.channel[0].item);
                    }

                    this.props.setChannels(result.rss.channel[0].item);
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    renderChannel = ({ item }) => (
        <Channel
            key={item.title[0]}
            title={item.title[0]}
            bookmark={item.bookmark[0]}
            imageURL={item.description[0]}
            channelURL={item.enclosure[0].$.url}
        />
    )

    renderList() {
        return (
            <List>
                <FlatList
                    data={this.props.channels}
                    keyExtractor={item => item.title[0]}
                    renderItem={this.renderChannel}
                    numColumns={1}
                />
            </List>
        );
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
        videoLink: state.videoLink,
        channels: state.channels
    };
};

export default connect(mapStateToProps, actions)(Main);
