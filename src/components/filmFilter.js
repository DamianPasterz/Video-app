export const filterFilm = (status) => async (dispatch) => {
  dispatch({
    type: "FILTER_FILM",
    payload: status,
  });
};
