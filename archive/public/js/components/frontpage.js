class FrontPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
  }
  /*=======================
  This method sets state to whatever user typed in form
  =======================*/
  handleChange = (event) => {
    this.setState({[event.target.id]: event.target.value})
  }
  /*=======================
  Handles submit action from login form
  =======================*/
  handleSubmit = (event) => {
    event.preventDefault();
    // Format the login information
    let loginData = {
      email: this.state.email,
      password: this.state.password
    }
    console.log('login information is: ', JSON.stringify(loginData));
    fetch('/sessions', {
      body: JSON.stringify(loginData),
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    })
      .then(sessionData => {
        return sessionData.json()
      })
      .then(sessionDataJson => {
        console.log('Session info', sessionDataJson);
        this.props.setUser(sessionDataJson)
      })
      .catch(error => console.log(error))
      }
  /*====================================
    Displays the Edit form
  =====================================*/
  displayLogin = () => {
    return (
      <form class="form login-form-container" onSubmit={this.handleSubmit}>
        <div class="field">
          <div class="control has-icons-left">
            <input class="input is-small" type="email" placeholder="Email" onChange={this.handleChange} value={this.state.email} id='email'/>
            <span class="icon is-small is-left">
              <i class="fas fa-envelope"></i>
            </span>
          </div>
        </div>
        <div class="field">
          <p class="control has-icons-left">
            <input class="input is-small" type="password" placeholder="Password" onChange={this.handleChange} value={this.state.password} id='password'/>
            <span class="icon is-small is-left">
              <i class="fas fa-key"></i>
            </span>
          </p>
        </div>
        <div class='field is-grouped is-grouped-right'>
          <p class="control">
            <input class="button submit-button is-small is-outlined" type="submit"/>
          </p>
        </div>
      </form>
    )

  }
  /*====================================
    Render Function
  =====================================*/
  render() {
    return (
      <div class="frontpage-container">
        <div class="frontpage-logo-container">
          <div class="front-icon"><i class="far fa-calendar-alt"></i></div>
          <div class="front-logo"> Family<b>Planner</b> </div>
        </div>
        {this.displayLogin()}
        <div>
          <p> Please login with: </p>
          <p> email: <b> test@test.com </b> </p>
          <p> password:<b> test </b></p>
        </div>
      </div>
    )
  }
}
