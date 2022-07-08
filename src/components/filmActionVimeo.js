import axios from "axios";
import baseUrl, { params, key } from "../api";
import { v4 as uuidv4 } from "uuid";
export const loadFilmsVimeo = (id) => async (dispatch) => {
  // FETCH AXIOS

  const filmData = await axios
    .get(`${baseUrl()}${id}&key=${key()}&${params()}`)
    .catch((err) => {
      console.log(err);
    });

  dispatch({
    type: "FETCH_FILM",
    payload: {
      stats: [
        filmData.data.items[0],
        new Date(),
        uuidv4(),
        { favourite: false },
      ],
    },
  });
};

export default loadFilmsVimeo;
