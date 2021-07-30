/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Animated,
    Easing,
    Dimensions,
    Platform,
} from 'react-native';

import DealList from './DealList';
import DealListItemDetail from './DealListItemDetail';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    main: {
        marginTop: Platform.OS === 'ios' ? 50 : 10,
    },
    header: {
        fontSize: 40,
    },
    input: {
        height: 40,
        marginHorizontal: 12,
    },
});

const App = () => {
    const [deals, setDeals] = useState([]);
    const [dealsFromSearch, setDealsFromSearch] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentDealId, setCurrentDealId] = useState(null);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    const dealsToDisplay = dealsFromSearch.length > 0 ? dealsFromSearch : deals;

    const titleXPosition = new Animated.Value(0);
    const animateTitle = (direction = 1) => {
        const width = Dimensions.get('window').width - 150;

        Animated.timing(titleXPosition, {
            toValue: (direction * width) / 2,
            useNativeDriver: false,
            duration: 1000,
            easing: Easing.ease,
        }).start(({ finished }) => {
            if (finished) {
                animateTitle(-1 * direction);
            }
        });
    };

    const setCurrentDeal = (dealId) => {
        setCurrentDealId(dealId);
    };

    const unsetCurrentDeal = () => {
        setCurrentDealId(null);
    };

    const currentDeal = () => {
        return dealsToDisplay.find((deal) => deal.key === currentDealId);
    };

    useEffect(async () => {
        const ac = new AbortController();

        animateTitle();

        await fetch('https://bakesaleforgood.com/api/deals')
            .then((res) => res.json())
            .then(
                (result) => {
                    setDeals(result);
                    setIsLoaded(true);
                },
                (error) => {
                    setError(error);
                    setIsLoaded(true);
                }
            );

        await fetch(
            'https://bakesaleforgood.com/api/deals?searchTerm=' + searchTerm
        )
            .then((res) => res.json())
            .then(
                (result) => {
                    setDealsFromSearch(result);
                },
                (error) => {
                    setError(error);
                }
            );

        return () => ac.abort();
    }, [searchTerm]);

    if (error) {
        return (
            <View style={styles.container}>
                <Text style={styles.header}>Error: {error.message}</Text>
            </View>
        );
    } else if (!isLoaded) {
        return (
            <Animated.View style={[{ left: titleXPosition }, styles.container]}>
                <Text style={styles.header}>Bakesale</Text>
            </Animated.View>
        );
    }

    if (currentDealId) {
        return (
            <View style={styles.main}>
                <DealListItemDetail
                    initialDealData={currentDeal()}
                    onBack={unsetCurrentDeal}
                />
            </View>
        );
    }

    if (dealsToDisplay.length > 0) {
        return (
            <View style={styles.main}>
                <TextInput
                    placeholder='Search All Deals!'
                    onChangeText={(search) => setSearchTerm(search)}
                    style={styles.input}
                />
                <DealList deals={dealsToDisplay} onItemPress={setCurrentDeal} />
            </View>
        );
    }
};

export default App;
