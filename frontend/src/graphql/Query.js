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

export const QUERY_POSTS = gql`
  query posts(
    $clubName: String
    $username: String
    $begin: Int
    $end: Int
  ){
    posts(
      clubName: $clubName
      username: $username
      begin: $begin
      end: $end
    ){
      author{
        name
      } 
      title
      clubName
      body
      comments{
        commenter{
          name
        }
        createTime
        body
      }
    }
  }
`;