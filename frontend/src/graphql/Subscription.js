import { gql } from '@apollo/client';

export const MESSAGES_SUBSCRIPTION = gql`
  subscription ChatBox(
    $ChatBoxName: String!
  ) {
    ChatBox(
        ChatBoxName: $ChatBoxName
    ) {
      mutation
        data
          {
            body
            sender{
                name
            }
          }
      }
    }
`;
