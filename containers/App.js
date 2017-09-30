import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../redux/actions'
import PromptList from '../components/PromptList'

var App = React.createClass({

  render: function() {
    return (
      <div>
        <PromptList/>
      </div>
    )
  }
});

var mapStateToProps = function (state) {
  return state;
};

var mapDispatchToProps = function (dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(App);
