import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

const ALL_ITEMS_QUERY = gql`
  query ALL_ITEMS_QUERY {
    items {
      id
      title
      description
    }
  }
`;
class Page extends Component {
  render() {
    return (
      <main>
        {this.props.children}
        <Query query={ALL_ITEMS_QUERY}>
          {({ data, error, loading }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error: {error.message}</p>;
            return (
              <ul>
                {data.items.map((item, index) => (
                  <li key={index}>{item.title}</li>
                ))}
              </ul>
            );
          }}
        </Query>
      </main>
    );
  }
}

export default Page;
