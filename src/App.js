
import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearFilms } from "./components/filmsClear";
import styled from "styled-components";
import "./style/App.css"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import { loadFilms } from "./components/filmAction";
import { loadFilmsVimeo } from "./components/filmActionVimeo";
import getVideoId from "get-video-id";
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import ViewStreamIcon from '@mui/icons-material/ViewStream';

import Posts from "./pages/Posts";
import breakpoint from "./components/StyledComponentsBreakpoint";





function App() {
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const [statsChanged, setStatsChanged] = useState(false);
  const [filterState, setFilterState] = useState(false);
  const [displayState, setDisplayState] = useState(true);


  let { stats } = useSelector((state) => {
    if (filterState === false) {
      return state.film;
    } else if (filterState === true) {
      const stats = state.film.stats.filter(
        (item) => item[3].favourite !== false
      );

      return { stats };
    }
  });

  // Pagination
  // const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(4);

  let indexOfLastPost = currentPage * postsPerPage;
  let indexOfFirstPost = indexOfLastPost - postsPerPage;
  let currentPosts = stats.slice(indexOfFirstPost, indexOfLastPost);

  const loadFilmHandler = (id) => {
    dispatch(loadFilms(id));
  };
  const loadFilmHandlerVimeo = (id) => {
    dispatch(loadFilmsVimeo(id));
  };
  // Check that link is correct
  const checkLink = (inputedLink) => {
    // For Youtube
    inputedLink = inputedLink.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
    return inputedLink[2] !== undefined
      ? inputedLink[2].split(/[^0-9a-z_\-]/i)[0]
      : inputedLink[0];

    // Ready for Youtube and Vimeo links as well
    const { id } = getVideoId(inputedLink);
    return id;
  };

  // Adding film
  const addFilm = (e) => {
    e.preventDefault();
    // let isNum = /\d/.test(checkLink(inputRef.current.value));
    if (inputRef.current.value.length > 8) {
      if (inputRef.current.value.includes("vimeo")) {
        loadFilmHandlerVimeo(checkLink(inputRef.current.value));
      } else checkLink(inputRef.current.value);
      loadFilmHandler(checkLink(inputRef.current.value));
      inputRef.current.value = "";
    } else {
      window.alert("Zły link lub błędne id filmu");
    }

  };

  // Clear list
  const clearFilmList = (e) => {
    e.preventDefault();
    dispatch(clearFilms());
    localStorage.clear();
  };

  // Sort
  const sortAlphabetically = (e) => {
    e.preventDefault();
    console.log("sad");
    switch (e.target.value) {
      case "AZ":
        console.log("sadd");
        stats.sort((a, b) =>
          a[0].snippet.title.localeCompare(b[0].snippet.title)
        );
        break;
      case "ZA":
        stats.sort((a, b) =>
          b[0].snippet.title.localeCompare(a[0].snippet.title)
        );
        break;
      case "NewestOldest":
        stats.sort((a, b) => Date.parse(b[1]) - Date.parse(a[1]));
        break;
      case "OldestNewest":
        stats.sort((a, b) => Date.parse(a[1]) - Date.parse(b[1]));
        break;
      default:
        break;
    }
  }

  // Filter
  const filterHandler = (e) => {
    switch (e.target.value) {
      case "Ulubione":
        setFilterState(true);
        break;
      case "NieFiltruj":
        setFilterState(false);
        break;
      default:
        break;
    }

    setStatsChanged(() => {
      return !statsChanged;
    });
  };

  const displayChangeHandler = () => {
    setDisplayState(() => !displayState);
    displayState ? setPostsPerPage(8) : setPostsPerPage(4);
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
      <List>
        {stats[0] && (
          <SortFilterDisplay>
            <DisplayPick>
              {" "}
              {displayState ? (
                <FormatListBulletedIcon
                  size="3rem"
                  color="#3b3d3d"
                  onClick={displayChangeHandler}
                  className="MdList"
                >
                  {" "}
                </FormatListBulletedIcon>
              ) : (
                <ViewStreamIcon
                  size="3rem"
                  color="#3b3d3d"
                  onClick={displayChangeHandler}
                  className="MdViewStream"
                >
                  {" "}
                </ViewStreamIcon>
              )}
            </DisplayPick>
            <SortFilter>
              <Form>
                <Form.Group controlId="exampleForm.SelectCustom">
                  <Form.Label>Sortuj</Form.Label>
                  <Form.Control
                    as="select"
                    custom
                    onChange={sortAlphabetically}
                  >
                    <option value="wybierz">Wybierz</option>
                    <option value="AZ">A - Z</option>
                    <option value="ZA">Z - A</option>
                    <option value="NewestOldest"> Od najnowszych</option>
                    <option value="OldestNewest"> Od najstarszych</option>
                  </Form.Control>
                </Form.Group>
              </Form>
              <Form>
                <Form.Group controlId="exampleForm.SelectCustom">
                  <Form.Label>Filtruj</Form.Label>
                  <Form.Control as="select" custom onChange={filterHandler}>
                    <option value="NieFiltruj">Brak filtrowania</option>
                    <option value="Ulubione">Ulubione</option>
                  </Form.Control>
                </Form.Group>
              </Form>
            </SortFilter>
          </SortFilterDisplay>
        )}
        <Posts posts={currentPosts} displayState={displayState}>
          {" "}
        </Posts>
      </List>
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

const Form = styled.label`
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
const List = styled.div`
  margin-top: 5vh;
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;
// Sort and Filter container
const SortFilterDisplay = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  @media only screen and ${breakpoint.device.xs} {
    flex-direction: column;
  }
`;
const SortFilter = styled.div`
  transition: 1s all ease;

  display: flex;
  flex-direction: row;
  justify-self: flex-end;
  justify-content: flex-end;
  align-items: flex-end;
  gap: 10px;
  @media only screen and ${breakpoint.device.xs} {
    flex-direction: column;
    Form {
      width: 10rem;
      div {
        margin: 0;
      }
    }
  }
`;

const DisplayPick = styled.div`
  cursor: pointer;
  .MdList {
    transition: 0.15s all ease;
    &:hover {
      color: black !important;
    }
  }

  .MdViewStream {
    transition: 0.15s all ease;
    &:hover {
      color: black !important;
    }
  }

  border: 1px solid #3b3d3d;
  height: 3.2rem;
  display: flex;
  flex-direction: row;
  justify-self: flex-start;
  justify-content: flex-start;
  align-items: center;
  align-self: center;
  gap: 0px;
  @media only screen and ${breakpoint.device.xs} {
    flex-direction: column;
    align-self: flex-end;
    justify-self: end;
  }
`;
export default App;
