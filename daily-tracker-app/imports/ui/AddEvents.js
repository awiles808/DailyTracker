import React, { Component } from "react";
import { Events } from "../api/events";

class AddEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      event: props.event,
      isUpdating: props.isUpdating
    }
  }

  // React Lifecycle method that runs when props are updated and sets them into state
  componentWillReceiveProps(nextProps) {
    this.setState({
      event: nextProps.event,
      isUpdating: nextProps.isUpdating
    });
  }

  handleChange = (event) => {
    const field = event.target.name;

    // onChange we take the event in state and create a new object thats updated depending on which field has changed
    // we use square braces around the key `field` coz its a variable (we are setting state with a dynamic key name)
    const newEvent = Object.assign({}, this.state.event, { [field]: event.target.value });

    // we then set new event object into state
    this.setState({
      event: newEvent
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const { title, description, template, date, contacts, offer, email, resolution, rate } = this.state.event;

    // checks whether it is an update if not when you hit the submit button it inserts a new event into the db
    if (!this.props.isUpdating) {
      Events.insert({
        title,
        description,
        template,
        date,
        contacts,
        offer,
        email,
        resolution,
        rate
      });
    } else {
      // if the flag isUpdating is true it updates an existing event with changes made
      Events.update(this.state.event._id, {
        $set: {
          title,
          description,
          template,
          date,
          contacts,
          offer,
          email,
          resolution,
          rate
        }
      });

      // it then sets flag back to false
      this.setState({
        isUpdating: false
      })
    }

    const newEvent = {
      title: "",
      description: "",
      template:"",
      date: "",
      contacts:"",
      offer:"",
      email:"",
      resolution:"",
      rate:""

    }

    this.setState({
      event: newEvent
    })
  }

  renderSubmitButton() {
    // renders submit button dynamically depending on whether isUpdating flag is true/false
    if (this.state.isUpdating) {
      return (<button type="submit" className="btn btn-primary">Update This Appointment</button>);
    }
    return (<button type="submit" className="btn btn-primary">Add Case</button>);
  }

  render() {
    const { event } = this.state;

    return (
      <div>
        <div className="text-center">
          <h2>Daily Appointment Tracker</h2>
        </div>
        <hr />

        <div className="jumbotron" style={{ margin: "0 250px" }}>
          <form onSubmit={this.handleSubmit}>

            <div className="form-group">
              <label>Customer Name:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter customer's name"
                name="title"
                value={event.title ? event.title : ""}
                onChange={this.handleChange}
              />
            </div>

            <div className="form-group">
              <label>Buisness:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter buisness type "
                name="description"
                value={event.description ? event.description : ""}
                onChange={this.handleChange}
              />
            </div>


            <div className="form-group">
              <label>Template:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Type of Template"
                name="template"
                value={event.template ? event.template : ""}
                onChange={this.handleChange}
              />
            </div>


            <div className="form-group">
              <label>Number Of Contacts:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Number of Contacts"
                name="contacts"
                value={event.contacts ? event.contacts : ""}
                onChange={this.handleChange}
              />
            </div>


            <div className="form-group">
              <label>Do You Offer?:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Yes Or No"
                name="offer"
                value={event.offer ? event.offer : ""}
                onChange={this.handleChange}
              />
            </div>

            <div className="form-group">
              <label>Type Of Email Sent?:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Type of Email"
                name="email"
                value={event.email ? event.email : ""}
                onChange={this.handleChange}
              />
            </div>


            <div className="form-group">
              <label>Case Resolution?:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Case Resolution"
                name="resolution"
                value={event.resolution? event.resolution : ""}
                onChange={this.handleChange}
              />
            </div>


            <div className="form-group">
              <label>Monthly/ProRate?:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Monthly and Prorated Amount "
                name="rate"
                value={event.rate? event.rate : ""}
                onChange={this.handleChange}
              />
            </div>


            <div className="form-group">
              <label>Appointment Date:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter date in the format mm.dd.yyyy"
                name="date"
                value={event.date ? event.date : ""}
                onChange={this.handleChange}
              />
            </div>

            {this.renderSubmitButton()}

          </form>
        </div>
      </div>
    );
  }
}

export default AddEvents;