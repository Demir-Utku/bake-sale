import React from 'react';
import { View, StyleSheet, FlatList, Platform } from 'react-native';
import PropTypes from 'prop-types';

import DealListItem from './DealListItem';

const styles = StyleSheet.create({
    list: {
        backgroundColor: '#eee',
        width: '100%',
    },
    content: {
        paddingBottom: Platform.OS === 'android' ? 100 : 120,
    },
});

const DealList = ({ deals, onItemPress }) => {
    return (
        <View style={styles.list}>
            <FlatList
                data={deals}
                renderItem={({ item }) => (
                    <DealListItem deal={item} onPress={onItemPress} />
                )}
                contentContainerStyle={styles.content}
            />
        </View>
    );
};

DealList.propTypes = {
    deals: PropTypes.array.isRequired,
    onItemPress: PropTypes.func.isRequired,
};

export default DealList;
