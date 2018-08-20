class ShowAppt extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div class="modal is-active">
        <div class="modal-background"></div>
        <div class="modal-content">
          <div class="show-appt-container">
            <h1>{this.props.appt.name}</h1>
          </div>
        </div>
        <button onClick={() => this.props.closeAppt()} class="modal-close is-large" aria-label="close"></button>
      </div>
    )
  }
}
