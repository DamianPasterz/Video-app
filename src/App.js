
import React, { useState, useRef } from "react";
import styled from "styled-components";
import "./style/App.css"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';

function App() {
  return (
    <MainForm>
      <Label>
        <h3> Podaj link lub id filmu: </h3>
        <ClearAndImport>
          <SearchBar>
            {" "}
            <input ref={inputRef} className="link" type="text" />{" "}
            <button onClick={addFilm} className="roundedSearch">
              <SearchIcon />
            </button>
          </SearchBar>

          <Button variant="outline-danger" onClick={clearFilmList}>
            Wyczyść listę
          </Button>{" "}
        </ClearAndImport>
      </Label>
    </MainForm>
  )
}
const MainForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-items: center;
  gap: 10px;
  Form {
    align-self: flex-end;
  }
`;
const Label = styled.label`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SearchBar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
`;
const ClearAndImport = styled.div`
  display: flex;
  flex-direction: column;

  Button {
    align-self: flex-start;
    margin: 5px 0px;
  }
`;

export default App;
