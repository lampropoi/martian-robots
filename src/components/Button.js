import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import colors from '../modules/colors';

const Wrapper = styled.button`
  background-color: ${props => (props.design === 'primary' ? colors.blue : colors.green)};
  color: ${colors.white};
  padding: 4px 8px;
  border: 0;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    opacity: 0.6;
  }

  &:active {
    opacity: 0.3;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.3;
  }
`;

/**
 * A simple button component
 */
const Button = ({
  design,
  disabled,
  onClick,
  text
}) => (
  <Wrapper
    disabled={disabled}
    onClick={onClick && onClick()}
    design={design}
    type='button'
  >{text}</Wrapper>
);

Button.defaultProps = {
  clickData: null,
  disabled: false,
  onClick: null
};

Button.propTypes = {
  /**
   * The button design
   */
  design: PropTypes.oneOf(['primary', 'secondary']).isRequired,
  /**
   * Makes the button disabled
   */
  disabled: PropTypes.bool,
  /**
   * On click of the component, the function that will run
   */
  onClick: PropTypes.func,
  /**
   * Text shown in the button
   */
  text: PropTypes.string.isRequired
};

export default Button;
