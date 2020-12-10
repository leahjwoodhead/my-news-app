import React from 'react';
import styled from 'styled-components'

const AppFooter = styled.footer`
    background-color: #F2A359;
    width: 100%;
    grid-area: footer;
    position: fixed;
    bottom: 0;
    text-align: left;
    color: white;
    padding-left: 10px;
`

const Footer = () => {
    return (
        <AppFooter>
            <p>Thanks for visiting 👋</p>
        </AppFooter>
    );
};

export default Footer;