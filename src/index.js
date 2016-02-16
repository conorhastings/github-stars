import React, { Component } from 'react';
import { render } from 'react-dom';
import request from 'axios';

class Stars extends React.Component {
  constructor() {
    super();
    this.state = {
      repos: [],
      starCount: 0
    };
  }

  fetchRepoPage(user, page) {
     request.get(`https://api.github.com/users/${user}/repos?page=${page}`).then(res => {
      return res;
     });
  }

  componentDidMount() {
    let new
  }

  // componentWillReceiveProps() {

  // }

  render() {
    return <span>hello</span>;
  }
}

class App extends Component {
	constructor() {
		super();
		this.state = {
			userInput: "",
      user: ""
		};
	}

  render() {
    let star;
    if (this.state.user) {
      star = <Stars user={this.state.user} />
    }
    return(
      <div>
        <input type='text'
          value={this.state.userInput}
          onChange={({target: {value}}) => this.setState({userInput: value})} 
          onKeyDown={(e) => {
            if (e.keyCode === 13) {
              this.setState({
                user: this.state.userInput
              });
            }
          }}
          placeholder='conorhastings'
        />
        {star}
      </div>
    );
  }
}

render(<App />, document.getElementById('app'));
