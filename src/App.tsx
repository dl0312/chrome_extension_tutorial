import React from "react";
import styled from "styled-components";
import { GlobalStyle } from "./global-styles";
import { media } from "./config/_mixin";
import Time from './components/Time';
// import { Movie } from './shared-types'
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

const LineContainer = styled.div`
display: flex;
align-items: center;
`

const QuoteIcon = styled.i`
font-size: 1.5rem;
`

const Line = styled.div`
  font-size: 2rem;
  font-weight: 100;
  line-height: 3rem;
  word-break: keep-all;
  text-align: center;
`

const MovieTitle = styled.div`
  font-size: 1.5rem;
  margin: 2rem 0;
  word-break: keep-all;
  text-align: center;
  color: rgba(255,255,255,0.7);
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
            <LineContainer><QuoteIcon style={{ marginRight: '1.5rem' }} className="fas fa-quote-left"></QuoteIcon><Line dangerouslySetInnerHTML={{ __html: `${line}` }} /><QuoteIcon style={{ marginLeft: '1.5rem' }} className="fas fa-quote-right"></QuoteIcon></LineContainer>
            <MovieTitle>
              {`<${title}>`}
            </MovieTitle></MovieContainer>
        </Container>}
      </>
    );
  }
}

export default App;
