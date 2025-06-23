import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import CategoryDropDown from '../CategoryDropDown';

// Mock react-redux useSelector
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}));

describe('CategoryDropDown Component', () => {
  it('renders correctly', () => {
    const {getByText} = render(
      <CategoryDropDown
        onSelectCategory={() => {}}
        selectedCategory="category1"
      />,
    );
    expect(getByText('Category 1')).toBeTruthy();
    expect(getByText('Category 2')).toBeTruthy();
  });

  it('calls onSelectCategory when a category is selected', () => {
    const mockOnSelectCategory = jest.fn();
    const {getByText} = render(
      <CategoryDropDown
        onSelectCategory={mockOnSelectCategory}
        selectedCategory=""
      />,
    );

    fireEvent.press(getByText('Category 1'));
    expect(mockOnSelectCategory).toHaveBeenCalledWith('category1');
  });
});
