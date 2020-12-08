import React from 'react';
import styled from 'styled-components'

const Title = styled.header`
    font-size: 5vw;
    color: #DF3B57;
    background-color: #F2A359;
    display: flex;
    padding-left: 5vw;
    align-items: center;
    grid-area: header;
    animation: backgroundBlinker 10s linear;

    @keyframes backgroundBlinker{
        0%   {background-color:red; left:0px; top:0px;}
        25%  {background-color:yellow; left:200px; top:0px;}
        50%  {background-color:blue; left:200px; top:200px;}
        75%  {background-color:green; left:0px; top:200px;}
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