const INITIAL_STATE = {
  list: [],
};

export const DELETE_ITEM = 'DELETE_ITEM';
export const UPDATE_LIST = 'UPDATE_LIST';

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case DELETE_ITEM:
      return {
        ...state,
        list: state.list.filter(product => product.id !== action.payload),
      };

    case UPDATE_LIST:
      return {
        ...state,
        list: state.list.concat([action.payload]),
      };

    default:
      return state;
  }
};

export default reducer;