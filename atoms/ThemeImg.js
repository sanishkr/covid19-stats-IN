import React, { useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import tw from 'tailwind.macro';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  actionCreators as StatsActionsCreators,
  selectors,
} from '../store/stats';

const darkTheme = keyframes`
  0% {
    opacity: 1;
    transform: rotateZ(0deg);
    background-image: linear-gradient(to bottom right,yellow,yellow,#1a202c00, #000);
  }
  30% {
    opacity: 0.2;
    transform: rotateZ(360deg);
    background-image: linear-gradient(to top left,yellow,yellow,#000000ad, #000);
  }
  100% {
    opacity: 1;
    transform: rotateZ(360deg);
    background-image: linear-gradient(to top left,yellow,yellow,#000000ad, #000);
  }
`;
const lightTheme = keyframes`
  0% {
    opacity: 1;
    transform: rotateZ(0deg);
    background-image: linear-gradient(to top left,yellow,yellow,#000000ad, #000);
  }
  30% {
    opacity: 0.2;
    transform: rotateZ(360deg);
    background-image: linear-gradient(to bottom right,yellow,yellow,#1a202c00, #000);
  }
  100% {
    opacity: 1;
    transform: rotateZ(360deg);
    background-image: linear-gradient(to bottom right,yellow,yellow,#1a202c00, #000);
  }
`;

const ThemeImg = styled.img`
  ${tw`w-8 h-8 cursor-pointer`};
  ${props =>
    props.theme === 'dark'
      ? css`
          animation: ${darkTheme} 2s ease-in 1;
          animation-fill-mode: both;
        `
      : css`
          animation: ${lightTheme} 2s ease-in 1;
          animation-fill-mode: both;
        `}
`;

const ThemeImage = ({ currentTheme, changeTheme, setTheme, ...props }) => {
  const [them, setThem] = useState(
    currentTheme || localStorage.getItem('theme') || 'light',
  );
  return (
    <ThemeImg
      onClick={() => {
        changeTheme(them === 'light' ? 'dark' : 'light');
        setThem(them === 'light' ? 'dark' : 'light');
      }}
      theme={them}
      {...props}
    />
  );
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setTheme: StatsActionsCreators.setTheme,
    },
    dispatch,
  );

const mapStateToProps = store => ({
  currentTheme: selectors.getTheme(store),
});

export default connect(mapStateToProps, mapDispatchToProps)(ThemeImage);
