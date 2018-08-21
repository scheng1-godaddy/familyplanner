import DatePicker from 'react-datepicker';

class AddAppt extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      startDate: moment()
    }
  }
  handleChange = (date) => {
    this.setState({
      startDate: date
    });
  }
  render() {
    return (
      <div class="modal is-active">
        <div class="modal-background"></div>
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">Modal title</p>
            <button onClick={() => this.props.toggleState('showAddApptForm')} class="delete" aria-label="close"></button>
          </header>
          <section class="modal-card-body">
            <DatePicker
                selected={this.state.startDate}
                onChange={this.handleChange}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat="LLL"
                timeCaption="time"
            />
          </section>
          <footer class="modal-card-foot">
            <button class="button is-success">Save changes</button>
            <button onClick={() => this.props.toggleState('showAddApptForm')} class="button">Cancel</button>
          </footer>
        </div>
      </div>
    )
  }
}
