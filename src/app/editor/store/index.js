import { createStore } from 'redux';
import editorReducers from '../reducers';

const store = createStore(editorReducers);

export default store;
