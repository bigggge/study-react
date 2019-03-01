const logger = ({ dispatch, getPrevState }) => nextDispatch => action => {

  console.log('[redux-logger] %c prev state', 'color:gray', getPrevState());
  console.log('[redux-logger]', action);
  let next = nextDispatch(action);
  console.log('[redux-logger] %c next state', 'color:cornflowerblue', getPrevState());
  return next;
};

export default logger;

// const logger = ({ dispatch, getPrevState }) => action => {
//   console.log(action, getPrevState());
//   return dispatch(action);
// };
//
// export default logger;

