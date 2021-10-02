import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App component', ()=> {
  test('renders without error', ()=> {
    render(<App />);

    expect(screen.getByText('Tweet Feed')).toBeInTheDocument();
  })
});