import React from "react";
import styled from 'styled-components';

interface Props {
    icon: string,
    title: string,
    link: string
}

const Button = styled.i`
    margin-right: 1rem;
    font-size: 1.2rem;
    transition: 0.25s ease-in-out;
`

const Title = styled.span`
    opacity: 0;
    transform: translateX(-25%);
    transition: 0.25s ease-in-out;
    font-size: 1.2rem;
`
const Container = styled.a`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 2.5rem;
    &:hover{
        ${Title}{
            opacity: 1;
            font-size: 1.3rem;
            transform: translateX(0);
        }
        ${Button}{
            font-size: 1.3rem;
        }
    }
`


const BaseButton: React.SFC<Props> = ({ icon, title, link }) => {
    return (
        <Container href={link} target="_blank">
            <Button className={icon}></Button>
            <Title>{title}</Title>
        </Container>
    )
}

export default BaseButton