import React, {Component} from 'react';
import styled from 'styled-components';
import Grid from '../components/Grid';

const Wrapper = styled.section`
  display: flex;
  justify-content: center;
`;

/**
 * The simulate view
 */
class Simulate extends Component {
  /**
   * The class constructor
   * @param  {object} props The class props
   */
  constructor(props) {
    super(props);

    // read the history and martianArea as saved before
    this.history = JSON.parse(localStorage.getItem('history'));
    this.martianArea = JSON.parse(localStorage.getItem('martianArea'));

    this.state = {
      /**
       * An array with coordinates for the scentAreas
       * @type {Array}
       */
      scentAreas: [],
      /**
       * The robot x position
       * @type {number}
       */
      robotX: null,
      /**
       * The robot y position
       * @type {number}
       */
      robotY: null,
      /**
       * The robot direction
       * @type {string}
       */
      robotD: null
    };
  }

  /**
   * Start simulating the history of movements
   */
  componentDidMount() {
    // use i to iterate the history
    let i = 0;

    // replay the history in steps
    this.interval = setInterval(() => {
      if (this.history[i].type === 'scentArea') {
        // we found a scentArea. RIP robot
        this.setState(() => ({
          scentAreas: [...this.state.scentAreas, [this.history[i].x, this.history[i].y]]
        }));
      } else {
        // robot moved
        this.setState({
          robotX: this.history[i].x,
          robotY: this.history[i].y,
          robotD: this.history[i].d
        });
      }

      i++;

      // if we replayed all movements, stop the interval
      if (i === this.history.length) {
        clearInterval(this.interval);
      }
    }, 500);
  }

  /**
   * On componentWillUnmount stop the interval
   */
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  /**
   * The component render function
   */
  render() {
    return (
      <Wrapper>
        <Grid
          height={this.martianArea.y + 1}
          scentAreas={this.state.scentAreas}
          robotX={this.state.robotX}
          robotY={this.state.robotY}
          robotD={this.state.robotD}
          startY={1}
          width={this.martianArea.x + 1}
        />
      </Wrapper>
    );
  }
}

export default Simulate;
