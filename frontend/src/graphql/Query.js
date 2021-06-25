import { gql } from '@apollo/client';

export const Query_CHATBOX_Messages = gql`
  query messages(
    $name1: String!
    $name2: String!
  ) {
    messages(
        name1: $name1
        name2: $name2
    ) {
      body
      sender{
          name
      }
    }
  }
`;
