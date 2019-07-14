import React from "react";
import styled from "styled-components";
import { GlobalStyle } from "./global-styles";
import { media } from "./config/_mixin";
import Time from './components/Time';
import Logo from "./static/asset/logo.png"
import { getMovies } from './api';


// This is example of styled-components
const Container = styled.main<{ url: string }>`
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-image: 
    linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.2),
      rgba(0, 0, 0, 0.2)
    ),
    linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.5),
      transparent,
      transparent,
      transparent
    ), url(${({ url }) => url});
  background-position: center, center;
  background-size: 100% auto;
  background-repeat: no-repeat;
  ${media.giant}{
    background-size: auto 100%;
  }
`;

const MovieContainer = styled.div`
  width: 100%;
  padding: 6rem 0 2rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  transition: background-size 1s ease-in-out;
    background-image: linear-gradient(
      to bottom,
      transparent,
      rgba(0, 0, 0, 0.5),
      rgba(0, 0, 0, 1),
      rgba(0, 0, 0, 1),
      rgba(0, 0, 0, 1)
    );
    background-size: auto 70%;
    background-position: bottom;
    background-repeat: no-repeat;
  &:hover {
    background-size: auto 100%;
  }
`


const QuoteIcon = styled.i`
font-size: 1.5rem;
margin: 1.5rem;
transition: margin 0.5s ease-in-out;
`

const Line = styled.div`
  font-size: 2rem;
  font-weight: 100;
  line-height: 3rem;
  transition: font-size 0.5s ease-in-out, line-height 0.5s ease-in-out;
  word-break: keep-all;
  text-align: center;
`

const LineContainer = styled.div`
display: flex;
align-items: center;
&:hover{
  ${QuoteIcon}{
    margin: 3rem;
  }
  ${Line} {
    font-size: 2.2rem;
    line-height: 3.3rem;
  }
}
`


const MovieTitle = styled.div`
  font-size: 1.5rem;
  margin: 2rem 0;
  word-break: keep-all;
  text-align: center;
  color: rgba(255,255,255,0.7);
`

const Signature = styled.img`
width: 4rem;
`;

const SignatureLink = styled.a`
cursor: pointer;
position: absolute;
right: 2rem;
bottom: 2rem;
`

interface Props {

}

interface State {
  load: boolean,
  title: string,
  line: string,
  infoUrl: string,
  imageUrl: string;

  hours: number,
  minutes: number,
  month: number,
  day: number,
  dayOfWeek: number
}

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      load: false,
      title: "",
      line: "",
      infoUrl: "",
      imageUrl: "",

      hours: 0,
      minutes: 0,
      month: 0,
      day: 0,
      dayOfWeek: 0
    }
  }

  getTime = () => {
    const date: Date = new Date();
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const dayOfWeek = date.getDay();
    this.setState({ minutes, hours, month, day, dayOfWeek })
  }

  pickRandomItem<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * (arr.length))];
  };

  componentDidMount = async () => {
    this.getTime()
    const { data: { feed: { entry } } }: any = await getMovies();
    const { gsx$title, gsx$line, gsx$infourl, gsx$imageurl } = this.pickRandomItem(entry)
    this.setState({ title: gsx$title.$t, line: gsx$line.$t, infoUrl: gsx$infourl.$t, imageUrl: gsx$imageurl.$t, load: true })
    setInterval(this.getTime, 1000);
  }
  render() {
    const { title, line, imageUrl, load, minutes, hours, month, day, dayOfWeek } = this.state;
    return (
      <>
        <GlobalStyle />
        {load && <Container url={imageUrl} className="App">
          <Time minutes={minutes} hours={hours} month={month} day={day} dayOfWeek={dayOfWeek} />
          <MovieContainer >
            <LineContainer><QuoteIcon className="fas fa-quote-left"></QuoteIcon><Line dangerouslySetInnerHTML={{ __html: `${line}` }} /><QuoteIcon className="fas fa-quote-right"></QuoteIcon></LineContainer>
            <MovieTitle>
              {`<${title}>`}
            </MovieTitle></MovieContainer>
          <SignatureLink target="_blank" href="https://github.com/dl0312">
            <Signature src={Logo}
            /></SignatureLink>
        </Container>}
      </>
    );
  }
}

export default App;
