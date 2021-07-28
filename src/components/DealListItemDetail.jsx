/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
    backLink: {
        marginBottom: 10,
        marginLeft: 10,
        color: '#22f',
    },
    image: {
        width: '100%',
        height: 150,
        backgroundColor: '#ccc',
    },
    detail: {
        marginHorizontal: 10,
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
        padding: 10,
        fontWeight: 'bold',
        backgroundColor: 'rgba(237, 149, 45, 0.4)',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 15,
    },
    cause: {
        flex: 2,
    },
    price: {
        flex: 1,
        textAlign: 'right',
    },
    avatar: {
        width: 60,
        height: 60,
    },
});

const DealListItemDetail = ({ initialDealData, onBack }) => {
    const [deal, setDeal] = useState(initialDealData);

    useEffect(async () => {
        const ac = new AbortController();

        await fetch('https://bakesaleforgood.com/api/deals/' + deal.key)
            .then((res) => res.json())
            .then(
                (result) => {
                    setDeal(result);
                },
                (error) => {
                    console.log(error);
                }
            );

        return () => ac.abort();
    }, []);

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onBack}>
                <Text style={styles.backLink}>Back</Text>
            </TouchableOpacity>
            <Image source={{ uri: deal.media[0] }} style={styles.image} />
            <View>
                <View style={styles.info}>
                    <Text style={styles.title}>{deal.title}</Text>
                    <View style={styles.footer}>
                        <Text style={styles.cause}>{deal.cause.name}</Text>
                        <Text style={styles.price}>${deal.price / 100}</Text>
                    </View>
                </View>
                <View style={styles.detail}>
                    <View>
                        <Image source={{ uri: deal.user?.avatar }} style={styles.avatar} />
                        <Text>{deal.user?.name}</Text>
                    </View>
                    <View>
                        <Text>{deal.description}</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

DealListItemDetail.propTypes = {
    initialDealData: PropTypes.object.isRequired,
    onBack: PropTypes.func.isRequired,
};

export default DealListItemDetail;
