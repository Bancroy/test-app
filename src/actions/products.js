import {DELETE_ITEM, UPDATE_LIST} from '../reducers/products';

export function addProduct(newProduct) {
  return (dispatch) => {
    dispatch({
      type: UPDATE_LIST,
      payload: newProduct,
    });
  };
}

export function deleteProduct(id) {
  return (dispatch) => {
    dispatch({
      type: DELETE_ITEM,
      payload: id,
    });
  };
}