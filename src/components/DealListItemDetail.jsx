/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    PanResponder,
    Animated,
    Dimensions,
} from 'react-native';
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
    const [imageIndex, setImageIndex] = useState(0);

    const width = Dimensions.get('window').width;

    const imageXPosition = new Animated.Value(0);

    const handleSwipe = (indexDirection) => {
        // 1. update the state and change the image index
        /* 2. animate the same view that is holding image that 
        we swipe completely to the left and animate to the right */

        // Swipe left case
        if (!deal.media[imageIndex + indexDirection]) {
            Animated.spring(imageXPosition, {
                toValue: 0,
                useNativeDriver: false,
            }).start();
        }
        setImageIndex((imageIndex) => imageIndex + indexDirection);
    };

    let indexDirection = 1;

    const imagePanResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (evt, gs) => {
            imageXPosition.setValue(gs.dx);
        },
        onPanResponderRelease: (evt, gs) => {
            if (Math.abs(gs.dx) > width * 0.4) {
                const direction = Math.sign(gs.dx);
                indexDirection = -1 * direction;

                // -1 for left, 1 for right
                Animated.timing(imageXPosition, {
                    delay: 0,
                    toValue: direction * width,
                    duration: 150,
                    useNativeDriver: false,
                }).start(() => handleSwipe(-1 * direction));
            } else {
                Animated.spring(imageXPosition, {
                    toValue: 0,
                    useNativeDriver: false,
                }).start();
            }
        },
    });

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

    useEffect(() => {
        imageXPosition.setValue(indexDirection * width);
        Animated.spring(imageXPosition, {
            toValue: 0,
            useNativeDriver: false,
        }).start();
    }, [imageIndex]);

    return (
        <View>
            <TouchableOpacity onPress={onBack}>
                <Text style={styles.backLink}>Back</Text>
            </TouchableOpacity>
            <Animated.Image
                {...imagePanResponder.panHandlers}
                source={{ uri: deal.media[imageIndex] }}
                style={[{ left: imageXPosition }, styles.image]}
            />
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
                        <Image
                            source={{ uri: deal.user?.avatar }}
                            style={styles.avatar}
                        />
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
