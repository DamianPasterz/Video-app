const initState = {
  stats: [],
};

const filmReducer = (state = initState, action) => {
  switch (action.type) {
    case "FETCH_FILM":
      return {
        ...state,
        stats: [...state.stats, action.payload.stats],
      };
    case "REMOVE_FILM": {
      return {
        ...state,
        stats: state.stats.filter((item, index) => item[2] !== action.payload),
      };
    }
    case "CLEAR_FILMS": {
      return { stats: [] };
    }
    case "ADD_FAVOURITE": {
      const current = [...state.stats];
      current[action.payload][3].favourite = !current[action.payload][3]
        .favourite;
      return {
        ...state,
        stats: [...current],
      };
    }
    case "FILTER_FILM": {
      const newState = [...state.stats];
      const stateCopy = [];
      console.log(action.payload);
      if (action.payload === "filter") {
        console.log(newState[1][3].favourite);
        const stateCopy = newState.filter(
          (item) => item[3].favourite !== false
        );
        console.log(stateCopy);
        return {
          ...state,
          stats: [...stateCopy],
        };
      } else if ((action.payload = "noFilter")) {
        let statsCopy = [...state.stats];
        return {
          ...state,
          stats: [...statsCopy],
        };
      }
      console.log(stateCopy);
      return {
        ...state,
        stats: [...stateCopy],
      };
    }
    default:
      return { ...state };
  }
};

export default filmReducer;
