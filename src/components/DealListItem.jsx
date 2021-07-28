import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 12,
        marginTop: 12,
    },
    image: {
        width: '100%',
        height: 150,
        backgroundColor: '#ccc',
    },
    info: {
        padding: 10,
        backgroundColor: '#fff',
        borderColor: '#bbb',
        borderWidth: 1,
        borderTopWidth: 0,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    footer: {
        flexDirection: 'row',
    },
    cause: {
        flex: 2,
    },
    price: {
        flex: 1,
        textAlign: 'right',
    },
});

const DealListItem = ({ deal, onPress }) => {
    const handlePress = () => {
        onPress(deal.key);
    };

    return (
        <TouchableOpacity style={styles.container} onPress={handlePress}>
            <Image source={{ uri: deal.media[0] }} style={styles.image} />
            <View style={styles.info}>
                <Text style={styles.title}>{deal.title}</Text>
                <View style={styles.footer}>
                    <Text style={styles.cause}>{deal.cause.name}</Text>
                    <Text style={styles.price}>${deal.price / 100}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

DealListItem.propTypes = {
    deal: PropTypes.object.isRequired,
    onPress: PropTypes.func.isRequired,
};

export default DealListItem;
