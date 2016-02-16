import React, { Component } from 'react';
import { render } from 'react-dom';
import request from 'axios';
import parse from 'parse-link-header';

const filterForks = (repos) => repos.filter(repo => !repo.fork);

class Stars extends React.Component {
  constructor() {
    super();
    this.state = {
      starCount: 0,
      repos: [],
      loaded: false
    };
  }

  fetchRepos(user, page, curr = []) {
     request.get(`https://api.github.com/users/${user}/repos?page=${page}`).then(res => {
      const repos = curr.concat(filterForks(res.data));
      const linkHeader = res.headers.link && parse(res.headers.link);
      if (linkHeader && linkHeader.next) {
        this.fetchRepos(user, linkHeader.next.page, repos);
      }
      else {
        const starCount = repos.reduce((count, repo) => count += repo.stargazers_count, 0);
        this.setState({
          starCount,
          repos,
          loaded: true
        })
      }
     });
  }

  componentDidMount() {
    this.fetchRepos(this.props.user, 1);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.user !== nextProps.user) {
      this.fetchRepos(nextProps.user, 1);
    }
  }

  render() {
    if (!this.state.loaded) {
      return null;
    }
    return (
      <div style={{fontSize: 56, fontWeight: 600}}>
        {this.state.starCount}
        <svg aria-hidden="true" height="48" role="img" version="1.1" viewBox="0 0 14 16" width="42">
          <path d="M14 6l-4.9-0.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14l4.33-2.33 4.33 2.33L10.4 9.26 14 6z"></path>
        </svg>
      </div>
    );
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
    const style = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      fontFamily: `'Helvetica Neue', Helvetica, Arial, sans-serif`,
      flexDirection: 'column'
    };
    const inputStyle = {
      width: '40vw',
      height: '15vh',
      fontSize: '4vw',
      textAlign: 'center',
      fontWeight: 300
    };
    return(
      <div style={style}>
        <h1 style={{fontSize: 56}}>enter github user name</h1>
        <input 
          type='text'
          style={inputStyle}
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
