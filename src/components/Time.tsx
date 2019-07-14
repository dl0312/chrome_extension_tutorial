import React from "react";
import styled from 'styled-components';

const weekdays = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];

const Container = styled.div`
display: flex;
margin-top: 3rem;
flex-direction: column;
align-items: center;
justify-content: center;
font-size :1.2rem;
font-weight: 700;

`

const Clock = styled.div`
margin-bottom: 0.5rem;
`

const DateContainer = styled.div``

const Colon = styled.span`
animation: fadeIn 2s infinite;
`

interface Props {

    hours: number,
    minutes: number,
    month: number,
    day: number,
    dayOfWeek: number
}

const Time: React.SFC<Props> = ({ minutes, hours, month, day, dayOfWeek }) => {

    return (
        <Container>
            <Clock>
                {hours} <Colon>:</Colon> {minutes}
            </Clock>
            <DateContainer>
                {month}월 {day}일 {weekdays[dayOfWeek]}
            </DateContainer>
        </Container>
    )
}


export default Time;