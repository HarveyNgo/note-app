import React from 'react';
import {render} from '@testing-library/react-native';
import CustomText from '../CustomText';

describe('CustomText Component', () => {
  it('renders correctly with given text', () => {
    const {getByText} = render(<CustomText>Test Text</CustomText>);
    expect(getByText('Test Text')).toBeTruthy();
  });

  it('applies custom styles', () => {
    const {getByText} = render(
      <CustomText style={{color: 'red'}}>Styled Text</CustomText>,
    );
    const textElement = getByText('Styled Text');
    expect(textElement).toHaveStyle({color: 'red'});
  });
});
