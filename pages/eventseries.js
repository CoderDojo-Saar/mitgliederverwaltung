import React, { Fragment } from "react";
import { Query } from "react-apollo";
import { ALL_SERIES_QUERY } from "../lib/queries/eventSeries";
import CreateSeriesForm from "../components/CreateSeries";
class EventSeriesPage extends React.Component {
  render() {
    return (
      <Fragment>
        <Query query={ALL_SERIES_QUERY}>
          {({ data, error, loading }) =>
            data.eventSeries.length ? (
              <div>
                <h2>Series</h2>
                <ul>
                  {data.eventSeries.map(serie => (
                    <li key={serie.id} id={serie.id}>
                      {serie.title} - {serie.description}
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
