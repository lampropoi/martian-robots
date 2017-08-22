/* eslint-disable no-unused-expressions */

import React from 'react';
import styled, {injectGlobal} from 'styled-components';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import Home from './views/Home';
import Simulate from './views/Simulate';
import colors from './modules/colors';

injectGlobal`
  * {
    outline: none;
  }

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
  padding: 40px;
  font-size: 30px;
  color: white;
  margin-bottom: 30px;

  a {
    color: ${colors.white};
    text-decoration: none;
  }
`;

const Footer = styled.footer`
  font-size: 14px;
  text-align: right;
  padding: 10px;
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
`;

/**
 * The main app component
 */
const App = () => (
  <Router>
    <Wrapper>
      <Header>
        <Link to='/'><h2>Exploring the red planet!</h2></Link>
      </Header>
      <Route exact={true} path='/' component={Home} />
      <Route path='/simulate' component={Simulate} />
      <Footer>
        A project by <a href='https://github.com/lampropoi/martian-robots'>Ioanna Lampropoulou @Github</a>
      </Footer>
    </Wrapper>
  </Router>
);

export default App;
