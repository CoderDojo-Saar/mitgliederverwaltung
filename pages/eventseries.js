import React, { Fragment } from "react";
import { Query } from "react-apollo";
import { ALL_SERIES_QUERY } from "../lib/queries/eventSeries";
class EventSeriesPage extends React.Component {
  render() {
    return (
      <Query query={ALL_SERIES_QUERY}>
        {({ data, error, loading }) =>
          data.eventSeries.length ? (
            <div>
              <h2>Series</h2>
              <ul>
                {data.eventSeries.map(serie => (
                  <li key={serie.id}>{serie.name}</li>
                ))}
              </ul>
            </div>
          ) : (
            <Fragment />
          )
        }
      </Query>
    );
  }
}

export default EventSeriesPage;
