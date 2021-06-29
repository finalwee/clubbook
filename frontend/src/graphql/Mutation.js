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

export const SEARCH_CLUB_MUTATION = gql`
mutation searchClub(
    $keyword: String
    $start: Int
    $end: Int
  ){
  searchClub(
    keyword: $keyword
    start: $start
    end: $end
  ){
    name
  }
}
`;

export const SEARCH_FRIENDS_MUTATION = gql`
mutation searchFriends(
    $keyword: String
    $start: Int
    $end: Int
  ){
  searchFriends(
    keyword: $keyword
    start: $start
    end: $end
  ){
    name
  }
}
`;

export const USER_LOGIN_MUTATION = gql`
mutation userLogin(
  $name: String!
  $password: String!
){
  userLogin(
    name: $name
    password: $password
  )
}
`;