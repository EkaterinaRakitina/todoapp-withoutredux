const todosReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TODO":
      console.log(action);
      return [
        ...state,
        {
          text: action.text,
          completed: false,
        },
      ];
    case "TOGGLE_TODO":
      // console.log(action.payload);
      return state.map((todo, i) => {
        if (i === action.payload.index) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      });
    default:
      return state;
  }
};

function createStore(reducer, initialState) {
  let state = initialState;
  return {
    dispatch: (action) => {
      state = reducer(state, action);
      console.log(state);
    },
    getState: () => state,
  };
}

export const store = createStore(todosReducer, []);