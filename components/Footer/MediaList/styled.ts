import styled from "styled-components";

export const MediaListContainer = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 0.5rem;
  gap: 2rem;

  .icon-link {
    display: inline-block;
    transition: transform 200ms ease-in-out;

    &:hover {
      transform: scale(1.25);
    }
  }
`;
