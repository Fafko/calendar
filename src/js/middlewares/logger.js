const logger = store => next => action => {

  if (process.env.NODE_ENV === 'development') {
    console.log(action);
  }

  return next(action);
};

export default logger;