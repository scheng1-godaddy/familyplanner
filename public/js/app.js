class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: null
    }
  }
  setUser = (user) => {
    if (user) {
      console.log('Setting user', user);
      this.setState({
        user: user
      })
    } else {
      console.log('Did not set user: Invalid user data');
    }
  }
  /*====================================
    Render function
  =====================================*/
  render () {
    return (
      (this.state.user != null)
      ? <div className="App">
          <NavBar />
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
