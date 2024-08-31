import { View, Text, StyleSheet, TextInput } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors } from '../constants/Colors'
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import React, { useRef, useState } from 'react'

const Search = () => {

    const [isLetter, setLetter] = useState(false);
    const inputRef = useRef(null);

    return (
        <SafeAreaView style={[{ flex: 1, padding: 20 }, styles.parent]}>
            <View>
                <TextInput
                    style={styles.input}
                    ref={inputRef}
                    onChange={(e) => {
                        if (e.target.value != '') setLetter(true)
                        else setLetter(false)
                    }}
                />
                {
                    isLetter ?
                        <View style={styles.searchAndCross}>
                            <Entypo name="cross" size={24} color="white" />
                        </View>
                        :
                        <View style={styles.searchAndCross} onPress={() => {
                            console.log(inputRef.current);
                            inputRef.current.value = '';

                        }} >

                            <AntDesign name="search1" size={24} color="white" />
                        </View>
                }
            </View>
        </SafeAreaView>
    )
}

export default Search

const styles = StyleSheet.create({
    parent: {
        backgroundColor: Colors.dark.background,
        color: Colors.dark.text,
    },
    input: {
        color: 'white',
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 20,
        padding: 10,
        paddingRight: 20,
        paddingHorizontal: 20,
        position: 'relative'
    },
    searchAndCross: {
        position: 'absolute',
        right: 10,
        top: '50%',
        transform: [{ translateY: -12 }]
    }
})