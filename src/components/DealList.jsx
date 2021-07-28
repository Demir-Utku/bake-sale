import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import PropTypes from 'prop-types';

import DealListItem from './DealListItem';

const styles = StyleSheet.create({
    list: {
        backgroundColor: '#eee',
        width: '100%',
    },
});

const DealList = ({ deals, onItemPress }) => {
    return (
        <View style={styles.list}>
            <FlatList data={deals} renderItem={({ item }) => <DealListItem deal={item} onPress={onItemPress} />} />
        </View>
    );
};

DealList.propTypes = {
    deals: PropTypes.array.isRequired,
    onItemPress: PropTypes.func.isRequired,
};

export default DealList;
