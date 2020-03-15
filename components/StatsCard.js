import React from 'react';
import styled from 'styled-components';
import tw from 'tailwind.macro';

const countColor = type => {
  switch (type) {
    case 'confirmed':
      return tw`text-orange-500`;
    case 'recovered':
      return tw`text-green-500`;
    case 'deaths':
      return tw`text-red-500`;
    default:
      return tw`text-black`;
  }
};
const CardContainer = styled.div`
  ${tw`w-2/3 px-3 pt-3 md:w-1/3 md:pr-2`};
`;
const CardBody = styled.div`
  ${tw`flex flex-col items-center justify-around h-32 p-2 text-center border rounded shadow-sm md:h-40`};
  background-color: ${props => props.theme.cardBg};
`;
const StyledCount = styled.span`
  ${tw`text-3xl`}
  ${props => countColor(props.type)};
`;
const StyledText = styled.span`
  ${tw`text-black capitalize`};
  color: ${props => props.theme.text};
`;
export default ({ count, type }) => {
  return (
    <CardContainer>
      <CardBody>
        <StyledCount type={type}>{count.toLocaleString()}</StyledCount>
        <StyledText>{type}</StyledText>
      </CardBody>
    </CardContainer>
  );
};
