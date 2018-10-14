import gql from "graphql-tag";

export const ALL_SERIES_QUERY = gql`
  query ALL_SERIES_QUERY {
    eventSeries {
      id
      title
      description
    }
  }
`;
