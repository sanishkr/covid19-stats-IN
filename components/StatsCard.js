import styled from 'styled-components';
import tw from 'tailwind.macro';

const StyledCount = styled.span`
  ${tw`text-3xl`}
`;

export default ({ count, type }) => {
  return (
    <div className="w-full max-w-40 md:w-1/3 pt-3 px-3 md:pr-2">
      <div className="bg-white border rounded shadow p-2 flex flex-row items-center">
        <div className="flex-1 text-green-500 text-center">
          <StyledCount>{count}</StyledCount>
          <span>{type}</span>
        </div>
      </div>
    </div>
  );
};
