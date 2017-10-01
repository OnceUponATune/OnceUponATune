import React, {Component} from 'react';
import ReactList from 'react-list';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

class PromptList extends Component {
  constructor(props){
    super(props);
    this.state = {
      prompts : [],
      count: 0
    }
  }
    testFunc(key,index){
      return <div key={key}
                style={{
                  marginTop: 10,
                  marginBottom: 10,
                  width: 800
                }}
              className={"container"}>
        <Card>
          <CardHeader style={{textAlign: "left"}}
            title={"Short Story"}
            />
        <CardText style={{fontSize: 16}}>
            The Stories Prompts will be here.
          </CardText>
        </Card>
      </div>;
    }
    render(){
      return(
        <div>
          <div style={{textAlign: "center", fontSize: "40"}}>
            /r/WritingPrompts
          </div>
          <div
            style=
            {{
              overflow:'auto',
              textAlign: "center",
              marginTop: 25
            }} >
          <ReactList
            itemRenderer={this.testFunc.bind(this)}
            length={10}
            type='uniform'
            style={{borderStyle: "solid"}}
            />
          </div>
        </div>
      )
  }
}

module.exports = PromptList;
