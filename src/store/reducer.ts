const initialState = {
};

export const reducer = (
  state=initialState, 
  action: { 
    type: String;
    payload?: any;
  }) => {
  switch (action.type) {
    case "update_user":
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
}