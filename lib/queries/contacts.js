import gql from "graphql-tag";

export const ALL_CONTACTS_EMAIL_QUERY = gql`
  query ALL_CONTACTS_EMAIL_QUERY {
    contacts {
      id
      email
    }
  }
`;
