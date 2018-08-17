class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.dateClickHandler = this.dateClickHandler.bind(this);
    this.nextMonth = this.nextMonth.bind(this);
    this.prevMonth = this.prevMonth.bind(this);
    this.state = {
      currentMonth: new Date(),
      selectedDate: new Date()
    };
  }
  /*====================================
    Displays header for calendar
  =====================================*/
  displayHeader() {
    const monthFormat = "MMMM YYYY";
    return (
      <div className="header row flex-middle">
        <div className="col col-start">
          <div className="icon" onClick={this.prevMonth}>
            chevron_left
          </div>
        </div>
        <div className="col col-center">
          <span>
            {dateFns.format(this.state.currentMonth, monthFormat)}
          </span>
        </div>
        <div className="col col-end" onClick={this.nextMonth}>
          <div className="icon">chevron_right</div>
        </div>
      </div>
    );
  }
  /*====================================
    Displays days for calendar
  =====================================*/
  displayDayOfWeek() {
    const dateFormat = "dddd";
    const days = [];
    let startDate = dateFns.startOfWeek(this.state.currentMonth);
    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col col-center" key={i}>
          {dateFns.format(dateFns.addDays(startDate, i), dateFormat)}
        </div>
      );
    }
    return <div className="days row">{days}</div>;
  }
  /*====================================
    Displays cells for calendar
  =====================================*/
  displayCells() {
    const { currentMonth, selectedDate } = this.state;
    const monthStart = dateFns.startOfMonth(currentMonth);
    const monthEnd = dateFns.endOfMonth(monthStart);
    const startDate = dateFns.startOfWeek(monthStart);
    const endDate = dateFns.endOfWeek(monthEnd);
    const dateFormat = "D";
    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = "";
    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = dateFns.format(day, dateFormat);
        const cloneDay = day;
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
            <span className="number">{formattedDate}</span>
            <span className="bg">{formattedDate}</span>
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
  dateClickHandler(day) {
    this.setState({
      selectedDate: day
    });
  }
  /*====================================
    Displays cells for calendar
  =====================================*/
  nextMonth() {
    this.setState({
      currentMonth: dateFns.addMonths(this.state.currentMonth, 1)
    });
  }
  /*====================================
    Displays cells for calendar
  =====================================*/
  prevMonth() {
    this.setState({
      currentMonth: dateFns.subMonths(this.state.currentMonth, 1)
    });
  }
  /*====================================
    Render Function
  =====================================*/
  render() {
    return (
      <div className="calendar">
        {this.displayHeader()}
        {this.displayDayOfWeek()}
        {this.displayCells()}
      </div>
    );
  }
}
