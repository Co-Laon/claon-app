import React from 'react';
import 'react-native';
import LoginScreen from '../src/navigation/screens/auth/LoginScreen';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
    renderer.create(<LoginScreen />);
});
