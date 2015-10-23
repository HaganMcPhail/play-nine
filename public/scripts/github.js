var Card = React.createClass({
  getInitialState: function () {
    return {user: this.props.login, userObject: this.props.login};
  },
  componentDidMount: function () {
    var component = this;
    $.get("https:/api.github.com/users/" + this.props.login, function(data) {
      component.setState(data);
    })
  },
  handleClick: function () {
    var userObject = this;
    this.setState({ user: this.props.login, userObject: this.props.login });
    $.get("https:/api.github.com/users/" + this.state.user, function(data) {
      userObject.setState(data);
    })
    // console.log(userObject.state.email);
  },
  render: function () {
    return (
      <div onClick={this.handleClick}>
        <img src={this.state.avatar_url} width="80"  />
        <h3>{this.state.name}</h3>
        <hr/>
      </div>
    )
  }
});

var Form = React.createClass({
  handleSubmit: function (e) {
    e.preventDefault();
    var loginInput = ReactDOM.findDOMNode(this.refs.login);
    this.props.addCard(loginInput.value);
    loginInput.value = '';
  },
  render: function () {
    return (
      <div>
        <div className="row">
          <div className="col-xs-12">
            <form onSubmit= {this.handleSubmit}>
              <input placeholder="username" ref="login" />
              <button>Add</button>
            </form>
          </div>
        </div>
        <div className="row">
          <br />
        </div>
      </div>
    )
  }
});

var Grid = React.createClass({
  render: function () {
    return (
      <div className="col-md-8 right-side">
        <div className="row">
          <div className="col-xs-12"></div>
          <div className="col-md-6"></div>
          <div className="col-md-6"></div>
        </div>
      </div>
    )
  }
});

var Main = React.createClass({
  getInitialState: function () {
    return {logins: ['haganmcphail', 'emb0624', 'bardoloi', 'spicyj', 'cjlaw', 'haganmcphail', 'emb0624', 
                     'bardoloi', 'spicyj', 'cjlaw', 'haganmcphail', 'emb0624', 'bardoloi', 'spicyj', 'cjlaw'],
            };
  },
  addCard: function (loginToAdd) {
    this.setState({logins: this.state.logins.concat(loginToAdd)});
  },
  showDetails: function (loginToAdd) {
    this.setState({logins: this.state.logins.concat(loginToAdd)});
  },
  render: function () {
    var cards = this.state.logins.map(function(login){
      return (
        <Card login={login} />
      )
    });
    return (
      <div>
        <Form addCard={this.addCard} />
        <div className="row">
          <div className="col-md-4 left-side">
            {cards}
          </div>
          <Grid showDetails={this.showDetails}/>
        </div>
      </div>
    )
  }
});

ReactDOM.render(<Main />, document.getElementById('content'));