import styled from 'styled-components';

const Page = styled.div`
  background-color: white;
  box-shadow: rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  width: ${(props) => props.size.width};
  height: ${(props) => props.size.height};
  margin: 10px auto;
  /* BUG: padding cause page size to increase */
  padding: 1rem;
  text-align: justify;
`;

export default Page;
