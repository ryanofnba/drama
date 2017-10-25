import React, { Component } from 'react';
import { View, ActivityIndicator, FlatList, StyleSheet } from 'react-native';
import { List } from 'react-native-elements';
import { connect } from 'react-redux';
import * as actions from '../../actions/index';
import Channel from '../Channel/index';

class Channels extends Component {

    constructor(props) {
        super(props);

        this.state = ({
            loading: false
        });

        this.handleLoading = this.handleLoading.bind(this);
    }

    handleLoading(loading) {
        this.setState({
            loading
        });
    }

    renderChannel = ({ item }) => (
        <Channel
            key={item.title[0]}
            title={item.title[0]}
            bookmark={item.bookmark[0]}
            imageURL={item.description[0]}
            channelURL={item.enclosure[0].$.url}
            onLoading={this.handleLoading}
        />
    )

    renderList() {
        return (
            <List style={{ flex: 1 }}>
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
                <ActivityIndicator
                    style={{ position: 'absolute', top: 250, left: 180 }}
                    animating={this.state.loading}
                    color='#ffffff'
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
        channels: state.channels
    };
};

export default connect(mapStateToProps, actions)(Channels);
