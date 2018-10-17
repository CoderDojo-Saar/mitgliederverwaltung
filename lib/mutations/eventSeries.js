import gql from "graphql-tag";
export const CREATE_SERIES_MUTATION = gql`
  mutation CREATE_SERIES_MUTATION($title: String!, $description: String!) {
    createSerie(title: $title, description: $description) {
      id
    }
  }
`;

export const DELETE_SERIES_MUTATION = gql`
  mutation DELETE_SERIES_MUTATION($id: ID!) {
    deleteSerie(id: $id) {
      id
    }
  }
`;
