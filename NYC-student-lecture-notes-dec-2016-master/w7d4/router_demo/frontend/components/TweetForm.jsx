import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createTweet } from '../actions/tweet_actions';
import { Link, withRouter } from 'react-router';

class TweetForm extends Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = { content: '' };
  }

  handleChange(e) {
    this.setState({ content: e.currentTarget.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.createTweet(this.state).then(() => {
      this.props.router.push('/tweets');
    });
  }

  render() {
    return (
      <section>
        <Link to='/tweets'>Tweets Index</Link>
        <h3>New Tweet</h3>
        <form onSubmit={ this.handleSubmit }>
          <input onChange={ this.handleChange } value={ this.state.content }/>
          <button>Post Tweet</button>
        </form>
      </section>
    );
  }

}

function mapDispatchToProps(dispatch) {
  return { createTweet: (tweet) => dispatch(createTweet(tweet)) };
}

export default connect(null, mapDispatchToProps)(withRouter(TweetForm));
