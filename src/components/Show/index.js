import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { parseString } from 'xml2js';
import nodeEmoji from 'node-emoji';
import { AsyncStorage, View, Text, Image, TouchableWithoutFeedback, LayoutAnimation, StyleSheet } from 'react-native';
import * as actions from '../../actions/index';
import Episode from '../Episode/index';
import Source from '../Source/index';

class Show extends Component {
    constructor(props) {
        super(props);

        this.state = {
            episodes: [],
            expanded: false,
            expandSources: false,
            isFavorite: false
        };

        this.handlePress = this.handlePress.bind(this);
        this.fetchEpisodes = this.fetchEpisodes.bind(this);
        this.handleFinishFetchingSources = this.handleFinishFetchingSources.bind(this);
        this.handleFavorite = this.handleFavorite.bind(this);
    }

    componentWillMount() {
        AsyncStorage.getItem('favorites')
            .then(req => this.finishLoading(JSON.parse(req)));
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

    finishLoading(shows) {
        shows.map(show => {
            if (show.channelURL === this.props.channelURL) {
                this.setState({
                    isFavorite: true
                });
            }
        })
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

    handleFavorite() {
        debugger;
        if (!this.state.isFavorite) {
            const favorite = {
                key: this.props.title[0],
                title: this.props.title[0],
                bookmark: this.props.bookmark[0],
                imageURL: this.props.imageURL,
                channelURL: this.props.channelURL,
                episodes: this.props.episodes
            };
            let favorites = [];

            favorites = favorites.concat(this.props.favorites);

            favorites.push(favorite);

            AsyncStorage.setItem('favorites', JSON.stringify(favorites))
                .then(() => {
                    this.props.setFavorites(favorites);
                    this.setState({
                        isFavorite: true
                    });
                });
        } else {
            const favorites = this.props.favorites;

            favorites.splice(this.props.favorites.indexOf(this.props.channelURL), 1);

            this.props.setFavorites(favorites);
            this.setState({
                isFavorite: false
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
                        <TouchableWithoutFeedback
                            onPress={this.handleFavorite}
                        >
                            <View style={styles.emojiContainer}>
                                <Text>{this.state.isFavorite
                                    ? nodeEmoji.get('hearts')
                                    : nodeEmoji.get('yellow_heart')}</Text>
                            </View>
                        </TouchableWithoutFeedback>
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
      backgroundColor: 'white'
  },
  emojiContainer: {
      width: 100,
      height: 200,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'white',
      borderTopRightRadius: 50
  },
  titleText: {
      fontSize: 25
  },
  arrowText: {
      fontSize: 20
  }
});

const mapStateToProps = state => {
    return {
        selectedShow: state.selectedShow,
        sources: state.sources,
        favorites: state.favorites
    };
};

export default connect(mapStateToProps, actions)(Show);
