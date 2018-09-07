const logger = ({ dispatch, getPrevState }) => action => {
  console.log('[Redux-logger] ', action, getPrevState());
  return dispatch(action);
};
export default logger;