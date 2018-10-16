import gql from "graphql-tag";
export const CREATE_SERIES_MUTATION = gql`
  mutation CREATE_SERIES_MUTATION($title: String!, $description: String!) {
    createSerie(title: $title, description: $description) {
      id
    }
  }
`;
