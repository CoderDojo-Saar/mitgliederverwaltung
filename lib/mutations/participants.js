import gql from "graphql-tag";
export const CREATE_PARTICIPANT_MUTATION = gql`
  mutation CREATE_PARTICIPANT_MUTATION(
    $lastname: String!
    $firstname: String!
    $age: Int
    $borrowDevice: Boolean
    $contacts: ContactCreateManyInput
  ) {
    createParticipant(
      lastname: $lastname
      firstname: $firstname
      age: $age
      borrowDevice: $borrowDevice
      contacts: $contacts
    ) {
      id
    }
  }
`;
