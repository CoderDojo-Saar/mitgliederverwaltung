import React, { Fragment } from "react";
import { Query } from "react-apollo";
import { ALL_PARTICIPANTS_QUERY } from "../lib/queries/participants";
class ParticipantsPage extends React.Component {
  render() {
    return (
      <Fragment>
        <Query query={ALL_PARTICIPANTS_QUERY} pollInterval={500}>
          {({ data, error, loading }) => {
            console.log(error);
            return data.participants.length ? (
              <div>
                <h2>Participants</h2>
                <ul>
                  {data.participants.map(participant => (
                    <li key={participant.id} id={participant.id}>
                      {participant.firstname} {participant.lastname},{" "}
                      {participant.contacts.map(contact => contact.email).reduce((a, b) => `${a}, ${b}`)}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <Fragment />
            );
          }}
        </Query>
      </Fragment>
    );
  }
}

export default ParticipantsPage;
