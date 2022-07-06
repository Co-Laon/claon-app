import React from 'react';
import { useAuth } from '../hooks/useAuth';
import LoginNavigator from './LoginNavigator';
import MainNavigator from './MainNavigator';

export function RootNavigator() {
    const { user } = useAuth();

    return (
        <>
            {user ? <MainNavigator /> : <LoginNavigator />}
        </>
    );
}

