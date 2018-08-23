class ShowAppt extends React.Component {
  constructor(props) {
    super(props)
  }
  handleEdit = () => {
    console.log('Called handle edit');
  }
  render() {
    return (
      <div class="modal is-active">
        <div class="modal-background"></div>
        <div class="modal-card">
          <header class="modal-card-head show-modal-header">
            <div className={"category "+ this.props.appt.color}>{this.props.appt.category}</div>
            <div class="modal-card-title show-modal-title">{this.props.appt.name}</div>
            <button class="delete" aria-label="close" onClick={() => this.props.closeAppt()}></button>
          </header>
          <section class="modal-card-body">
            <table class="table showtable">
              <tbody>
                <tr class="show-row">
                  <td class="show-column-title">
                    Start Date
                  </td>
                  <td class="show-column-value">
                    {moment(this.props.appt.start_datetime).format("dddd, MMMM Do YYYY, h:mm:ss a")}
                  </td>
                </tr>
                <tr>
                  <td class="show-column-title">
                    End Date
                  </td>
                  <td class="show-column-value">
                    {moment(this.props.appt.end_datetime).format("dddd, MMMM Do YYYY, h:mm:ss a")}
                  </td>
                </tr>
                <tr>
                  <td class="show-column-title">
                    Location
                  </td>
                  <td class="show-column-value">
                    {this.props.appt.location}
                  </td>
                </tr>
                <tr>
                  <td class="show-column-title">
                    Creator
                  </td>
                  <td class="show-column-value">
                    {this.props.appt.creator_name}
                  </td>
                </tr>
                <tr>
                  <td class="show-column-title">
                    Description
                  </td>
                  <td class="show-column-value">
                    {this.props.appt.description}
                  </td>
                </tr>
              </tbody>
            </table>
          </section>
          <footer class="modal-card-foot">

              <a class="button is-small icon-button">
                <span class="icon is-small">
                  <i class="fas fa-pencil-alt"></i>
                </span>
                <span>Edit</span>
              </a>
              <a class="button is-small icon-button" onClick={() => this.props.deleteAppt()}>
                <span class="icon is-small">
                  <i class="fas fa-trash-alt"></i>
                </span>
                <span>Delete</span>
              </a>

          </footer>
        </div>
      </div>
    )
  }
}
