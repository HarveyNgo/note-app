import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import ConfirmModal from '../ConfirmModal';

describe('ConfirmModal', () => {
  const mockOnConfirm = jest.fn();
  const mockOnCancel = jest.fn();

  const defaultProps = {
    visible: true,
    title: 'Test Title',
    message: 'Test Message',
    onConfirm: mockOnConfirm,
    onCancel: mockOnCancel,
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly when visible', () => {
    const {getByText} = render(<ConfirmModal {...defaultProps} />);
    expect(getByText('Test Title')).toBeTruthy();
    expect(getByText('Test Message')).toBeTruthy();
  });

  it('does not render when not visible', () => {
    const {queryByText} = render(
      <ConfirmModal {...defaultProps} visible={false} />,
    );
    expect(queryByText('Test Title')).toBeNull();
    expect(queryByText('Test Message')).toBeNull();
  });

  it('calls onConfirm when the confirm button is pressed', () => {
    const {getByText} = render(<ConfirmModal {...defaultProps} />);
    const confirmButton = getByText('yes');
    fireEvent.press(confirmButton);
    expect(mockOnConfirm).toHaveBeenCalledTimes(1);
  });

  it('calls onCancel when the cancel button is pressed', () => {
    const {getByText} = render(<ConfirmModal {...defaultProps} />);
    const cancelButton = getByText('cancel');
    fireEvent.press(cancelButton);
    expect(mockOnCancel).toHaveBeenCalledTimes(1);
  });

  it('matches the snapshot', () => {
    const {toJSON} = render(<ConfirmModal {...defaultProps} />);
    expect(toJSON()).toMatchSnapshot();
  });
});
