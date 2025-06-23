import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import PrimaryButton from '../PrimaryButton';

describe('PrimaryButton', () => {
  it('renders correctly with given title', () => {
    const {getByText} = render(
      <PrimaryButton title="Click Me" onPress={() => {}} />,
    );
    expect(getByText('Click Me')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const onPressMock = jest.fn();
    const {getByText} = render(
      <PrimaryButton title="Click Me" onPress={onPressMock} />,
    );

    fireEvent.press(getByText('Click Me'));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it('applies custom styles to the button', () => {
    const customStyle = {backgroundColor: 'red'};
    const {getByTestId} = render(
      <PrimaryButton
        title="Styled Button"
        onPress={() => {}}
        style={customStyle}
      />,
    );

    const button = getByTestId('button');
    expect(button.props.style).toEqual({
      ...button.props.style,
      ...customStyle,
    });
  });
});
