export const deleteItem = (index) => async (dispatch) => {
  dispatch({
    type: "REMOVE_FILM",
    payload: index,
  });
};
