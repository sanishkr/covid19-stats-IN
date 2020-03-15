import React from 'react';

import styled, { keyframes } from 'styled-components';
import tw from 'tailwind.macro';

import ThemeImg from '../atoms/ThemeImg';

const coronaDance = keyframes`
  0% {
    transform: scale(0.8) rotate(0deg);
    opacity: 1;
  }
  60% {
    transform: scale(1) rotate(360deg);
    opactiy: 0.8;
  }
  100% {
    transform: scale(0.8) rotate(0deg);
    opacity: 1;
  }
`;
const StyledNav = styled.nav`
  ${tw`flex flex-wrap items-center justify-between w-full p-2 md:p-4 md:w-2/3`}
`;
const CoronaImg = styled.img`
  ${tw`self-start w-12 h-12 md:w-20 md:h-20`};
  animation: ${coronaDance} 8s cubic-bezier(0.68, -0.55, 0.27, 1.55) infinite;
`;

const HeaderWrapper = styled.div`
  ${tw`flex items-center justify-center font-sans`};
  background-color: ${props => props.theme.bg};
  color: ${props => props.theme.text};
`;

const Header = ({ ...props }) => {
  return (
    <HeaderWrapper>
      <StyledNav>
        <CoronaImg alt="Corona Stats" src="./images/Corona.png" />
        <div
          css={tw`flex flex-col justify-center flex-grow float-left ml-2 md:ml-4`}
          style={{ flexGrow: 1 }}
        >
          <h1 css={tw`text-base text-red-500 md:text-2xl lg:text-4xl`}>
            Corona Virus (Covid-19) Stats
          </h1>
          <span css={tw`text-red-500`}>
            Latest Updates -{' '}
            <a
              css={tw`text-sm text-blue-500`}
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/mathdroid/covid-19-api"
            >
              Data Source
            </a>
          </span>
        </div>
        <ThemeImg
          changeTheme={props.changeTheme}
          title="Change theme"
          alt="Theme"
          src="./images/theme.png"
        />
      </StyledNav>
    </HeaderWrapper>
  );
};

export default Header;
