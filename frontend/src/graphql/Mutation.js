import { gql } from '@apollo/client';

export const CREATE_CHATBOX_MUTATION = gql`
  mutation createChatBox(
    $name1: String!
    $name2: String!
  ) {
    createChatBox(
        name1: $name1
        name2: $name2
    ) {
      messages{
          body
          sender{
              name
          }
      }
    }
  }
`;

export const CREATE_MESSAGE_MUTATION = gql`
  mutation createMessage(
    $sender: String!
    $chatboxname: String!
    $body: String!
  ){
    createMessage(
        sender: $sender
        chatboxname: $chatboxname
        body: $body
    ){
      body
    }
  }
`;