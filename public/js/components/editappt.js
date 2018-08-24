class EditAppt extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      apptTitle: this.props.appt.name,
      apptStartDate: moment(this.props.appt.start_datetime),
      apptEndDate: moment(this.props.appt.end_datetime),
      apptLocation: this.props.appt.location,
      apptCategory: this.props.appt.category,
      apptDescription: this.props.appt.description,
      categoryColor: this.props.appt.color,
      categoryName: this.formatCategoryValue(),
      createCategory: false,
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
  Formats the category value to include its index and id along with value
  =======================*/
  formatCategoryValue = () => {
    let index = this.props.categories.findIndex(category => category.name==this.props.appt.category);
    console.log('formatCategory index is', index);
    return index+'-' + this.props.appt.category_id + '-' + this.props.appt.category;
  }

  /*=======================
  This method creates new category
  =======================*/
  createCategory = () => {
    console.log('Creating new category');
    console.log(this.state.categoryName, this.props.user.id, this.state.categoryColor);
    let category = {
      "name": this.state.categoryName,
      "family_id": this.props.user.id,
      "color_id": parseInt(this.state.categoryColor.split('-')[0])
    };
    this.setState({
      createCategory: false
    });
    this.props.addCategory(category);
  }
  /*=======================
  This method creates new appointment
  =======================*/
  updateAppointment = () => {
    let dbAppt = {
      "start_datetime": this.state.apptStartDate.format(),
      "end_datetime": this.state.apptEndDate.format(),
      "name": this.state.apptTitle,
      "description": this.state.apptDescription,
      "location": this.state.apptLocation,
      "creator_id": this.props.user.id,
      "family_id": this.props.user.family_id,
      "category_id": Number(this.state.categoryName.split('-')[1]),
      "recurring": '',
      "is_recurring": false
    }
    console.log('Format of newAppt', dbAppt);
    this.props.updateAppt(dbAppt);
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
                      <select id="categoryName" onChange={this.handleChange} value={this.state.categoryName}>
                        {this.props.categories.map((category, index) => {
                          return <option value={index + '-' + category.id + '-' + category.name}>{category.name}</option>
                        })}
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
                    <input id="categoryName" onChange={this.handleChange} value={this.state.categoryName} class="input is-small" type="text" placeholder="New category name" />
                  </p>

                  <p class="control is-small">
                    <span class="select is-small">
                      <select id="categoryColor" onChange={this.handleChange} value={this.state.categoryColor}>
                        <option value="" disabled selected>Select color</option>
                        {this.props.colors.map((color, index) => {
                          return <option className={color.name} value={color.id + '-' + color.name}>{color.name}</option>
                        })}
                      </select>
                    </span>
                  </p>

                  <p class="control">

                    <i class="far fa-check-circle icon-button yes" onClick={() => this.createCategory()}></i>

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
            <button onClick={() => this.props.toggleState('showEditApptForm')} class="delete" aria-label="close"></button>
          </header>
          <section class="modal-card-body">
            <div class="add-appt-body">
              {this.renderForm()}
            </div>
          </section>
          <footer class="modal-card-foot">
            <a class="button is-small icon-button" onClick={
                () => this.updateAppointment()
              }>
              <span class="icon is-small">
                <i class="far fa-calendar-check"></i>
              </span>
              <span>Schedule</span>
            </a>
            <a class="button is-small icon-button" onClick={
                () => this.props.toggleState('showEditApptForm')
              }>
              <span class="icon is-small">
                <i class="fas fa-ban"></i>
              </span>
              <span>Cancel</span>
            </a>
          </footer>
        </div>
      </div>
    )
  }
}
