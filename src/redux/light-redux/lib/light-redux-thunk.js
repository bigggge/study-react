const thunk = ({ dispatch, getPrevState }) => nextDispatch => action => {
  if (typeof action === 'function') {
    return action(dispatch, getPrevState);
  }

  return nextDispatch(action);
};

export default thunk;
