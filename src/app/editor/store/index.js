import { createStore, applyMiddleware } from 'redux';
import editorReducers from '../reducers';

const logger = (store) => (next) => (action) => {
  console.log('dispatching', action);
  const result = next(action);
  console.log('next state', store.getState());
  return result;
};

const store = createStore(editorReducers, applyMiddleware(logger));

export default store;
