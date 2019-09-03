// @flow
import styled from 'styled-components';

type SizeType = {
  size: {
    width: number,
    height: number,
  },
};

const Page = styled.div`
  background-color: white;
  box-shadow: rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  width: ${(props: SizeType): number => props.size.width};
  height: ${(props: SizeType): number => props.size.height};
  margin: 10px auto;
  /* BUG: padding cause page size to increase */
  padding: 1rem;
  text-align: justify;
`;

export default Page;
