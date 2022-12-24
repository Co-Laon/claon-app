import React from 'react';
import { useAuth } from '../hooks/useAuth';
import LoginNavigator from './LoginNavigator';
import HomeScreen from './screens/main/HomeScreen';
//import MainNavigator from './MainNavigator';

export function RootNavigator() {
  const { user } = useAuth();
  const isLoggedIn = user ? user.isCompletedSignUp : false;
  return <>{isLoggedIn ? <HomeScreen /> : <LoginNavigator />}</>;
}
