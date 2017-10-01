import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../redux/actions'
import PromptList from '../components/PromptList'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


var App = React.createClass({
   getInitialState: function() {
     return { data: null };
   },

   componentDidMount: function() {
      fetch('http://localhost:3000/getPrompts',{method:'GET'})
      .then(res=>{
         if(res.ok){
            return res.json()
         }
      })
      .then(res=>{
         console.log(res)
         this.setState({
            data: res
         })
      })
   },

   render: function() {
     if (this.state.data) {
       return <PromptList data={this.state.data} />;
     }

     return <div>Loading...</div>;
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
