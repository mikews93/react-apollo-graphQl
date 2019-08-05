import React, { useState } from "react";
import { withApollo } from "react-apollo";
import gql from "graphql-tag";
import Link from "../Links";

const FEED_SEARCH_QUERY = gql`
  query FeedSearchQuery($filter: String!) {
    feed(filter: $filter) {
      links {
        id
        url
        description
        createdAt
        postedBy {
          id
          name
        }
        votes {
          id
          user {
            id
          }
        }
      }
    }
  }
`;

const Search = props => {
  const [state, setState] = useState({
    links: [],
    filter: ""
  });

  const _executeSearch = async () => {
    const { filter } = state;
    const result = await props.client.query({
      query: FEED_SEARCH_QUERY,
      variables: { filter }
    });
    const links = result.data.feed.links;
    setState({ ...state, links });
  };

  return (
    <div>
      <div>
        Search
        <input
          type="text"
          onChange={e => setState({ ...state, filter: e.target.value })}
        />
        <button onClick={() => _executeSearch()}>OK</button>
      </div>
      {state.links.map((link, index) => (
        <Link key={link.id} link={link} index={index} />
      ))}
    </div>
  );
};

export default withApollo(Search);
