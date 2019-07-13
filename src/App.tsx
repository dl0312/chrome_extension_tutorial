import React from "react";
import styled from "styled-components";
import Tabletop from "tabletop";
import { GlobalStyle } from "./global-styles";
import {media } from "./config/_mixin";

type Movie = {title: string, line: string, infoUrl: string, imageUrl: string }

// This is example of styled-components
const Container = styled.main<{url: string}>`
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 6rem 0;
  align-items: center;
  background-image: linear-gradient(
      to bottom,
      transparent,
      transparent,
      transparent,
      rgba(20, 24, 28, 1),
      rgba(0, 0, 0, 1)
    ),url(${({url}) => url});
  background-position: center, center;
  background-size: 100% auto;
  ${media.giant}{
    background-size: auto 100%;
  }
`;

const Line = styled.div`
  font-size: 2rem;
  font-weight: 100;
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
    }
  }

  componentDidMount = async () => {

    Tabletop.init({
      key: '1sRaboEbc6Gw2T7cGglZkv0iTNkfKGNXmwJ4PB1r_jfk',
      callback: (data: Movie[]) => {
        const {title, line, infoUrl, imageUrl } = data[0]
        this.setState({title, line, infoUrl, imageUrl, load: true })
      },
      simpleSheet: true
    })
  }
  render() {
    const { title, line, imageUrl, load } = this.state;
    console.log(this.state);
    return (
      <>
      <GlobalStyle />
      {load && <Container url={imageUrl} className="App">
         <Line>
           {line}
         </Line>
        <MovieTitle>
        {`<${title}>`}
        </MovieTitle>
      </Container>}
      </>
    );
  }
}

export default App;
