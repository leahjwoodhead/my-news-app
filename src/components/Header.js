import React from 'react';
import styled from 'styled-components'

const Title = styled.header`
    font-size: 5vw;
    color: #DF3B57;
    background-color: #F2A359;
    height: 15vw;
    display: flex;
    padding-left: 5vw;
    align-items: center;
`

const Header = () => {
    return (
        <Title>
            News Application
        </Title>
    );
};

export default Header;