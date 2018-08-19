class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {
        message: "User exists",
        status: 200,
        data: {
          email: "shawnc8160@gmail.com",
          id: 3,
          password: "$2b$10$zmfG3YdDNSjG9ptDvLo/C.8L5hY9Lfll1ulQlMU1LYuGocHO2fsa6",
          username: "shawnc"
        }
      }
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
                <span className="icon">date_range</span>
                <span>
                  Family<b>Planner</b>
                </span>
              </div>
            </header>
          <main>
            <Calendar />
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
