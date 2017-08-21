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
  font-size: 20px;
`;

const Textarea = styled.textarea`
  width: 200px;
  height: 200px;
  font-size: 12px;
`;

const ButtonArea = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  width: 20%;
`;

class Home extends Component {
  /**
   * The class constructor
   * @param  {object} props The class props
   */
  constructor(props) {
    super(props);

    this.state = {
      /**
       * The text in the textarea
       * @type {String}
       */
      value: 'Insert the instructions!'
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
   */
  handleMove() {
    const result = move();
    this.setState(() => ({value: result}));
  }

  render() {
    return (
      <Content>
        <Title>Robots Instructions</Title>
        <Textarea value={this.state.value} onChange={this.handleChange} />
        <ButtonArea>
          <Button
            design='primary'
            onClick={() => this.handleMove}
            text='Results'
          />
          <Link to='/simulate'>
            <Button
              design='secondary'
              text='Simulate'
            />
          </Link>
        </ButtonArea>
      </Content>
    );
  }
}

export default Home;
