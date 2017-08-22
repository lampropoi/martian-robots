import React, {Component} from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import Button from '../components/Button';
import move from '../modules/move';

const Content = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const Title = styled.h1`
  font-size: 24px;
`;

const Textarea = styled.textarea`
  width: 300px;
  height: 200px;
  font-size: 12px;
  color: black;
`;

const ButtonArea = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  width: 20%;
`;

/**
 * The home view
 */
class Home extends Component {
  /**
   * The class constructor
   * @param  {object} props The class props
   */
  constructor(props) {
    super(props);

    this.state = {
      /**
       * A history of all the actions that the robots do
       * @type {Array}
       */
      history: [],
      /**
       * The text in the textarea
       * @type {String}
       */
      value: ''
    };

    // bindings
    this.handleChange = this.handleChange.bind(this);
    this.handleMove = this.handleMove.bind(this);
  }

  /**
   * Handle the textarea text change by the user
   * @param  {object} event The event object
   */
  handleChange(event) {
    this.setState({value: event.target.value});
  }

  /**
   * Handle the click of the result button to find the robots movement
   * Updates the output
   */
  handleMove() {
    const {result, history, martianArea} = move(this.state.value);
    // let's create the desired output
    if (/ERROR/i.test(result)) {
      this.setState(() => ({
        value: result
      }));
    } else {
      const formattedResult = result.reduce((a, b) => `${a}
      ${b.robot.x} ${b.robot.y} ${b.robot.d} ${b.status}`.trim(), '');

      // the proper way to do this is with Redux, but let's skip it for now
      localStorage.setItem('history', JSON.stringify(history));
      localStorage.setItem('martianArea', JSON.stringify(martianArea));

      this.setState(() => ({
        value: formattedResult,
        history
      }));
    }
  }

  /**
   * The component render function
   */
  render() {
    return (
      <Content>
        <Title>Robots Instructions</Title>
        <Textarea placeholer={'Insert Instructions...'} value={this.state.value} onChange={this.handleChange} />
        <ButtonArea>
          <Button
            design='primary'
            onClick={() => this.handleMove}
            text='Results'
          />
          <Link to='/simulate'>
            <Button
              design='secondary'
              disabled={!this.state.history.length}
              text='Simulate'
            />
          </Link>
        </ButtonArea>
      </Content>
    );
  }
}

export default Home;
