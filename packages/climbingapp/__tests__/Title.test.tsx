import React from 'react';
import 'react-native';
// Note: test renderer\must be required after react-native.
import renderer from 'react-test-renderer';
import { Title } from 'climbingapp/src/component/text/AuthTitle';

it('renders correctly', () => {
    renderer.create(<Title>test</Title>);
});
