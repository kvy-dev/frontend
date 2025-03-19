const initialState = {
  notifications: []
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
    case "add_notification":
      const updatedNotifications = [action.payload, ...state.notifications];
      if (updatedNotifications.length > 10) {
        updatedNotifications.pop();
      }
      localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
      return {
        ...state,
        notifications: updatedNotifications,
      };
    default:
      return state;
  }
}