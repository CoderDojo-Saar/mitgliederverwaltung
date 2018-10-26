import gql from "graphql-tag";
export const CREATE_EVENT_MUTATION = gql`
  mutation CREATE_EVENT_MUTATION(
    $title: String!
    $date: DateTime!
    $seriesNumber: Int
    $location: LocationCreateOneInput
    $series: EventSerieCreateOneInput
    $participants: ParticipantCreateManyInput
  ) {
    createEvent(
      title: $title
      date: $date
      seriesNumber: $seriesNumber
      location: $location
      series: $series
      participants: $participants
    ) {
      id
    }
  }
`;
