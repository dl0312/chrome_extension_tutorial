import React from "react";
import styled from "styled-components";
import Tabletop from "tabletop";
import { GlobalStyle } from "./global-styles";

type Movie = {title: string, line: string, infoUrl: string, imageUrl: string }

// This is example of styled-components
const Container = styled.main<{url: string}>`
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: url(${({url}) => url});
`;

const Line = styled.span`
`

const MovieTitle = styled.span`
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
        <MovieTitle>
        {title}
        </MovieTitle>
         <Line>
           {line}
         </Line>
      </Container>}
      </>
    );
  }
}

export default App;
