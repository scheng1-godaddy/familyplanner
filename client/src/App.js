import React, { Component } from 'react';
import moment from 'moment';

import NavBar from './App/NavBar';
import ShowAppt from './App/ShowAppt';
import EditAppt from './App/EditAppt';
import AddAppt from './App/AddAppt';
import Calendar from './App/Calendar';
import FrontPage from './App/FrontPage';


import 'bulma/css/bulma.css';


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: null,
      colors: [],
      categories: [],
      schedule: [],
      showAppt: false,
      showAddApptForm: false,
      showEditApptForm: false,
      selectedAppt: null,
      selectedIndex: null,
      selectedDate: null
    }
  }
  /*====================================
    Things to do during load
  =====================================*/
  componentDidMount() {
    if (this.state.user && this.state.user.data) {
      this.getSchedule();
      this.getCategories();
    } else {
      this.checkSession();
    }
    this.getColors();
  }
  /*=======================
  Toggles any of the booleans in state
  =======================*/
  toggleState = (...st) => {
    console.log('Toggle State called');
    let toUpdate = {}
    for (let key of st) {
      toUpdate[key] = !this.state[key]
    }
    this.setState(toUpdate)
  }
  /*====================================
   Check server for active user session
  =====================================*/
  checkSession = () => {
    fetch('/sessions')
      .then(response => response.json())
      .then(responseJson => {
        this.setUser(responseJson);
        this.getSchedule();
        this.getCategories();
      })
      .catch(error => {
      console.log(error);
    })
  }
  /*====================================
    Gets all scheduled appts based family id
  =====================================*/
  getSchedule = () => {
    console.log('Getting schedule');
    fetch('/appointments/family/' + this.state.user.data.family_id)
      .then(response => response.json())
      .then(responseJson => {
        console.log('Got schedule', responseJson);
        this.setState({
          schedule: responseJson.data
        })
      })
      .catch(error => {
      console.log(error);
    })
  }
  /*====================================
    Sets the current user
  =====================================*/
  setUser = (user) => {
    console.log('Setting user', user);
    this.setState({
      user: user
    })
    this.getSchedule();
    this.getCategories();
  }

  setSelectedDate = (date) => {
    this.setState({
      selectedDate: moment(date)
    })
  }
  /*====================================
    Displays appointment selected
  =====================================*/
  displayAppt = (appt, index) => {
    this.setState({
      selectedAppt: appt,
      selectedIndex: index,
      showAppt: true
    })
  }
  /*====================================
    Close appointment selected
  =====================================*/
  closeAppt = () => {
    this.setState({
      selectedAppt: null,
      selectedIndex: null,
      showAppt: false
    })
  }
  /*====================================
    Adds Appointment
  =====================================*/
  addAppt = (appt) => {
    console.log('Calling add appointment', appt);
    // Add to database
    fetch('/appointments', {
      body: JSON.stringify(appt),
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        return response.json()
      })
      .then((responseJson) => {
        let newAppt = responseJson.data
        let category = this.state.categories.find((category) => {
          return category.id == newAppt.category_id
        });
        newAppt["category"] = category.name;
        let color = this.state.colors.find((color) => {
          return color.id == category.color_id
        });
        newAppt["color"] = color.name
        newAppt["creator_name"] = this.state.user.data.name;
        console.log('Final format for new appointment:', newAppt);
        let newArr = this.state.schedule;
        newArr.push(newAppt)
        this.setState({
          schedule: newArr,
          showAddApptForm: false
        })
      })
      .catch(error => console.log(error))
  }
  /*====================================
    Updates Appointment
  =====================================*/
  updateAppt = (appt) => {
    console.log('calling updateAppt', appt);
    // Add to database
    fetch('/appointments/' + this.state.selectedAppt.id, {
      body: JSON.stringify(appt),
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        return response.json()
      })
      .then((responseJson) => {
        let newAppt = responseJson.data
        let category = this.state.categories.find((category) => {
          return category.id == newAppt.category_id
        });
        newAppt["category"] = category.name;
        let color = this.state.colors.find((color) => {
          return color.id == category.color_id
        });
        newAppt["color"] = color.name
        newAppt["creator_name"] = this.state.user.data.name;
        console.log('Final format for new appointment:', newAppt);
        let newArr = this.state.schedule;
        newArr[this.state.selectedIndex] = newAppt
        this.setState({
          schedule: newArr,
          showEditApptForm: false
        })
      })
      .catch(error => console.log(error))
  }
  /*====================================
    Delete appointment
  =====================================*/
  deleteAppt = () => {
    console.log('calling deleteAppt', this.state.selectedAppt);
    fetch('/appointments/'+this.state.selectedAppt.id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      this.setState({
        schedule: [
          ...this.state.schedule.slice(0, this.state.selectedIndex),
          ...this.state.schedule.slice(this.state.selectedIndex + 1)
        ],
        showAppt: false
      })
    }).catch(error => console.log(error))
  }
  /*====================================
    Adds category
  =====================================*/
  addCategory = (category) => {
    console.log('Calling addCategory', category);
    // Add to database
    fetch('/category', {
      body: JSON.stringify(category),
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        return response.json()
      })
      .then((responseJson) => {
        let newArr = this.state.categories;
        newArr.push(responseJson.data)
        this.setState({
          categories: newArr
        })
      })
      .catch(error => console.log(error))
  }
  /*====================================
    Get colors
  =====================================*/
  getColors = () => {
    console.log('Calling getColors');
    fetch('/colors')
      .then(response => response.json())
      .then(responseJson => {
        console.log('Got colors', responseJson);
        this.setState({
          colors: responseJson.data
        })
      })
      .catch(error => {
      console.log(error);
    })
  }
  /*====================================
    Get colors
  =====================================*/
  getCategories = () => {
    console.log('Calling getCategories');
    fetch('/category/family/' + + this.state.user.data.family_id)
      .then(response => response.json())
      .then(responseJson => {
        console.log('Got colors', responseJson);
        this.setState({
          categories: responseJson.data
        })
      })
      .catch(error => {
      console.log(error);
    })
  }
  /*====================================
    Render function
  =====================================*/
  render () {
    return (
      (this.state.user && this.state.user.data)
      ? <div className="App">
          <NavBar user={this.state.user} setUser={this.setUser} toggleState={this.toggleState}/>
            <header>
              <div id="logo">
                <span>
                  <b>{this.state.user.data.family_name.toUpperCase()}</b>
                </span>
              </div>
            </header>
          <main>
            {
              (this.state.showAppt)
              ? <ShowAppt
              appt={this.state.selectedAppt}
              index={this.state.selectedIndex}
              toggleState={this.toggleState}
              closeAppt={this.closeAppt}
              deleteAppt={this.deleteAppt}/>
              : null
            }
            {
              (this.state.showEditApptForm)
              ? <EditAppt
                toggleState={this.toggleState}
                colors={this.state.colors}
                categories={this.state.categories}
                user={this.state.user.data}
                addCategory={this.addCategory}
                appt={this.state.selectedAppt}
                updateAppt={this.updateAppt}/>
              : null
            }
            {
              (this.state.showAddApptForm)
              ? <AddAppt
                toggleState={this.toggleState}
                colors={this.state.colors}
                categories={this.state.categories}
                user={this.state.user.data}
                addCategory={this.addCategory}
                addAppt={this.addAppt}
                selectedDate={this.state.selectedDate}/>
              : null
            }
            <Calendar
              user={this.state.user}
              schedule={this.state.schedule}
              displayAppt={this.displayAppt}
              addAppt={this.addAppt}
              toggleState={this.toggleState}
              setSelectedDate={this.setSelectedDate}
              />
          </main>
        </div>
      : <FrontPage setUser={this.setUser}/>
    );
  }
}

export default App;
