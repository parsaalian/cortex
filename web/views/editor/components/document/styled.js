import styled, { keyframes } from 'styled-components';

/* type SizeType = {
  size: {
    width: number,
    height: number,
  },
}; */

const flicker = keyframes`
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
`;

export const StyledPage = styled.div`
  background-color: white;
  box-shadow: rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  width: ${(props) => props.size.width};
  height: ${(props) => props.size.height};
  margin: 10px auto;
  /* BUG: padding cause page size to increase */
  padding: 1rem;
  text-align: justify;
`;

export const StyledLine = styled.div`
  width: 100%;
`;

export const StyledCursor = styled.span`
  border: 1px solid black;
  animation: ${flicker} 1s infinite;
`;
