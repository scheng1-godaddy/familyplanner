class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render () {
    return (
      <h1> Hello </h1>
    )
  }
}

ReactDOM.render(
  <App />,
  document.querySelector('.body')
)
