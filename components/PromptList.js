import React, {Component} from 'react';
import ReactList from 'react-list';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

class PromptList extends Component {
  constructor(props){
    super(props);
    console.log(props)
    this.state = {
      analysis:'',
      story:'',
      count: 0
    }
  }
  checkStory(event){
     console.log(event)
     console.log(event.target.value)
     var data = new FormData();
     data.append( "json", JSON.stringify( event.target.value ) );
   //   console.log(data)
     fetch('http://localhost:3000/getStory',{
      method:'post',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: "json="+JSON.stringify({a: 7, str: event.target.value}),
      query: "json="+JSON.stringify({a: 7, str: event.target.value})
      })
     .then((res)=>{
        console.log(res)
        if(res.ok){
           return res.json()
        }
     }).then(res=>{
        console.log(res)
        this.setState({
           analysis: res[0].conn,
           story: res[0].story
        })
     })
  }
  testFunc(key,index){
   //   console.log(this.state)
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
                  {this.props.data[index].prompt}
              </CardText>
              </Card>
                 <button type="button" value={this.props.data[index].id} onClick={this.checkStory.bind(this)}>Semantic Analysis</button>
              </div>;

   }
    render(){
      return(
        <div>
          <div style={{textAlign: "center", fontSize: "40"}}>
            /r/WritingPrompts
          </div>
          <div>
            <div>{this.state.analysis}</div>
            <div>{this.state.story}</div>
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
