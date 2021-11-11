import styled from "styled-components";

const CustomFilter = styled.ul`

    & > ul {

        & > button {
            display: block;
            float: left;
            text-align: center;
            padding: 0.5rem;
        }
    }
`;

export default CustomFilter;