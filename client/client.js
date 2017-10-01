import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from '../containers/App';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

var initialState = {
  todos: [{
    id: 0,
    completed: false,
    text: 'Learn how to use react and redux'
  }]
}

var store =  require('../redux/store')(initialState);

render(
  <Provider store={store}>
    <MuiThemeProvider>
    <App />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('app')
);
