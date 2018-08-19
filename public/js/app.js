class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: null
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
      : <FrontPage />
    );
  }
}

ReactDOM.render(
  <App />,
  document.querySelector('.body')
)
