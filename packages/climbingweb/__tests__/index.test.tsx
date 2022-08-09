// __tests__/index.test.jsx

import { render, screen } from '@testing-library/react';
import { AppBar } from 'climbingweb/src/components/common/AppBar';

describe('Home', () => {
    it('renders a heading', () => {
        render(<AppBar title='title' />);
        const heading = screen.getByRole('heading', {
            name: 'title',
        });
        expect(heading).toBeInTheDocument();
    });
});