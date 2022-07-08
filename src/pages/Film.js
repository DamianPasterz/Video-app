import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { addFavourite } from "../components/filmFavourite";
import {
  faThumbsUp,
  faEye,
  faTrashAlt,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { faStar as farFaStar } from "@fortawesome/free-regular-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { deleteItem } from "../components/filmDelete";
import { Modal, Button } from "react-bootstrap";
import YoutubeEmbed from "../components/YoutubeEmbed";
// import "../style/_modal.css";
import breakpoint from "../components/StyledComponentsBreakpoint";
const Film = ({ info, id }) => {
  const [star, setStar] = useState(false);
  const [show, setShow] = useState(false);

  const correctDate = () => {
    const formatedDate = info[1].toLocaleString();
    if (formatedDate.includes(",")) {
      let d, d1, m;
      var readyDate = formatedDate.replace(/\./g, "-");
      readyDate = readyDate.slice(0, readyDate.indexOf(","));
      [d, d1, m] = readyDate.split("-");
      const dateStr = [m, d1, d].join("-");
      return dateStr;
    }
    return formatedDate.slice(0, formatedDate.indexOf("T"));
  };
  const { stats } = useSelector((state) => state.film);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch();
  const deleteHandler = () => {
    dispatch(deleteItem(id));
  };
  const addFavouriteHandler = () => {
    const index = stats.indexOf(info);
    dispatch(addFavourite(index));
  };
  return (
    <StyledFilm>
      <h1> {info[0] && info[0].snippet.title} </h1>
      <h4>{correctDate()} </h4>
      <Trash>
        {" "}
        <FontAwesomeIcon
          icon={faTrashAlt}
          size="2x"
          onClick={deleteHandler}
          color="#F55338"
        >
          {" "}
        </FontAwesomeIcon>{" "}
      </Trash>
      <Star>
        {" "}
        <FontAwesomeIcon
          icon={info[3] && info[3].favourite ? faStar : farFaStar}
          size="2x"
          color="#F5E351"
          onClick={() => {
            setStar(!star);
            addFavouriteHandler();
          }}
        >
          {" "}
        </FontAwesomeIcon>{" "}
      </Star>
      <Stats>
        <p>
          {" "}
          <FontAwesomeIcon icon={faEye}> </FontAwesomeIcon>{" "}
          {info[0] && info[0].statistics.viewCount}{" "}
        </p>
        <p>
          {" "}
          <FontAwesomeIcon icon={faThumbsUp}> </FontAwesomeIcon>{" "}
          {info[0] && info[0].statistics.likeCount}
        </p>
      </Stats>
      {info[0] && (
        <Thumbnail
          src={
            info[0] && info[0].snippet.thumbnails.maxres === undefined
              ? info[0].snippet.thumbnails.high.url
              : info[0].snippet.thumbnails.maxres.url
          }
          alt="thumbnail"
          onClick={handleShow}
        />
      )}

      <Modal
        show={show}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        dialogClassName="custom-dialog"
      >
        <Modal.Header closeButton>
          <Modal.Title>{info[0] && info[0].snippet.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex justify-content-center">
          <YoutubeEmbed embedId={info[0] && info[0].id}> </YoutubeEmbed>{" "}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Zamknij
          </Button>
        </Modal.Footer>
      </Modal>
    </StyledFilm>
  );
};

const StyledFilm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  box-shadow: 0px 5px 30px rgba(0, 0, 0, 0.2);
  height: 60vh;
  width: 60vw;
  border-radius: 3%;
  overflow: hidden;
  position: relative;
  h1 {
    margin: 1rem 0rem 0.5rem 0rem !important;
    width: 75%;

    @media only screen and ${breakpoint.device.sm} {
      font-size: 1.5rem;
    }
  }
  @media only screen and ${breakpoint.device.lg} {
    width: 80vw;
  }
`;
const Thumbnail = styled.img`
  width: 100%;
  height: 60%;
  align-self: flex-end;
  justify-self: flex-end;
  object-fit: cover;
  margin-top: auto;
  cursor: pointer;
`;

const Stats = styled.div`
  display: flex;
  gap: 10px;
`;
const Trash = styled.div`
  position: absolute;
  top: 5%;
  right: 5%;
  cursor: pointer;
`;
const Star = styled.div`
  position: absolute;
  top: 5%;
  left: 5%;
  cursor: pointer;
`;

export default Film;
