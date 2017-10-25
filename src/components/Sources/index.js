import React, { Component } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { List } from 'react-native-elements';
import { connect } from 'react-redux';
import * as actions from '../../actions/index';
import Source from '../Source/index';

class Sources extends Component {

    renderSources = ({ item }) => (
        <Source
            key={item.title[0]}
            title={item.title[0]}
            bookmark={item.bookmark}
            videoURL={item.enclosure[0].$}
        />
    )

    render() {
        return (
            <View style={styles.container}>
                <List>
                    <FlatList
                        data={this.props.sources}
                        keyExtractor={item => item.title}
                        renderItem={this.renderSources}
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
        sources: state.sources
    };
};

export default connect(mapStateToProps, actions)(Sources);
