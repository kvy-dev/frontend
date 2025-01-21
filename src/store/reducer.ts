const initialState = {
};

export const reducer = (
  state=initialState, 
  action: { 
    type: String;
    payload?: any;
  }) => {
  switch (action.type) {
    default:
      return state;
  }
}