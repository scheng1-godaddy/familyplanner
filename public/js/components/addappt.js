class AddAppt extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      startDate: null,
      endDate: null
    }
  }
  handleChange = (date) => {
    this.setState({
      startDate: date
    });
  }
  renderForm = () => {
    return (
      <div class="form">
        <div class="field">
          <label class="label is-small">Title</label>
          <div class="control has-icons-left has-icons-right">
            <input class="input is-small" type="email" placeholder="Normal" />
            <span class="icon is-small is-left">
              <i class="far fa-calendar-plus"></i>
            </span>
          </div>
        </div>
        <div class="datefield">
          <div class="field">
            <label class="label is-small">Start Date</label>
            <DatePicker
              className="date"
              placeholderText="Start Date and Time"
              selected={this.state.startDate}
              onChange={this.handleChange}
              minDate={moment()}
              minTime={moment()}
              maxTime={moment().endOf("day")}
              showTimeSelect
              timeFormat="h:mm a"
              timeIntervals={15}
              dateFormat="LLL"
              timeCaption="time"
            />
          </div>
          <div class="field">
            <label class="label is-small">End Date</label>
            <DatePicker
              className="date"
              placeholderText="End Date and Time"
              selected={this.state.endDate}
              onChange={this.handleChange}
              minDate={moment()}
              minTime={moment()}
              maxTime={moment().endOf("day")}
              showTimeSelect
              timeFormat="h:mm a"
              timeIntervals={15}
              dateFormat="LLL"
              timeCaption="time"
            />
          </div>
        </div>
        <div class="field">
          <label class="label is-small">Choose Category</label>
          <p class="control is-small">
            <span class="select is-small">
              <select>
                <option>Category1</option>
                <option>Category2</option>
                <option>Category3</option>
              </select>
            </span>
          </p>
          <p class="control">
            <a class="button is-small">
              Create New Category
            </a>
          </p>
        </div>

      </div>
    )
  }
  render() {
    return (
      <div class="modal is-active">
        <div class="modal-background"></div>
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">Create new entry</p>
            <button onClick={() => this.props.toggleState('showAddApptForm')} class="delete" aria-label="close"></button>
          </header>
          <section class="modal-card-body">
            <div class="add-appt-body">
              {this.renderForm()}
            </div>
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
