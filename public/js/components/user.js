class User extends React.Component {
  constructor(props) {
    super(props);
  }
  /*====================================
    Display top login bar
  =====================================*/
  displayBar = () => {
    return (
      <nav class="navbar is-light" role="navigation" aria-label="main navigation">
        <div class="navbar-end">
          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link login">
              {(this.props.user != null) ? this.props.user.username : "Not Logged In"}
            </a>
              {
                (this.props.user != null)
                ? <div class="navbar-dropdown">
                    <a class="navbar-item" onClick={()=> this.props.toggleState('displayEditProfile')}>Edit Profile</a>
                    <a class="navbar-item" onClick={()=> this.props.logOut()}>Logout</a>
                  </div>
                : <div class="navbar-dropdown">
                    <a class="navbar-item" onClick={()=> this.props.toggleState('displayLogin')}>Login</a>
                    <a class="navbar-item" onClick={()=> this.props.toggleState('displayRegister')}>Sign Up</a>
                  </div>
              }
          </div>
        </div>
      </nav>
    )
  }
  /*====================================
    Displays the Register form
  =====================================*/
  displayRegister = () => {

  }
  /*====================================
    Displays the Login form
  =====================================*/
  displayLogin = () => {

  }
  /*====================================
    Render Function
  =====================================*/
  render() {
    return (
      <div classname="user">
        {this.displayBar()}
        {this.displayRegister()}
        {this.displayLogin()}
      </div>
    )
  }
}
