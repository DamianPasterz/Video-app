import React from "react";
import Home from "./Home";
import "../styles/title.css";
import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";
import styled from "styled-components";
import image from "../images/Vector.png";
import Button from "react-bootstrap/Button";
import breakpoint from "../components/StyledComponentsBreakpoint";

const TitlePage = () => {
  return (
    <>
      <div class="waveWrapper waveAnimation">
        <Page>
          <Info>
            {" "}
            <p> Your favourite videos all in one place!</p>
            <Link to="/library">
              <Button id="BtnLibrary" variant="outline-light" size="lg">
                Go to library!
              </Button>
            </Link>
          </Info>
          <img src={image} width="800" height="580"></img>
        </Page>

        <div class="waveWrapperInner bgTop">
          <div
            class="wave waveTop"
            style={{
              backgroundImage: `url(http://front-end-noobs.com/jecko/img/wave-mid.png)`,
            }}
          ></div>
        </div>
        <div class="waveWrapperInner bgMiddle">
          <div
            class="wave waveMiddle"
            style={{
              backgroundImage: `url(http://front-end-noobs.com/jecko/img/wave-mid.png)`,
            }}
          ></div>
        </div>
        <div class="waveWrapperInner bgBottom">
          <div
            class="wave waveBottom"
            style={{
              backgroundImage: `url(http://front-end-noobs.com/jecko/img/wave-mid.png)`,
            }}
          ></div>
        </div>
      </div>
      <Switch>
        <Route path="/library">
          <Home />
        </Route>
      </Switch>
    </>
  );
};

const Page = styled.div`
  position: relative;
  z-index: 20;
  opacity: 1 !important;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  @media only screen and ${breakpoint.device.sm} {
    flex-wrap: wrap;
  }
  p {
    opacity: 1 !important;
    color: #fff;
    font-size: 2rem;
    font-weight: bold;
  }
`;
const Info = styled.div`
  margin-left: 2rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  flex-direction: column;
  @media only screen and ${breakpoint.device.sm} {
    margin-right: 2rem;
  }
  button {
    @media only screen and ${breakpoint.device.sm} {
      margin-top: 2rem;
    }
  }
`;

export default TitlePage;
