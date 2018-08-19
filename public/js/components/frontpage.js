class FrontPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
  }
  /*====================================
    Displays the Edit form
  =====================================*/
  displayLogin = () => {
    return (
      <form class="form" onSubmit={this.handleSubmit}>
        <h1 class="title"> Login </h1>
        <div class="field">
          <div class="field-body">
            <div class="field">
              <p class="control is-expanded has-icons-left">
                <input class="input" type="email" placeholder="Email" onChange={this.handleChange} value={this.state.email} id='email'/>
                <span class="icon is-small is-left">
                  <i class="fas fa-envelope"></i>
                </span>
              </p>
            </div>
            <div class="field">
              <p class="control is-expanded has-icons-left">
                <input class="input is-success" type="password" placeholder="Password" onChange={this.handleChange} value={this.state.password} id='password'/>
                <span class="icon is-small is-left">
                  <i class="fas fa-key"></i>
                </span>
              </p>
            </div>
          </div>
        </div>
          <div class='field is-grouped is-grouped-right'>
            <p class="control">
              <input class="button is-success" type="submit"/>
              <button onClick={()=> this.props.toggleState('displayLogin')} class="button is-danger">Cancel</button>
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
      <div>
        <div id="logo">
          <span className="icon">date_range</span>
          <span>
            Family<b>Planner</b>
          </span>
        </div>
        {this.displayLogin()}
      </div>
    )
  }
}
