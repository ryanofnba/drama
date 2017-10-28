import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { parseString } from 'xml2js';
import { View, Text, Image, TouchableWithoutFeedback, LayoutAnimation, StyleSheet } from 'react-native';
import * as actions from '../../actions/index';
import Episode from '../Episode/index';
import Source from '../Source/index';

class Show extends Component {
    constructor(props) {
        super(props);

        this.state = {
            episodes: [],
            expanded: false,
            expandSources: false
        };

        this.handlePress = this.handlePress.bind(this);
        this.fetchEpisodes = this.fetchEpisodes.bind(this);
        this.handleFinishFetchingSources = this.handleFinishFetchingSources.bind(this);
    }

    componentWillUpdate() {
        if (this.state.expanded) {
            this.setState({
                expanded: false
            });
        }

        if (this.state.expandSources) {
            this.setState({
                expanded: true,
                expandSources: false
            });
        }

        LayoutAnimation.easeInEaseOut();
    }

    fetchEpisodes(url, reFetch) {
        axios.get(url)
            .then(response => {
                parseString(response.data, (error, result) => {
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

    handleFinishFetchingSources() {
        this.setState({
            expanded: true,
            expandSources: true
        });
    }

    handlePress() {
        if (!this.state.expanded) {
            this.props.onLoading(true);
            this.props.selectShow(this.props.channelURL);
            this.fetchEpisodes(this.props.channelURL, false);
        } else if (this.state.expanded) {
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
                            onFinishFetchingSources={this.handleFinishFetchingSources}
                        />
                    );
                })
            );
        }
    }

    renderSources() {
        if (this.state.expandSources) {
            return (
                this.props.sources.map(source => {
                    return (
                        <Source
                            key={source.title[0]}
                            title={source.title[0]}
                            bookmark={source.bookmark}
                            videoURL={source.enclosure[0].$}
                        />
                    );
                })
            );
        }
    }

    render() {
        const imageURL = this.props.imageURL ? this.props.imageURL.split("'")[1] : '';

        return (
            <View style={styles.container}>
                <TouchableWithoutFeedback
                    onPress={this.handlePress}
                >
                    <View style={styles.topContainer}>
                        <Image
                            style={{ width: 200, height: 200 }}
                            source={{ uri: imageURL }}
                        />
                        <View style={styles.titleContainer}>
                            <Text style={styles.titleText}>{this.props.title}</Text>
                            <Text style={styles.arrowText}>
                                {this.state.expanded ? 'hide' : 'expand'}
                            </Text>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
                <View style={styles.episodesContainer}>
                    {this.renderEpisodes()}
                </View>
                <View style={styles.sourcesContainer}>
                    {this.renderSources()}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    padding: 20,
    marginBottom: 10
  },
  topContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  episodesContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: 'white',
    paddingLeft: 200
  },
  sourcesContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: 'white'
  },
  titleContainer: {
      flex: 1,
      height: 200,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'white',
      borderTopLeftRadius: 50,
      borderTopRightRadius: 50,
  },
  titleText: {
      fontSize: 25
  },
  arrowText: {
      marginTop: 20,
      fontSize: 20,
      color: '#2286c3'
  }
});

const mapStateToProps = state => {
    return {
        selectedShow: state.selectedShow,
        sources: state.sources
    };
};

export default connect(mapStateToProps, actions)(Show);
