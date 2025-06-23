import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import InfoModal from '../InforModal';

// Mock react-native-linear-gradient to avoid errors during testing
jest.mock('react-native-linear-gradient', () => 'LinearGradient');



describe('InfoModal', () => {
  const mockOnClose = jest.fn();

  const defaultProps = {
    visible: true,
    onClose: mockOnClose,
    message: 'Test message',
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

    it('should render the modal with the correct message', () => {
      const {getByText} = render(<InfoModal {...defaultProps} />);
      expect(getByText('Test message')).toBeTruthy();
    });

  it('should call onClose when the button is pressed', () => {
    const {getByText} = render(<InfoModal {...defaultProps} />);
    const button = getByText('ok');
    fireEvent.press(button);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

    it('should not render the modal when visible is false', () => {
      const {queryByText} = render(
        <InfoModal {...defaultProps} visible={false} />,
      );
      expect(queryByText('Test message')).toBeNull();
    });

    it('should render the modal with the correct styles', () => {
      const {getByText} = render(<InfoModal {...defaultProps} />);
      const message = getByText('Test message');
      expect(message.props.style).toContainEqual(
        expect.objectContaining({textAlign: 'center'}),
      );
    });
});
