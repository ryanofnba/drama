import React, { Component } from 'react';
import { AsyncStorage, View, ActivityIndicator, FlatList, StyleSheet } from 'react-native';
import { List } from 'react-native-elements';
import { connect } from 'react-redux';
import * as actions from '../../actions/index';
import axios from 'axios';
import { parseString } from 'xml2js';
import Show from '../Show/index';

class Favorites extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            favorites: []
        };

        this.handleLoading = this.handleLoading.bind(this);
    }

    componentWillMount() {
        AsyncStorage.getItem('favorites')
            .then(req => this.finishLoading(JSON.parse(req)));
    }

    finishLoading(shows) {
        this.setState({
            favorites: shows
        });
    }

    handleLoading(loading) {
        this.setState({
            loading
        });
    }

    renderShow = ({ item }) => (
        <Show
            key={item.title}
            title={item.title}
            bookmark={item.bookmark}
            imageURL={item.imageURL}
            channelURL={item.channelURL}
            episodes={this.props.episodes}
            onLoading={this.handleLoading}
        />
    )

    render() {
        return (
            <View style={styles.container}>
                <List style={{ flex: 1 }}>
                    <FlatList
                        data={this.state.favorites}
                        keyExtractor={item => item.title}
                        renderItem={this.renderShow}
                        numColumns={1}
                    />
                </List>
                <ActivityIndicator
                    style={{ position: 'absolute', top: 400, left: 400 }}
                    animating={this.state.loading}
                    color='#4f4f4f'
                    size='large'
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e3f2fd'
    }
});

const mapStateToProps = (state) => {
    return {
        shows: state.favorites,
        episodes: state.episodes
    };
};

export default connect(mapStateToProps, actions)(Favorites);
