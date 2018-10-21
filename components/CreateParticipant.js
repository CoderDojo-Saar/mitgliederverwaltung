import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Checkbox, TextInput, Button, RadioGroup } from "evergreen-ui";
import { Mutation } from "react-apollo";
import { CREATE_PARTICIPANT_MUTATION } from "../lib/mutations/participants";
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
