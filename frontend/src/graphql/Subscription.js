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

export const POSTS_SUBSCRIPTION = gql`
subscription Club(
  $clubname: String
) {
  Club(
      clubname: $clubname
  ) {
    mutation
      data
        {
          _id
          author{
            name
          } 
          title
          clubName
          body
        }
    }
  }
`;

export const POSTS_SUBSCRIPTION_IN_HOMEPAGE = gql`
subscription  
{
  ClubInHomePage 
  {
    mutation
      data
        {
          _id
          author{
            name
          } 
          title
          clubName
          body
        }
    }
  }
`;

export const COMMENTS_SUBSCRIPTION = gql`
subscription Post(
  $postId: ID
){
    Post(
      postId: $postId
    ){
      data{
        commenter{
          name
        }
        createTime
        body
      }
    }
}
`;
