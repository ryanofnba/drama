import React, { Component } from 'react';
import { View, ActivityIndicator, FlatList, StyleSheet } from 'react-native';
import { List } from 'react-native-elements';
import { connect } from 'react-redux';
import * as actions from '../../actions/index';
import Show from '../Show/index';

class Shows extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false
        };

        this.handleLoading = this.handleLoading.bind(this);
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
            imageURL={item.description ? item.description[0] : null}
            channelURL={item.enclosure[0].$.url}
            episodes={this.props.episodes}
            onLoading={this.handleLoading}
        />
    )

    render() {
        return (
            <View style={styles.container}>
                <List style={{ flex: 1 }}>
                    <FlatList
                        data={this.props.shows}
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
