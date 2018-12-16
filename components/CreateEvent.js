import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Pane, Checkbox, TextInput, Button, RadioGroup } from "evergreen-ui";
import { Mutation, Query } from "react-apollo";
import { CREATE_EVENT_MUTATION } from "../lib/mutations/events";
import { ALL_SERIES_QUERY } from "../lib/queries/eventSeries";
import { ALL_PARTICIPANTS_QUERY } from "../lib/queries/participants";
import DatePicker from "react-datepicker";
import moment from "moment";

// Import date-picker css
import("react-datepicker/dist/react-datepicker.css");
class CreateEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "a test",
      date: new Date(),
      series: {},
      seriesNumber: 1,
      location: null,
      participants: []
    };

    this.onChangeDate = this.onChangeDate.bind(this);
  }

  onChangeDate(date) {
    this.setState({
      date
    });
  }

  render() {
    return (
      <Fragment>
        <Mutation mutation={CREATE_EVENT_MUTATION} variables={this.state}>
          {(createEvent, { loading, error, called, data }) => (
            <form
              onSubmit={async e => {
                e.preventDefault();
                const res = await createEvent();
                console.log(res);
              }}
            >
              <h2>Create an Event</h2>
              <fieldset disabled={loading} aria-busy={loading}>
                <TextInput
                  placeholder="Titel"
                  value={this.state.title}
                  required={true}
                  onChange={e => this.setState({ title: e.target.value })}
                />
                <input
                  type="number"
                  placeholder="Wievieltes Treffen"
                  value={this.state.seriesNumber}
                  onChange={e =>
                    this.setState({ seriesNumber: e.target.value })
                  }
                  min="1"
                />

                <label>When</label>
                <DatePicker
                  selected={this.state.date}
                  onChange={this.onChangeDate}
                />

                <h1>Choose serie</h1>
                <Query query={ALL_SERIES_QUERY}>
                  {({ data, error, loading }) => {
                    console.log(data, error, loading);
                    if (error || loading) {
                      return <h1>Nope</h1>;
                    }

                    return (
                      <Pane>
                        <RadioGroup
                          label="Serie"
                          value={this.state.contactType}
                          options={data.eventSeries.map(serie => ({
                            label: serie.title,
                            value: serie.id
                          }))}
                          onChange={value =>
                            this.setState({
                              series: { connect: { id: value } }
                            })
                          }
                        />
                      </Pane>
                    );
                  }}
                </Query>

                <Fragment>
                  <h1>Choose some participants</h1>
                  <Query query={ALL_PARTICIPANTS_QUERY}>
                    {({ data, error, loading }) => {
                      console.log(data, error, loading);
                      if (error || loading) {
                        return <h1>Nope</h1>;
                      }
                      return data.participants.map(participant => (
                        <Checkbox
                          key={participant.id}
                          value={participant.id}
                          label={`${participant.firstname} ${
                            participant.lastname
                          }`}
                          checked={
                            ("connect" in this.state.participants &&
                              this.state.participants.connect.some(
                                connectedParticipant =>
                                  connectedParticipant.id === participant.id
                              )) ||
                            false
                          }
                          onChange={e => {
                            const checkboxId = e.target.value;
                            if (!e.target.checked) {
                              // Check if participant is part of connect group
                              if (
                                "connect" in this.state.participants &&
                                this.state.participants.connect.some(
                                  connectedParticipant =>
                                    connectedParticipant.id === checkboxId
                                )
                              ) {
                                // Remove existing contact from connect group
                                return this.setState(prevState => ({
                                  participants: {
                                    connect: prevState.participants.connect.filter(
                                      connectedParticipant =>
                                        connectedParticipant.id !== checkboxId
                                    )
                                  }
                                }));
                              }
                            }

                            // Add to connect group
                            return this.setState(prevState => ({
                              participants: {
                                connect: [
                                  ...(
                                    prevState.participants.connect || []
                                  ).filter(
                                    connectedParticipant =>
                                      connectedParticipant !== participant.id
                                  ),
                                  {
                                    id: checkboxId
                                  }
                                ]
                              }
                            }));
                          }}
                        />
                      ));
                    }}
                  </Query>
                </Fragment>

                <Button>Anlegen</Button>
              </fieldset>
            </form>
          )}
        </Mutation>
      </Fragment>
    );
  }
}

CreateEvent.propTypes = {};

export default CreateEvent;
