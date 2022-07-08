export const addFavourite = (id) => async (dispatch) => {
  dispatch({
    type: "ADD_FAVOURITE",
    payload: id,
  });
};
