


import React from 'react'
import { styled } from '@mui/material/styles';
import bgimage from 'assets/images/auth-bg.png'

const Container = styled('div')`
    max-width: 1200px;
    margin: 0 auto;
`
const Page = styled('div')`
    height: 100vh;
    background-image: url(${bgimage});
    background-repeat: no-repeat;
    background-color: white;
    background-size: 70%;
`

export default function AuthContaier({ children }) {
    return (
        <Page>
            <Container>
                {children}
            </Container>
        </Page>
    )
}
