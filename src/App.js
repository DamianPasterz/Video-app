
import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import "./style/App.css"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';




function App() {
  // const dispatch = useDispatch();
  const inputRef = useRef(null);


  // Adding film
  const addFilm = (e) => {
    e.preventDefault();

  };

  // Clear list
  const clearFilmList = (e) => {
    e.preventDefault();
    // dispatch()
    localStorage.clear();
  };


  return (
    <MainForm>
      <Label>
        <h3> Enter a link or ID to the video </h3>
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
const Button = styled.button`
  background: blue;
  border-radius: 3px;
  border: 2px solid palevioletred;
  color: red;
  margin: 0 1em;
  padding: 0.25em 1em;
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
