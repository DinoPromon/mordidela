import styled from "styled-components";

const Wrapper = styled.div`
  overflow-y: auto;
  padding: 1.25rem 1.5rem;
  max-height: 90vh;
  scroll-behavior: smooth;
  scrollbar-color: #c9bfd1 transparent;
  scrollbar-width: thin;
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  &::-webkit-scrollbar-track {
    background-color: transparent;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #c9bfd1;
    border-radius: 10px;
  }
`;

export default Wrapper;
