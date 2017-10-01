import React, {Component} from 'react';
import ReactList from 'react-list';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

class PromptList extends Component {
  constructor(props){
    super(props);
    console.log(props)
    this.state = {
      count: 0
    }
  }
  checkStory(){
     
  }
  testFunc(key,index){
     console.log(this.state)
     return <div key={key}
                 style={{
                    marginTop: 10,
                    marginBottom: 10,
                    width: 800
                  }}
                  className={"container"}>
              <Card>
              <CardHeader style={{textAlign: "left"}} title={"Short Story"}/>
              <CardText style={{fontSize: 16}}>
                  {this.props.data[index]}
              </CardText>
              </Card>
              <button onClick={this.checkStory.bind(this)}>Semantic Analysis</button>
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
            length={this.props.data.length}
            type='uniform'
            style={{borderStyle: "solid"}}
            />
          </div>
        </div>
      )
  }
}

module.exports = PromptList;
