import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, Easing } from 'react-native';
import MovieBox from '../constants/MovieCss';

const MovieSkeleton = () => {
    const animatedValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(animatedValue, {
                    toValue: 1,
                    duration: 500,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: false,
                }),
                Animated.timing(animatedValue, {
                    toValue: 0,
                    duration: 500,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: false,
                }),
            ])
        ).start();
    }, [animatedValue]);

    const animatedBackgroundColor = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['#a0a0a0', '#f0f0f0'] // Lighter to darker gray
    });

    return (
        <View style={MovieBox.box}>
            <Animated.View style={[MovieBox.image, { backgroundColor: animatedBackgroundColor }]} />
            <Animated.Text
                numberOfLines={1}
                style={{
                    width: '85%',
                    height: 11,
                    backgroundColor: animatedBackgroundColor,
                    borderRadius: 10,
                    marginTop: 8,
                }}
            />
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 2 }}>
                <Animated.Text
                    style={{
                        width: '50%',
                        height: 11,
                        backgroundColor: animatedBackgroundColor,
                        borderRadius: 10,
                    }}
                />
            </View>
        </View>
    );
};

export default MovieSkeleton;
