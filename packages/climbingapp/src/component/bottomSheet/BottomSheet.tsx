import React, { useCallback, useMemo } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { BottomSheetFlatList, BottomSheetModal } from '@gorhom/bottom-sheet';
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { colorStyles } from 'climbingapp/src/styles';
import styled from 'styled-components/native';

interface BottomSheetProps {
    data: string[];
    onEachItemPress: (({ }: any) => void);
}

const MyBottomSheet = React.forwardRef<BottomSheetModalMethods, BottomSheetProps>(({ onEachItemPress, data }, ref) => {

    const snapPoints = useMemo(() => ['25%', '50%'], []);

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            padding: 24,
            justifyContent: 'center',
            backgroundColor: 'grey',
        },
        contentContainer: {
            flex: 1,
            paddingLeft: 20,
            alignItems: 'flex-start'
        },
        itemContainer: {
            padding: 6,
            margin: 6,
            width: '100%',
            backgroundColor: `${colorStyles.White}`,
        },
        headContainer: {
            padding: 6,
            margin: 6,
            width: '100%',
            backgroundColor: `${colorStyles.White}`,
        }
    });
    // renders
    const Divider = styled.View`
        background-color: ${colorStyles.Gray300};
        height: 1px;
    `;

    const renderItem = useCallback(
        ({ item }) => (
            <Pressable style={styles.itemContainer} onPress={onEachItemPress}>
                <Text>{item}</Text>
            </Pressable>
        ),
        []
    );


    const Header = useCallback(
        () => (
            <>
                <View style={styles.headContainer}>
                    <Text style={{ fontWeight: 'bold', color: '#333333' }}>시 도 선택</Text>
                </View>
                <Divider />
            </>
        ),
        []
    );

    return (
        <>
            <BottomSheetModal
                enablePanDownToClose
                ref={ref}
                index={1}
                snapPoints={snapPoints}
            >
                <BottomSheetFlatList
                    data={data}
                    ListHeaderComponent={Header}
                    ListHeaderComponentStyle={{ width: '95%' }}
                    renderItem={renderItem}
                    contentContainerStyle={styles.contentContainer}
                    scrollEnabled={true}
                />
            </BottomSheetModal>
        </>
    );
});

export default MyBottomSheet;