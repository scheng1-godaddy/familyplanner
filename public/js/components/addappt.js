class AddAppt extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      startDate: null,
      endDate: null,
      createCategory: false
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
        <div class="field field-section">
          <label class="label is-small">
            <span class="icon is-small is-left">
              <i class="far fa-calendar-plus"></i>
            </span>Title</label>
          <div class="control">
            <input class="input is-small" type="text" placeholder="Title for appointment" />
          </div>
        </div>
        <div class="datefield field-section">
          <div class="field">
            <label class="label is-small">
              <span class="icon is-small is-left">
                <i class="far fa-clock"></i>
              </span>
              Start Date
            </label>
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
            <label class="label is-small">
              <span class="icon is-small is-left">
                <i class="far fa-clock"></i>
              </span>
              End Date
            </label>
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
        <div class="field field-section-top">
          <label class="label is-small">
            <span class="icon is-small is-left">
              <i class="far fa-folder-open"></i>
            </span>
            Category
          </label>

          {
            (!this.state.createCategory)
            ? <div class="field is-grouped">
                <p class="control is-small">
                  <span class="select is-small">
                    <select>
                      <option value="General" disabled selected>Select category</option>
                      <option>Work</option>
                      <option>Other</option>
                    </select>
                  </span>
                </p>
                <div class="form-divider"> OR </div>
                <p class="control">
                  <a class="button is-small" onClick={() => {
                      this.setState({
                        createCategory: !this.state.createCategory
                      })
                    }}>
                    Create New Category
                  </a>
                </p>
              </div>
            : <div class="field is-grouped">
                <p class="control">
                  <input class="input is-small" type="text" placeholder="New category name" />
                </p>

                <p class="control is-small">
                  <span class="select is-small">
                    <select>
                      <option value="Blue" disabled selected>Select color</option>
                      <option>Red</option>
                      <option>Green</option>
                      <option>Blue</option>
                    </select>
                  </span>
                </p>

                <p class="control">

                  <i class="far fa-check-circle icon-button yes"></i>

                </p>

                <p class="control">
                  <i class="fas fa-ban icon-button no" onClick={() => {
                      this.setState({
                        createCategory: !this.state.createCategory
                      })
                    }}></i>
                </p>
              </div>
            }
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
