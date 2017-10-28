import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { parseString } from 'xml2js';
import { View, Text, Image, TouchableHighlight, LayoutAnimation, StyleSheet } from 'react-native';
import * as actions from '../../actions/index';
import Episode from '../Episode/index';

class Show extends Component {
    constructor(props) {
        super(props);

        this.state = {
            episodes: [],
            expanded: false
        };

        this.handlePress = this.handlePress.bind(this);
        this.fetchEpisodes = this.fetchEpisodes.bind(this);
    }

    componentWillUpdate() {
        if (this.state.expanded) {
            this.setState({
                expanded: false
            });
        }

        LayoutAnimation.easeInEaseOut();
    }

    fetchEpisodes(url, reFetch) {
        axios.get(url)
            .then(response => {
                parseString(response.data, (error, result) => {
                    debugger;
                    this.props.onLoading(false);
                    this.setState({
                        expanded: true,
                        episodes: reFetch
                            ? this.state.episodes.concat(result.rss.channel[0].item)
                            : result.rss.channel[0].item
                    });
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    handlePress() {
        if (!this.state.expanded) {
            this.props.onLoading(true);
            this.props.selectShow(this.props.channelURL);
            this.fetchEpisodes(this.props.channelURL, false);
        } else {
            this.setState({
                expanded: false
            });
        }
    }

    renderEpisodes() {
        if (this.props.channelURL === this.props.selectedShow && this.state.expanded) {
            return (
                this.state.episodes.map(episode => {
                    return (
                        <Episode
                            key={episode.title}
                            title={episode.title}
                            bookmark={episode.bookmark}
                            imageURL={episode.description[0]}
                            episodeLinkURL={episode.enclosure[0].$}
                            onFetchEpisodes={this.fetchEpisodes}
                        />
                    );
                })
            );
        }
    }

    render() {
        const imageURL = this.props.imageURL ? this.props.imageURL.split("'")[1] : '';

        return (
            <TouchableHighlight
                onPress={this.handlePress}
                style={styles.container}
            >
                <View style={styles.container}>
                    <View style={styles.topContainer}>
                        <Image
                            style={{ width: 200, height: 200 }}
                            source={{ uri: imageURL }}
                        />
                        <View style={styles.titleContainer}>
                            <Text style={styles.titleText}>{this.props.title}</Text>
                        </View>
                    </View>
                    <View style={styles.episodesContainer}>
                        {this.renderEpisodes()}
                    </View>
                </View>
            </TouchableHighlight>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#F8F8F8',
    borderBottomWidth: 1
  },
  topContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#F8F8F8',
    borderBottomWidth: 1
  },
  episodesContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: 'white',
    borderBottomWidth: 1,
    paddingLeft: 200
  },
  titleContainer: {
      flex: 1,
      height: 200,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'white'
  },
  titleText: {
      fontSize: 25
  }
});

const mapStateToProps = state => {
    return {
        selectedShow: state.selectedShow
    };
};

export default connect(mapStateToProps, actions)(Show);
