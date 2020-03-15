import React, { useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import tw from 'tailwind.macro';
import { useRouter } from 'next/router';
import { setCookie, parseCookies } from 'nookies';

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

export default props => {
  const cookies = parseCookies();
  // const router = useRouter();
  const [them, setThem] = useState(cookies.theme || 'light');
  return (
    <ThemeImg
      onClick={() => {
        setCookie(null, 'theme', them === 'light' ? 'dark' : 'light');
        setThem(them === 'light' ? 'dark' : 'light');
        // router.reload();
      }}
      theme={them}
      {...props}
    />
  );
};
