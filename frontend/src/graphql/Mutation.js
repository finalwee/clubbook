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

export const CREATE_USER_MUTATION = gql`
mutation createUser(
  $name: String!
  $password: String!
){
  createUser(
    name: $name
    password: $password
  )
}
`;

export const UPDATE_USER_MUTATION = gql`
mutation updateUser(
  $username: String!
  $email: String
  $friends: [String]
  $subscribe: [String]
  $favourite: String
){
  updateUser(
    username: $username
    email: $email
    friends: $friends
    subscribe: $subscribe
    favourite: $favourite
  )
}
`;

export const CREATE_POST_MUTATION = gql`
mutation createPost(
  $author: String
  $title: String
  $body: String
  $clubName: String
){
  createPost(
    author: $author
    title: $title
    body: $body
    clubName: $clubName
  )
}
`;

export const JOINED_CLUB_MUTATION = gql`
mutation joinedClub(
  $userName: String!
  $clubName: String!
){
  joinedClub(
    userName: $userName
    clubName: $clubName
  )
}
`;

export const CREATE_COMMENT_MUTATION = gql`
mutation createComment(
  $body: String
  $commenter: String
  $postId: ID
){
  createComment(
    body: $body
    commenter: $commenter
    postId: $postId
  )
}
`;

export const CREATE_CLUB_MUTATION = gql`
mutation createClub(
  $name: String
  $author: String
){
  createClub(
    name: $name
    author: $author
  )
}
`;