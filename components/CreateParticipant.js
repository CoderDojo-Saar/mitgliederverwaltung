import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Pane, Checkbox, TextInput, Button, RadioGroup } from "evergreen-ui";
import { Mutation, Query } from "react-apollo";
import { CREATE_PARTICIPANT_MUTATION } from "../lib/mutations/participants";
import { ALL_CONTACTS_EMAIL_QUERY } from "../lib/queries/contacts";
class CreateParticipant extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lastname: "",
      firstname: "",
      age: 10,
      borrowDevice: false,
      contactType: "new",
      contacts: {}
    };
  }

  render() {
    return (
      <Fragment>
        <Mutation mutation={CREATE_PARTICIPANT_MUTATION} variables={this.state}>
          {(createParticipant, { loading, error, called, data }) => (
            <form
              onSubmit={async e => {
                e.preventDefault();
                const res = await createParticipant();
                console.log(res);
              }}
            >
              <h2>Create a participant</h2>
              <fieldset disabled={loading} aria-busy={loading}>
                <TextInput
                  placeholder="Vorname"
                  value={this.state.firstname}
                  required={true}
                  onChange={e => this.setState({ firstname: e.target.value })}
                />
                <TextInput
                  placeholder="Nachname"
                  value={this.state.lastname}
                  required={true}
                  onChange={e => this.setState({ lastname: e.target.value })}
                />
                <input
                  type="number"
                  placeholder="Alter"
                  value={this.state.age}
                  onChange={e => this.setState({ age: e.target.value })}
                  min="5"
                  max="30"
                />
                <Checkbox
                  label="Leihlaptop?"
                  value="leihlaptop benötigt"
                  checked={this.state.borrowDevice}
                  onChange={e =>
                    this.setState({ borrowDevice: e.target.checked })
                  }
                />
                <RadioGroup
                  label="Kontakt"
                  value={this.state.contactType}
                  options={[
                    { label: "Create new contact", value: "new" },
                    {
                      label: "Use existing contact",
                      value: "existing"
                    }
                  ]}
                  onChange={value => this.setState({ contactType: value })}
                />

                {this.state.contactType === "existing" && (
                  <Fragment>
                    <h1>Choose one</h1>
                    <Query query={ALL_CONTACTS_EMAIL_QUERY}>
                      {({ data, error, loading }) => {
                        console.log(data, error, loading);
                        if (error || loading) {
                          return <h1>Nope</h1>;
                        }
                        return (
                          <Pane>
                            {data.contacts.map(contact => (
                              <Checkbox
                                key={contact.id}
                                value={contact.id}
                                label={contact.email}
                                checked={
                                  ("connect" in this.state.contacts &&
                                    this.state.contacts.connect.some(
                                      connectedContact =>
                                        connectedContact.id === contact.id
                                    )) ||
                                  false
                                }
                                onChange={e => {
                                  const checkboxId = e.target.value;
                                  if (!e.target.checked) {
                                    // Check if contact is part of connect group
                                    if (
                                      "connect" in this.state.contacts &&
                                      this.state.contacts.connect.some(
                                        connectedContact =>
                                          connectedContact.id === checkboxId
                                      )
                                    ) {
                                      // Remove existing contact from connect group
                                      return this.setState(prevState => ({
                                        contacts: {
                                          connect: prevState.contacts.connect.filter(
                                            connectedContact =>
                                              connectedContact.id !== checkboxId
                                          )
                                        }
                                      }));
                                    }
                                  }

                                  // Add to connect group
                                  return this.setState(prevState => ({
                                    contacts: {
                                      connect: [
                                        ...(
                                          prevState.contacts.connect || []
                                        ).filter(
                                          connectedContact =>
                                            connectedContact !== contact.id
                                        ),
                                        {
                                          id: checkboxId
                                        }
                                      ]
                                    }
                                  }));
                                }}
                              />
                            ))}
                          </Pane>
                        );
                      }}
                    </Query>
                  </Fragment>
                )}

                {this.state.contactType === "new" && (
                  <Fragment>
                    <h2>New Contact</h2>
                    <TextInput
                      placeholder="Vorname"
                      value={
                        "create" in this.state.contacts
                          ? this.state.contacts.create.firstname
                          : ""
                      }
                      required={true}
                      onChange={e => {
                        const firstName = e.target.value;
                        return this.setState(prevState => ({
                          contacts: {
                            create: Object.assign(
                              prevState.contacts.create || {},
                              {
                                firstname: firstName
                              }
                            )
                          }
                        }));
                      }}
                    />
                    <TextInput
                      placeholder="Nachname"
                      value={
                        "create" in this.state.contacts
                          ? this.state.contacts.create.lastname
                          : ""
                      }
                      required={true}
                      onChange={e => {
                        const lastName = e.target.value;
                        return this.setState(prevState => ({
                          contacts: {
                            create: Object.assign(
                              prevState.contacts.create || {},
                              {
                                lastname: lastName
                              }
                            )
                          }
                        }));
                      }}
                    />
                    <TextInput
                      placeholder="Email"
                      value={
                        "create" in this.state.contacts
                          ? this.state.contacts.create.email
                          : ""
                      }
                      required={true}
                      onChange={e => {
                        const email = e.target.value;
                        return this.setState(prevState => ({
                          contacts: {
                            create: Object.assign(
                              prevState.contacts.create || {},
                              {
                                email
                              }
                            )
                          }
                        }));
                      }}
                    />
                  </Fragment>
                )}
                <Button>Anlegen</Button>
              </fieldset>
            </form>
          )}
        </Mutation>
      </Fragment>
    );
  }
}

CreateParticipant.propTypes = {};

export default CreateParticipant;
