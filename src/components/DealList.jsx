import React from 'react';
import { View, StyleSheet, FlatList, Platform } from 'react-native';
import PropTypes from 'prop-types';

import DealListItem from './DealListItem';

const styles = StyleSheet.create({
    list: {
        backgroundColor: '#eee',
        width: '100%',
    },
});

const DealList = ({ deals, onItemPress }) => {
    const contentPaddingBottom = () => {
        if (Platform.OS === 'android' && deals.length >= 3) {
            return {
                paddingBottom: 100,
            };
        } else if (Platform.OS === 'ios' && deals.length >= 4) {
            return {
                paddingBottom: 120,
            };
        } else {
            return null;
        }
    };

    return (
        <View style={styles.list}>
            <FlatList
                data={deals}
                renderItem={({ item }) => (
                    <DealListItem deal={item} onPress={onItemPress} />
                )}
                contentContainerStyle={contentPaddingBottom}
            />
        </View>
    );
};

DealList.propTypes = {
    deals: PropTypes.array.isRequired,
    onItemPress: PropTypes.func.isRequired,
};

export default DealList;
