var React = require('react');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var ClientActions = require('../actions/client_actions');
var hashHistory = require('react-router').hashHistory;

var BenchForm = React.createClass({
  mixins: [LinkedStateMixin],
  getInitialState: function(){
    return {
      description: "",
      seating: 2
    };
  },
  handleSubmit: function(event){
    event.preventDefault();
    var bench = Object.assign({}, this.state, this._coords());
    ClientActions.createBench(bench);
    this.navigateToSearch();
  },
  navigateToSearch: function(){
    hashHistory.push("/");
  },
  handleCancel: function(event){
    event.preventDefault();
    this.navigateToSearch();
  },
  _coords: function(){
    return this.props.location.query;
  },
  render: function(){
    var lat = this._coords().lat, lng = this._coords().lng;
    return (
        <div>
          <h3>Create A Bench!</h3>
          <form onSubmit={this.handleSubmit}>
            <label>Description</label>
            <input type="text" valueLink={this.linkState('description')}/>
            <br/>
            <label>Number of Seats</label>
            <input min='0' type="number" valueLink={this.linkState('seating')}/>
            <br/>
            <label>Latitude</label>
            <input type="text" disabled value={lat}/>
            <br/>
            <label>Longitude</label>
            <input type="text" disabled value={lng}/>
            <br/>
            <input type="submit" value="create bench"/>
          </form>
          <button onClick={this.handleCancel}>Cancel</button>
        </div>
    );
  }
});

module.exports = BenchForm;
