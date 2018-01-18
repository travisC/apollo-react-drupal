import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

// The data prop, which is provided by the wrapper below contains,
// a `loading` key while the query is in flight and posts when it is ready
function NodeList({ data: { loading, nodeQuery } }) {
  //console.log(nodeQuery)
  if (loading) {
    return <div>Loading</div>;
  } else {
    return (
      <ul className="node-list">
        {nodeQuery.entities.map(node =>
          <li key={node.entityId}>
            ID: {node.entityId}<br /> 
            Title: {node.entityLabel}<br />
            Type: {node.__typename}<br />
            Subtitle: {node.fieldSubtitle ? node.fieldSubtitle : ''}<br />
            Owner: {node.entityOwner.name}
          </li>
        )}
      </ul>
    );
  }
}

// The `graphql` wrapper executes a GraphQL query and makes the results
// available on the `data` prop of the wrapped component (PostList here)
const fragments = gql`
fragment fragUser on User {
  name
}
`;
export default graphql(gql`
{
  nodeQuery(filter:{status:true, langcode: "en"}) {
    entities {
      entityLabel
      entityId
      entityOwner {
        ... fragUser
      }
      __typename
      ... on NodeGiftCardPage {
        fieldSubtitle
      }
    }
  }
}
${fragments}
`)(NodeList);
