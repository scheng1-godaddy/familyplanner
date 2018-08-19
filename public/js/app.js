class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: null
    }
  }
  componentDidMount() {
    (this.state.user && this.state.user.data) ? null : this.checkSession();
  }
  checkSession = () => {
    fetch('/sessions')
      .then(response => response.json())
      .then(responseJson => this.setUser(responseJson))
      .catch(error => {
      console.log(error);
    })
  }
  setUser = (user) => {
    console.log('Setting user', user);
    this.setState({
      user: user
    })
  }
  /*====================================
    Render function
  =====================================*/
  render () {
    return (
      (this.state.user && this.state.user.data)
      ? <div className="App">
          <NavBar user={this.state.user} setUser={this.setUser}/>
            <header>
              <div id="logo">
                <span>
                  {this.state.user.data.family_name}
                </span>
              </div>
            </header>
          <main>
            <Calendar user={this.state.user}/>
          </main>
        </div>
      : <FrontPage setUser={this.setUser}/>
    );
  }
}

ReactDOM.render(
  <App />,
  document.querySelector('.body')
)
