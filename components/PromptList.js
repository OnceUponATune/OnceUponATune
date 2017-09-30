import React, {Component} from 'react';
import ReactList from 'react-list';

class PromptList extends Component {
  constructor(props){
    super(props);
    this.state = {
      prompts : []
    }

  }
    testFunc(key,index){
      return <div key={key}>{'TEST1'}</div>;
    }
    render(){
      return(
        <div>
          <div style={{overflow:'auto', maxHeight: 400}}>
          <ReactList
            itemRenderer={this.testFunc.bind(this)}
            length={25}
            type='uniform'
            />
          </div>
        </div>
      )
  }
}

module.exports = PromptList;
