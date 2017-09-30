import React, {Component} from 'react';
import ReactList from 'react-list';

class PromptList extends Component {
    testFunc(key,index){
      return <div key={key}>{'TEST'}</div>;
    }
    render(){
      return(
        <div>
          <div style={{overflow:'auto', maxHeight: 400}}>
          <ReactList
            itemRenderer={this.testFunc.bind(this)}
            length={250}
            type='uniform'
            />
          </div>
        </div>
      )
  }
}

module.exports = TextDisplay;
