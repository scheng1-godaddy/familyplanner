class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render () {
    return (
      <div className="App">
        <header>
          <div id="logo">
            <span className="icon">date_range</span>
            <span>
              Family<b>Planner</b>
            </span>
          </div>
        </header>
        <main>
          <User />
          <Calendar />
        </main>
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.querySelector('.body')
)
