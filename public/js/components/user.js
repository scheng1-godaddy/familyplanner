class User extends React.Component {
  constructor(props) {
    super(props);
  }
  /*====================================
    Display top login bar
  =====================================*/
  displayBar = () => {
    return (
      <div class="topbar">
        
      </div>
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
