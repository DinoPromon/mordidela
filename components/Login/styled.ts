import styled from 'styled-components'

import { PINK, ORANGE } from '@utils/colors';
import { FORM_SCREEN_MAX_WIDTH } from '@utils/styles';

// generalizar esse código

const Wrapper = styled.div`
  display: flex;
  padding: 2rem 0;
  flex-direction: column;
  width: 85%;
  justify-content: center;
  gap: 1.5rem;
  max-width: ${FORM_SCREEN_MAX_WIDTH};

  & > img {
    align-self: center;
    width: 200px;
  }

  & > p {
    width: auto;
    font-size: 18px;
    text-align: center;
    color: ${ORANGE};
    & > a {
      text-decoration: none;
      color: ${PINK};
      padding: 1px 0;
      border-bottom: 1px ${PINK} solid;
    }
  }
`;

export default Wrapper;