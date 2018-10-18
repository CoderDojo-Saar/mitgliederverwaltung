import gql from "graphql-tag";

export const ALL_PARTICIPANTS_QUERY = gql`
  query ALL_PARTICIPANTS_QUERY {
    participants {
      id
      lastname
      firstname
      age
      borrowDevice
      contacts {
          email
      }
    }
  }
`;
