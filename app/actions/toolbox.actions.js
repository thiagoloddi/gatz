export const SELECT_ITEM = 'SELECT_ITEM';

export const selectItemAction = item => {
  return {
    type: SELECT_ITEM,
    payload: item
  };
};