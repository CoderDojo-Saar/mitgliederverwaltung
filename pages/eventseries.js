import React, { Fragment } from "react";
import { Query, Mutation, Subscription } from "react-apollo";
import { ALL_SERIES_QUERY } from "../lib/queries/eventSeries";
import { DELETE_SERIES_MUTATION } from "../lib/mutations/eventSeries";
import CreateSeriesForm from "../components/CreateSeries";
class EventSeriesPage extends React.Component {
  render() {
    return (
      <Fragment>
        <Query query={ALL_SERIES_QUERY} pollInterval={500}>
          {({ data, error, loading }) =>
            data.eventSeries.length ? (
              <div>
                <h2>Series</h2>
                <ul>
                  {data.eventSeries.map(serie => (
                    <li key={serie.id} id={serie.id}>
                      {serie.title} - {serie.description}
                      <Mutation
                        mutation={DELETE_SERIES_MUTATION}
                        variables={{ id: serie.id }}
                      >
                        {(deleteSerie, { loading, error, called, data }) => (
                          <button type="button" onClick={deleteSerie}>
                            Delete
                          </button>
                        )}
                      </Mutation>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <Fragment />
            )
          }
        </Query>
        <CreateSeriesForm />
      </Fragment>
    );
  }
}

export default EventSeriesPage;
