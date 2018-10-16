import React from "react";
import PropTypes from "prop-types";
import { Mutation } from "react-apollo";
import { CREATE_SERIES_MUTATION } from "../lib/mutations/eventSeries";
class CreateSeries extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "A title",
      description: "A description"
    };
  }

  render() {
    return (
      <Mutation mutation={CREATE_SERIES_MUTATION} variables={this.state}>
        {(createSerie, { loading, error, called, data }) => (
          <form
            onSubmit={async e => {
              e.preventDefault();
              const res = await createSerie();
              console.log(res);
            }}
          >
            <h2>Create a series</h2>
            <fieldset disabled={loading} aria-busy={loading}>
              <input
                type="text"
                required
                name="title"
                value={this.state.title}
                onChange={e => this.setState({ title: e.target.value })}
              />
              <input
                type="text"
                required
                name="description"
                value={this.state.description}
                onChange={e => this.setState({ description: e.target.value })}
              />
              <button type="submit">Submit</button>
            </fieldset>
          </form>
        )}
      </Mutation>
    );
  }
}

CreateSeries.propTypes = {};

export default CreateSeries;
