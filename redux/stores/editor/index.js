// import _ from 'lodash';
import { createStore, applyMiddleware } from 'redux';
import editorReducers from '~/redux/reducers/editor';
// import { loadState, saveState } from './utils/localStorage';

const logger = (store) => (next) => (action) => {
  // console.log('dispatching', action);
  const result = next(action);
  console.log('next state', store.getState());
  return result;
};

// const persistedState = loadState();

const store = createStore(editorReducers, /* , persistedState, */ applyMiddleware(logger));

/* store.subscribe(
  _.throttle(() => {
    saveState({
      ...store.getState(),
    });
  }, 1000),
); */

export default store;
