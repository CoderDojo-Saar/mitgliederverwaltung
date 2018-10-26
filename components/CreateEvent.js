import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Pane, Checkbox, TextInput, Button, RadioGroup } from "evergreen-ui";
import { Mutation, Query } from "react-apollo";
import { CREATE_EVENT_MUTATION } from "../lib/mutations/events";
import { ALL_PARTICIPANTS_QUERY } from "../lib/queries/participants";
class CreateEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      date: null,
      seriesNumber: 1,
      location: null,
      series: null,
      participants: []
    };
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
                <input
                  type="number"
                  placeholder="Wievieltes Treffen"
                  value={this.state.seriesNumber}
                  onChange={e => this.setState({ seriesNumber: e.target.value })}
                  min="1"
                />

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
