import React from 'react';
import styled from 'styled-components/native';
import { StatusBar } from 'react-native';
interface ViewProps {
    color: string;
    children?: React.ReactNode
}

const DefaultView = styled.SafeAreaView<ViewProps>`
    background-color: ${props => props.color};
    width: 100%;
    height: 100%;
`;
const InnerView = styled.View`
    margin-left: 20px;
    margin-right: 20px;
    height: 100%;
`;

export const ScreenView = ({ color, children }: ViewProps) => {
    return <DefaultView color={color}>
        <StatusBar barStyle="dark-content" backgroundColor={color} />
        <InnerView>
            {children}
        </InnerView>
    </DefaultView>;
};

