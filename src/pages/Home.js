import React from "react";
import FilmLinker from "../components/FilmLinker";
import "../styles/_home.scss";
import styled from "styled-components";

const Home = () => {
  return (
    <Main>
      <FilmLinker> </FilmLinker>
    </Main>
  );
};

const Main = styled.div`
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
`;

export default Home;
