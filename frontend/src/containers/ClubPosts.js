import { useCallback, useState, useEffect } from 'react';
import { IconButton } from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import Post from '../components/Post';
import ClubHeader from '../components/ClubHeader';
import { useFlag } from '../hooks/useFlag';
import { QUERY_POSTS } from "../graphql/Query";
import { useQuery } from '@apollo/react-hooks';
import { useMutation } from '@apollo/react-hooks';
import { CREATE_POST_MUTATION } from "../graphql/Mutation";
import {POSTS_SUBSCRIPTION} from "../graphql/Subscription";

function ClubPosts({ clubname, setClubSelected}) {

    const [page, setPage] = useState(0);
    let posts = useQuery(QUERY_POSTS, { variables: { clubName: clubname } });
    let subscribeToMore = posts?.subscribeToMore;
    let postsCount = 0;
    let disableNextPage = true; 
    let postsLeft = posts?.data?.posts?.length - 5 * page;
    if (postsLeft > 5){
        postsCount = 5;
        disableNextPage = false;
    }else{
        postsCount = postsLeft;
        disableNextPage = true;
    }
    let title = posts?.data?.posts?.map(post => { return post.title });
    let author = posts?.data?.posts?.map(post => { return post.author.name });
    let content = posts?.data?.posts?.map(post => { return post.body });
    let comments = posts?.data?.posts?.map(post => { return post.comments });
    let id = posts?.data?.posts?.map(post => { return post._id });
    
    const [postClick, setPostClick] = useState('');
    const { postOriginal, setPostOriginal } = useFlag();
    const [createClubPost] = useMutation(CREATE_POST_MUTATION);
    const createPost = useCallback(async ({ author, title, body, clubName }) => {
        const success = await createClubPost({
            variables: {
                author: author,
                title: title,
                body: body,
                clubName: clubName
            },
        });
    }, [createClubPost]
    )

    useEffect(() => {
        subscribeToMore({
            document: POSTS_SUBSCRIPTION,
            variables: { clubname },
            updateQuery: (prev, {subscriptionData}) => {
                if(!subscriptionData.data) return prev;
                const newPost = subscriptionData.data.Club.data;
                newPost.comments = [];

                if (prev !== undefined) {
                    return({posts: [...prev.posts, ...newPost]})
                }
            }
        })
    }, [subscribeToMore]);

    return (
        <>
            {((postClick === '' || !postOriginal) && postsCount >= 1) ?
                <div style={{ position: 'absolute', left: 80, bottom: -200, width: 450, height: 200 }} onClick={() => { setPostClick('0'); setPostOriginal(true); }}>
                    <Post clubname={clubname} title={title[0+5*page]} author={author[0+5*page]} content={content[0+5*page]} comments={comments[0+5*page]} id={id[0+5*page]} />
                </div> : (postClick === '0' && postsCount >= 1) ?
                    <div style={{ position: 'absolute', left: 550, bottom: -250, width: 450, height: 200 }}>
                        <Post clubname={clubname} title={title[0+5*page]} author={author[0+5*page]} content={content[0+5*page]} comments={comments[0+5*page]} id={id[0+5*page]} />
                    </div> : <></>}

            {(postClick === '' || !postOriginal) ?
                <div style={{ position: 'absolute', left: 560, bottom: -200, width: 450, height: 200 }}>
                    <ClubHeader clubname={clubname} createPost={createPost} setClubSelected={setClubSelected}/>
                </div> : <></>}

            {((postClick === '' || !postOriginal) && postsCount >= 2) ?
                <div style={{ position: 'absolute', left: 1040, bottom: -200, width: 450, height: 200 }} onClick={() => { setPostClick('1'); setPostOriginal(true); }}>
                    <Post clubname={clubname} title={title[1+5*page]} author={author[1+5*page]} content={content[1+5*page]} comments={comments[1+5*page]} id={id[1+5*page]} />
                </div> : (postClick === '1' && postsCount >= 2) ?
                    <div style={{ position: 'absolute', left: 550, bottom: -250, width: 450, height: 200 }}>
                        <Post clubname={clubname} title={title[1+5*page]} author={author[1+5*page]} content={content[1+5*page]} comments={comments[1+5*page]} id={id[1+5*page]} />
                    </div> : <></>}

            {((postClick === '' || !postOriginal) && postsCount >= 3) ?
                <div style={{ position: 'absolute', left: 80, bottom: -520, width: 450, height: 200 }} onClick={() => { setPostClick('2'); setPostOriginal(true); }}>
                    <Post clubname={clubname} title={title[2+5*page]} author={author[2+5*page]} content={content[2+5*page]} comments={comments[2+5*page]} id={id[2+5*page]} />
                </div> : (postClick === '2' && postsCount >= 3) ?
                    <div style={{ position: 'absolute', left: 550, bottom: -250, width: 450, height: 200 }}>
                        <Post clubname={clubname} title={title[2+5*page]} author={author[2+5*page]} content={content[2+5*page]} comments={comments[2+5*page]} id={id[2+5*page]} />
                    </div> : <></>}

            {((postClick === '' || !postOriginal) && postsCount >= 4) ?
                <div style={{ position: 'absolute', left: 560, bottom: -520, width: 450, height: 200 }} onClick={() => { setPostClick('3'); setPostOriginal(true); }}>
                    <Post clubname={clubname} title={title[3+5*page]} author={author[3+5*page]} content={content[3+5*page]} comments={comments[3+5*page]} id={id[3+5*page]} />
                </div> : (postClick === '3' && postsCount >= 4) ?
                    <div style={{ position: 'absolute', left: 550, bottom: -250, width: 450, height: 200 }}>
                        <Post clubname={clubname} title={title[3+5*page]} author={author[3+5*page]} content={content[3+5*page]} comments={comments[3+5*page]} id={id[3+5*page]} />
                    </div> : <></>}

            {((postClick === '' || !postOriginal) && postsCount >= 5) ?
                <div style={{ position: 'absolute', left: 1040, bottom: -520, width: 450, height: 200 }} onClick={() => { setPostClick('4'); setPostOriginal(true); }}>
                    <Post clubname={clubname} title={title[4+5*page]} author={author[4+5*page]} content={content[4+5*page]} comments={comments[4+5*page]} id={id[4+5*page]} />
                </div> : (postClick === '4' && postsCount >= 5) ?
                    <div style={{ position: 'absolute', left: 550, bottom: -250, width: 450, height: 200 }}>
                        <Post clubname={clubname} title={title[4+5*page]} author={author[4+5*page]} content={content[4+5*page]} comments={comments[4+5*page]} id={id[4+5*page]} />
                    </div> : <></>}

            {(postClick === '' || !postOriginal) ?
                <>
                    <div style={{ position: 'absolute', left: 1470, bottom: -340 }}>
                        <IconButton disabled={disableNextPage} onClick={() => setPage(page => { return page + 1; })}>
                            <NavigateNextIcon />
                        </IconButton>
                    </div>
                    <div style={{ position: 'absolute', left: 50, bottom: -340 }}>
                        <IconButton disabled={page == 0 ? true : false} onClick={() => setPage(page => { return page - 1; })}>
                            <NavigateBeforeIcon />
                        </IconButton>
                    </div> </> : <></>}
        </>
    );
};

export default ClubPosts;