class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navActive: false
    }
  }
  /*====================================
    Display logo and define hamburger
  =====================================*/
  displayLogo = () => {
    return (
      <div class="navbar-brand">
        <a class="navbar-item" href="/">
          <div id="logo">
            <span className="icon">date_range</span>
            <span>
              Family<b>Planner</b>
            </span>
          </div>
        </a>
        <div class="navbar-burger burger" data-target="main-navigation" onClick={() => {
            this.setState({
              navActive: !this.state.navActive
            })
          }}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    )
  }
  /*====================================
    Display the dropdown
  =====================================*/
  displayDropdown = () => {
    return (
      <div id="main-navigation" className={(this.state.navActive) ? "navbar-menu is-active" : "navbar-menu"}>
        <div class="navbar-end">
          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link login">
              Username
            </a>
              <div class="navbar-dropdown">
                <a class="navbar-item" onClick={()=> this.props.toggleState('displayEditProfile')}>Edit Profile</a>
                <a class="navbar-item" onClick={()=> this.props.logOut()}>Logout</a>
              </div>
          </div>
        </div>
      </div>
    )
  }
  /*====================================
    Displays the Edit form
  =====================================*/
  displayEdit = () => {

  }
  /*====================================
    Render Function
  =====================================*/
  render() {
    return (
      <nav class="navbar is-light" role="navigation" aria-label="main navigation">
        {this.displayLogo()}
        {this.displayDropdown()}
      </nav>
    )
  }
}
