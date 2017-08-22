import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import _ from 'lodash';
import Robot from './Robot';
import colors from '../modules/colors';

const TD = styled.td`
  border: 1px solid ${props => (props.lost ? colors.red : colors.gray)};
  width: 70px;
  height: 70px;
`;

/**
 * A grid that represents mars. Be careful for adventurous robots!
 */
const Grid = ({
  height,
  robotD,
  robotX,
  robotY,
  scentAreas,
  width
}) => (
  <table>
    <tbody>
      {
        Array.from(Array(height).keys()).map(yIndex => (
          <tr key={yIndex}>
            {
              Array.from(Array(width).keys()).map(xIndex => {
                const x = xIndex;
                const y = height - 1 - yIndex;

                // create a unique key
                const key = `${x} - ${y}`;

                // check if theres a robot on this position
                const hasRobot = x === robotX && y === robotY;

                // check if a robot was already lost from this place
                const hasLost = _.find(scentAreas, item => (item[0] === x && item[1] === y));
                return (
                  <TD key={key} lost={hasLost}>
                    {
                      hasRobot && <Robot direction={robotD} size={50} />
                    }
                  </TD>
                );
              })
            }
          </tr>
        ))
      }
    </tbody>
  </table>
);

Grid.defaultProps = {
  robotD: null,
  robotX: null,
  robotY: null
};

Grid.propTypes = {
  /**
   * The grid height
   */
  height: PropTypes.number.isRequired,
  /**
   * An array with the coordinates where robots were lost
   */
  scentAreas: PropTypes.arrayOf(PropTypes.array).isRequired,
  /**
   * The robot direction
   */
  robotD: PropTypes.oneOf(['N', 'E', 'S', 'W']),
  /**
   * The robot x position
   */
  robotX: PropTypes.number,
  /**
   * The robot y position
   */
  robotY: PropTypes.number,
  /**
   * The grid width
   */
  width: PropTypes.number.isRequired
};

export default Grid;
