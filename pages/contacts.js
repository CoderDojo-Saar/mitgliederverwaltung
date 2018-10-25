import React from "react";
import PropTypes from "prop-types";
import { Query } from "react-apollo";
import { ALL_CONTACTS_EMAIL_QUERY } from "../lib/queries/contacts";
class ContactsPage extends React.Component {
  render() {
    return (
      <Query query={ALL_CONTACTS_EMAIL_QUERY}>
        {({ data, error, loading }) => {
          console.log(data, error, loading);
          if (error || loading) {
            return <h1>Nope</h1>;
          }
          return (
            <ul>
              {data.contacts.map(contact => (
                <li>{contact.email}</li>
              ))}
            </ul>
          );
        }}
      </Query>
    );
  }
}

ContactsPage.propTypes = {};

export default ContactsPage;
