import React from 'react';
import styled from 'styled-components'

const Title = styled.header`
    font-size: 5vw;
    color: white;
    background-color: #353A47;
    display: flex;
    justify-content: center;
    align-items: center;
    grid-area: header;
    animation: backgroundBlinker 10s linear 0s infinite;

    @media screen and (max-width: 600px) {
       height: 150px; 
    }

    @keyframes backgroundBlinker{
        0%   {background-color:red; left:0px; top:0px;}
        25%  {background-color:yellow; left:200px; top:0px;}
        50%  {background-color:orange; left:200px; top:200px;}
        75%  {background-color:yellow; left:0px; top:200px;}
        100% {background-color:red; left:0px; top:0px;}
    }

`

const Header = () => {
    return (
        <Title>
            News Application
        </Title>
    );
};

export default Header;