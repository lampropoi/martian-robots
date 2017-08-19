/* eslint-disable no-unused-expressions */

import React from 'react';
import styled, {injectGlobal} from 'styled-components';
import colors from './modules/colors';
import Button from './components/Button';

injectGlobal`
  body {
    margin: 0;
    padding: 0;
    font-family: sans-serif;
  }
`;

const Wrapper = styled.div`
  text-align: center;
`;

const Header = styled.header`
  background-color: ${colors.red};
  height: 100px;
  padding: 20px;
  color: white;
`;

const Body = styled.main`
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
`;

const ButtonArea = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  width: 20%;
`;

const Footer = styled.footer`
  font-size: 10px;
  text-align: right;
  padding: 10px;
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
`;

const run = () => {};
const simulate = () => {};

const App = () => (
  <Wrapper>
    <Header>
      <h2>Welcome to the red planet!</h2>
    </Header>
    <Body>
      <Title>Robots Instructions</Title>
      <Textarea />
      <ButtonArea>
        <Button
          design='primary'
          onClick={run}
          text='Results'
        />
        <Button
          design='secondary'
          onClick={simulate}
          text='Simulate'
        />
      </ButtonArea>
    </Body>
    <Footer>A project by <a href='https://github.com/lampropoi/martian-robots'>Ioanna Lampropoulou @Github</a></Footer>
  </Wrapper>
);

export default App;
