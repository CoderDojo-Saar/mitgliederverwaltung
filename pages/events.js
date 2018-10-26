import React from "react";
import PropTypes from "prop-types";
import CreateEvent from "../components/CreateEvent";
class EventPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <CreateEvent />;
  }
}

EventPage.propTypes = {};

export default EventPage;
