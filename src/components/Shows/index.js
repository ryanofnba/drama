import React, { Component } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { List } from 'react-native-elements';
import { connect } from 'react-redux';
import axios from 'axios';
import { parseString } from 'xml2js';
import * as actions from '../../actions/index';
import Show from '../Show/index';

class Shows extends Component {

    constructor(props) {
        super(props);

        this.handleShowPress = this.handleShowPress.bind(this);
    }

    fetchEpisodes(url) {
        axios.get(url)
            .then(response => {
                parseString(response.data, (error, result) => {
                    this.props.setEpisodes(result.rss.channel[0].item);
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    handleShowPress(url) {
        this.fetchEpisodes(url);
    }

    renderShow = ({ item }) => (
        <Show
            key={item.title}
            title={item.title}
            bookmark={item.bookmark}
            imageURL={item.description ? item.description[0] : null}
            channelURL={item.enclosure[0].$.url}
            onPress={this.handleShowPress}
            episodes={this.props.episodes}
        />
    )

    render() {
        return (
            <View style={styles.container}>
                <List>
                    <FlatList
                        data={this.props.shows}
                        keyExtractor={item => item.title}
                        renderItem={this.renderShow}
                        numColumns={1}
                    />
                </List>
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
        shows: state.shows,
        episodes: state.episodes
    };
};

export default connect(mapStateToProps, actions)(Shows);
