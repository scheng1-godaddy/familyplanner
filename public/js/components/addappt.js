class AddAppt extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      apptTitle: null,
      apptStartDate: null,
      apptEndDate: null,
      apptLocation: null,
      apptCategory: null,
      apptDescription: null,
      createCategory: false,
      newAppt: {}
    }
  }
  /*=======================
  This method sets state to whatever user typed in form
  =======================*/
  handleChange = (event) => {
    this.setState({[event.target.id]: event.target.value})
  }
  /*=======================
  This method sets state to whatever user entered in start date picker
  =======================*/
  handleChangeStart = (date) => {
    this.setState({
      apptStartDate: date
    });
  }
  /*=======================
  This method sets state to whatever user entered in end date picker
  =======================*/
  handleChangeEnd = (date) => {
    this.setState({
      apptEndDate: date
    });
  }
  /*=======================
  Render function
  =======================*/
  renderForm = () => {
    return (
      <div class="form">
        <div class="field field-section">
          <label class="label is-small">
            <span class="icon is-small is-left">
              <i class="far fa-calendar-plus"></i>
            </span>Title</label>
          <div class="control">
            <input id="apptTitle" onChange={this.handleChange} value={this.state.apptTitle} class="input is-small" type="text" placeholder="Title for appointment" />
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
              selected={this.state.apptStartDate}
              onChange={this.handleChangeStart}
              minDate={moment()}
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
              selected={this.state.apptEndDate}
              onChange={this.handleChangeEnd}
              minDate={(this.state.apptStartDate != null) ? this.state.apptStartDate : moment()}
              showTimeSelect
              timeFormat="h:mm a"
              timeIntervals={15}
              dateFormat="LLL"
              timeCaption="time"
            />
          </div>
        </div>

        <div class="locationfield field-section field-section-top">

          <div class="field">
            <label class="label is-small">
              <span class="icon is-small is-left">
                <i class="fas fa-map-marker-alt is-left"></i>
              </span>
              Location
            </label>
            <p class="control">
              <input id="apptLocation" onChange={this.handleChange} value={this.state.apptLocation} class="input is-small locinput" type="text" placeholder="Location" />
            </p>
          </div>

          <div class="field">

            <label class="label is-small">
              <span class="icon is-small is-left">
                <i class="fas fa-tag"></i>
              </span>
              Category
            </label>

            {
              (!this.state.createCategory)
              ? <div class="field is-grouped">
                  <p class="control is-small">
                    <span class="select is-small">
                      <select id="apptCategory" onChange={this.handleChange} value={this.state.apptCategory}>
                        <option value="General">Select category</option>
                        <option value="Work">Work</option>
                        <option value="Other">Other</option>
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
        <div class="field field-section field-section-top">
          <label class="label is-small">
            <span class="icon is-small is-left">
              <i class="far fa-edit"></i>
            </span>Description</label>
          <div class="control">
            <textarea id="apptDescription" onChange={this.handleChange} value={this.state.apptDescription} class="textarea is-small" type="text" placeholder="Description"></textarea>
          </div>
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
            <div class="buttons has-addons is-right">
              <span class="button is-small">Save</span>
              <span class="button is-small" onClick={
                  () => this.props.toggleState('showAddApptForm')
                }>
                Cancel
              </span>
            </div>
          </footer>
        </div>
      </div>
    )
  }
}
