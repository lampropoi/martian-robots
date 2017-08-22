import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import robot from '../assets/robot.svg';

const RobotImage = styled.img`
  transform: rotate(${props => props.degrees}deg);
  width: ${props => props.size}px;
  height: ${props => props.size}px;
`;

const rotationMapping = {
  N: 0,
  E: 90,
  S: 180,
  W: 270
};

/**
 * The cute robot. Just displays an svg image
 */
const Robot = ({direction, size}) => (
  <RobotImage degrees={rotationMapping[direction]} src={robot} size={size} alt='Robot' />
);

Robot.defaultProps = {
  direction: 'N'
};

Robot.propTypes = {
  /**
   * The direction that the robot faces
   */
  direction: PropTypes.oneOf(['N', 'E', 'S', 'W']),
  /**
   * The size of the robot image
   */
  size: PropTypes.number.isRequired
};

export default Robot;
