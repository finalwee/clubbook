# CLUBBOOK (Group 47)
Mention: We will left our mongoose db url for 

## Setup project at localhost
Frontend\
`cd frontend` then `yarn install` or `npm install`\
Backend\
`cd backend` then `yarn install` or `npm install`

## Run app & test
### frontend
Run 
`yarn start`

### backend
Run
`yarn server`

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.\\

Test account:\
`Username: Shih`\
`Password: 123456`

You can login with test account or just create a new account.
![image](https://user-images.githubusercontent.com/34684871/124060545-dd087780-da5f-11eb-963c-fa8b2be800af.png)\

## Division of labor
B06901168 黃其澤: frontend\
B06901088 施淳仁: frontend\
B06901126 陳志偉: backend & deployment

## work for every teammate
B06901168 黃其澤
- frontend design :\
	post, clubHeader, PersonalProfile, CreatePostModal
- graphql connect to backend :\
	Mutation: create club, create post, create comment, join club

B06901088 施淳仁
- frontend design :\
	clubbook, clubposts, header, homepage, homepageposts, register, sidebar, signin
	chatroom (the extension of hw8), chatbox (the extension of hw8)
- graphql connect to backend :\
	Mutation: CREATE_CHATBOX_MUTATION, CREATE_MESSAGE_MUTATION, SEARCH_CLUB_MUTATION, SEARCH_FRIENDS_MUTATION, USER_LOGIN_MUTATION, CREATE_USER_MUTATION, UPDATE_USER_MUTATION
	
B06901126 陳志偉
- backend: \
	mongoose schema, most resolvers
- deployment: \
	[deploy on gcp](http://34.132.234.173/) 
	
## Reference
https://reactjsexample.com/react-side-nav-component/ \
https://material-ui.com/zh/
