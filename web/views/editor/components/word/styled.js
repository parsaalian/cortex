import styled, { keyframes } from 'styled-components';

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

const Cursor = styled.span`
  border: 1px solid black;
  animation: ${flicker} 1s infinite;
`;

export default Cursor;
