class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {
        status: 201,
        message: "Session Created",
        data: {
          email: "shawnc8160@gmail.com",
          family_id: 1,
          family_name: "Cheng Family",
          id: 1,
          name: "Shawn",
          password: "$2b$10$O.RScnErnvR8gVqBu/mKmeyuvBJreA6FjnWe6ln1o2hdMKDClkeBK"
        }
      },
      schedule: [],
      showAppt: false,
      showAddApptForm: false,
      selectedAppt: null,
      selectedIndex: null
    }
  }
  /*====================================
    Things to do during load
  =====================================*/
  componentDidMount() {
    (this.state.user && this.state.user.data) ? this.getSchedule() : this.checkSession();
  }
  /*=======================
  Toggles any of the booleans in state
  =======================*/
  toggleState = (...st) => {
    console.log('Toggle State called');
    let toUpdate = {}
    for (let key of st) {
      toUpdate[key] = !this.state[key]
    }
    this.setState(toUpdate)
  }
  /*====================================
   Check server for active user session
  =====================================*/
  checkSession = () => {
    fetch('/sessions')
      .then(response => response.json())
      .then(responseJson => {this.setUser(responseJson); this.getSchedule();})
      .catch(error => {
      console.log(error);
    })
  }
  /*====================================
    Gets all scheduled appts based family id
  =====================================*/
  getSchedule = () => {
    console.log('Getting schedule');
    fetch('/appointments/family/' + this.state.user.data.family_id)
      .then(response => response.json())
      .then(responseJson => {
        console.log('Got schedule', responseJson);
        this.setState({
          schedule: responseJson.data
        })
      })
      .catch(error => {
      console.log(error);
    })
  }
  /*====================================
    Sets the current user
  =====================================*/
  setUser = (user) => {
    console.log('Setting user', user);
    this.setState({
      user: user
    })
  }
  /*====================================
    Displays appointment selected
  =====================================*/
  displayAppt = (appt, index) => {
    this.setState({
      selectedAppt: appt,
      selectedIndex: index,
      showAppt: true
    })
  }
  /*====================================
    Close appointment selected
  =====================================*/
  closeAppt = () => {
    this.setState({
      selectedAppt: null,
      selectedIndex: null,
      showAppt: false
    })
  }
  /*====================================
    Displays controls for calendar
  =====================================*/
  addAppt = (appt) => {
    console.log('Calling add appointment');
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
                  <b>{this.state.user.data.family_name.toUpperCase()}</b>
                </span>
              </div>
            </header>
          <main>
            {
              (this.state.showAppt)
              ? <ShowAppt
              appt={this.state.selectedAppt}
              closeAppt={this.closeAppt}/>
              : null
            }
            {
              (this.state.showAddApptForm)
              ? <AddAppt
                toggleState={this.toggleState}/>
              : null
            }
            <Calendar
              user={this.state.user}
              schedule={this.state.schedule}
              displayAppt={this.displayAppt}
              addAppt={this.addAppt}
              toggleState={this.toggleState}
              />
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
