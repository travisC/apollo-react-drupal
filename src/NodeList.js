import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

// The data prop, which is provided by the wrapper below contains,
// a `loading` key while the query is in flight and posts when it is ready
function NodeList({ data: { loading, nodes } }) {
  if (loading) {
    return <div>Loading</div>;
  } else {
    return (
      <ul>
        {nodes.map(node =>
          <li key={node.entities.entityId}>
            {node.entityLabel}
          </li>
        )}
      </ul>
    );
  }
}

// The `graphql` wrapper executes a GraphQL query and makes the results
// available on the `data` prop of the wrapped component (PostList here)
export default graphql(gql`
{
  nodeQuery {
    entities {
      entityId
      entityLabel
      __typename
    }
  }
}
`)(NodeList);
