class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMonth: new Date(),
      selectedDate: new Date()
    };
  }
  /*====================================
    Displays controls for calendar
  =====================================*/
  displayControls = () => {
    return (
      <div className="col col-start">
        <div className="icon-add-container" onClick={() => this.addApptHandler()}>
          <i className="fas fa-plus-circle icon-add"></i>
          <span className="add">ADD EVENT</span>
        </div>
      </div>
    )
  }
  /*====================================
    Displays header for calendar
  =====================================*/
  displayHeader = () => {
    const monthFormat = "MMMM YYYY";
    return (
      <div className="header row flex-middle">
        <div className="col col-start">
          <div className="icon" onClick={this.prevMonth}>
            <i class="fas fa-chevron-circle-left"></i>
          </div>
        </div>
        <div className="col col-center">
          <span>
            {dateFns.format(this.state.currentMonth, monthFormat)}
          </span>
        </div>
        <div className="col col-end" onClick={this.nextMonth}>
          <div className="icon"><i class="fas fa-chevron-circle-right"></i></div>
        </div>
      </div>
    );
  }
  /*====================================
    Displays days for calendar
  =====================================*/
  displayDayOfWeek = () => {
    const days = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY']
    const daysDiv = [];
    for (let i = 0; i < 7; i++) {
      daysDiv.push(
        <div className="col col-center" key={i}>
          {days[i]}
        </div>
      );
    }
    return <div className="days row">{daysDiv}</div>;
  }
  /*====================================
    Displays cells for calendar
  =====================================*/
  displayCells = () => {
    const { currentMonth, selectedDate } = this.state;
    // Get date for start of the currently selected month
    const monthStart = dateFns.startOfMonth(currentMonth);
    // Get date for end of the currently selected month
    const monthEnd = dateFns.endOfMonth(monthStart);
    // Get the date for first day of the week using date for start of the month
    const startDate = dateFns.startOfWeek(monthStart);
    // Get the date for last day of the week using date for end of the month
    const endDate = dateFns.endOfWeek(monthEnd);
    // Use numeric format for date (i.e. 1, 2 ,3)
    const dateFormat = "D";
    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = "";
    // Create day divs, while loop goes until end date
    while (day <= endDate) {
      // Place into rows
      for (let i = 0; i < 7; i++) {
        // Take the current day and format it as single digit numeric
        formattedDate = dateFns.format(day, dateFormat);
        // Make a copy of the date, used for the onclick
        const cloneDay = day;
        // The ternary below checks to see if date is the same month
        // If its not the same month it sets a disabled class to the cell
        // If it is the same month, it checks to see if its the same day as currently
        // selected; if it is, it puts a selected class on the cell.
        days.push(
          <div
            className={`col cell ${
              !dateFns.isSameMonth(day, monthStart)
                ? "disabled"
                : dateFns.isSameDay(day, selectedDate) ? "selected" : ""
            }`}
            key={day}
            onClick={() => this.dateClickHandler(dateFns.parse(cloneDay))}
          >
            <div className="number">{formattedDate}</div>

            <div className="appt-container">
              { this.props.schedule.map((appt, index) => {
                  return dateFns.isSameDay(day, dateFns.parse(appt.start_datetime)) ?
                <div className={appt.color_name + " appt"} onClick={()=> this.props.displayAppt(appt, index)}>{appt.name}</div> : null
                })
              }
            </div>
          </div>
        );
        day = dateFns.addDays(day, 1);
      }
      rows.push(
        <div className="row" key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="body">{rows}</div>;
  }
  /*====================================
    Sets selected day to what was clicked
  =====================================*/
  dateClickHandler = (day) => {
    this.setState({
      selectedDate: day
    });
  }
  /*====================================
    Displays cells for calendar
  =====================================*/
  nextMonth = () => {
    this.setState({
      currentMonth: dateFns.addMonths(this.state.currentMonth, 1)
    });
  }
  /*====================================
    Displays cells for calendar
  =====================================*/
  prevMonth = () => {
    this.setState({
      currentMonth: dateFns.subMonths(this.state.currentMonth, 1)
    });
  }
  /*====================================
    Handler to add appointment
  =====================================*/
  addApptHandler = () => {
    // Show appointment window
    this.props.toggleState('showAddApptForm')
    this.props.addAppt();
  }
  /*====================================
    Render Function
  =====================================*/
  render() {
    return (
      <div>
        {this.displayControls()}
        <div className="calendar">
          {this.displayHeader()}
          {this.displayDayOfWeek()}
          {this.displayCells()}
        </div>
      </div>
    );
  }
}
