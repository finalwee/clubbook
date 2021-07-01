import { useState, useEffect } from 'react';
import { IconButton } from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import Post from '../components/Post';
import { useFlag } from '../hooks/useFlag';
import { QUERY_POSTS } from "../graphql/Query";
import { useQuery } from '@apollo/react-hooks';
import { useCommonProps } from "../containers/ClubBook";
import {POSTS_SUBSCRIPTION_IN_HOMEPAGE} from "../graphql/Subscription";


function HomePagePosts() {

    const { me } = useCommonProps();
    const [page, setPage] = useState(0);
    let posts = useQuery(QUERY_POSTS, { variables: { username: me } });
    let subscribeToMore = posts?.subscribeToMore;
    let postsCount = 0;
    let disableNextPage = true; 
    let postsLeft = posts?.data?.posts?.length - 6 * page;
    if (postsLeft > 6){
        postsCount = 6;
        disableNextPage = false;
    }else{
        postsCount = postsLeft;
        disableNextPage = true;
    }
    let title = posts?.data?.posts?.map(post => { return post.title });
    let author = posts?.data?.posts?.map(post => { return post.author.name });
    let content = posts?.data?.posts?.map(post => { return post.body });
    let comments = posts?.data?.posts?.map(post => { return post.comments });
    let clubname = posts?.data?.posts?.map(post => { return post.clubName });
    let id = posts?.data?.posts?.map(post => { return post._id });
    const [postClick, setPostClick] = useState('');
    const { postOriginal, setPostOriginal } = useFlag();

    useEffect(() => {
        subscribeToMore({
            document: POSTS_SUBSCRIPTION_IN_HOMEPAGE,
            updateQuery: (prev, {subscriptionData}) => {
                if(!subscriptionData.data) return prev;
                const newPost = subscriptionData.data.ClubInHomePage.data;
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
                    <Post clubname={clubname[0+6*page]} title={title[0+6*page]} author={author[0+6*page]} content={content[0+6*page]} comments={comments[0+6*page]} id={id[0+6*page]} />
                </div> : (postClick === '0' && postsCount >= 1) ?
                    <div style={{ position: 'absolute', left: 550, bottom: -250, width: 450, height: 200 }}>
                        <Post clubname={clubname[0+6*page]} title={title[0+6*page]} author={author[0+6*page]} content={content[0+6*page]} comments={comments[0+6*page]} id={id[0+6*page]} />
                    </div> : <></>}

            {((postClick === '' || !postOriginal) && postsCount >= 2) ?
                <div style={{ position: 'absolute', left: 560, bottom: -200, width: 450, height: 200 }} onClick={() => { setPostClick('1'); setPostOriginal(true); }}>
                    <Post clubname={clubname[1+6*page]} title={title[1+6*page]} author={author[1+6*page]} content={content[1+6*page]} comments={comments[1+6*page]} id={id[1+6*page]} />
                </div> : (postClick === '1' && postsCount >= 2) ?
                    <div style={{ position: 'absolute', left: 550, bottom: -250, width: 450, height: 200 }}>
                        <Post clubname={clubname[1+6*page]} title={title[1+6*page]} author={author[1+6*page]} content={content[1+6*page]} comments={comments[1+6*page]} id={id[1+6*page]} />
                    </div> : <></>}

            {((postClick === '' || !postOriginal) && postsCount >= 3) ?
                <div style={{ position: 'absolute', left: 1040, bottom: -200, width: 450, height: 200 }} onClick={() => { setPostClick('2'); setPostOriginal(true); }}>
                    <Post clubname={clubname[2+6*page]} title={title[2+6*page]} author={author[2+6*page]} content={content[2+6*page]} comments={comments[2+6*page]} id={id[2+6*page]} />
                </div> : (postClick === '2' && postsCount >= 3) ?
                    <div style={{ position: 'absolute', left: 550, bottom: -250, width: 450, height: 200 }}>
                        <Post clubname={clubname[2+6*page]} title={title[2+6*page]} author={author[2+6*page]} content={content[2+6*page]} comments={comments[2+6*page]} id={id[2+6*page]} />
                    </div> : <></>}

            {((postClick === '' || !postOriginal) && postsCount >= 4) ?
                <div style={{ position: 'absolute', left: 80, bottom: -520, width: 450, height: 200 }} onClick={() => { setPostClick('3'); setPostOriginal(true); }}>
                    <Post clubname={clubname[3+6*page]} title={title[3+6*page]} author={author[3+6*page]} content={content[3+6*page]} comments={comments[3+6*page]} id={id[3+6*page]} />
                </div> : (postClick === '3' && postsCount >= 4) ?
                    <div style={{ position: 'absolute', left: 550, bottom: -250, width: 450, height: 200 }}>
                        <Post clubname={clubname[3+6*page]} title={title[3+6*page]} author={author[3+6*page]} content={content[3+6*page]} comments={comments[3+6*page]} id={id[3+6*page]} />
                    </div> : <></>}

            {((postClick === '' || !postOriginal) && postsCount >= 5) ?
                <div style={{ position: 'absolute', left: 560, bottom: -520, width: 450, height: 200 }} onClick={() => { setPostClick('4'); setPostOriginal(true); }}>
                    <Post clubname={clubname[4+6*page]} title={title[4+6*page]} author={author[4+6*page]} content={content[4+6*page]} comments={comments[4+6*page]} id={id[4+6*page]} />
                </div> : (postClick === '4' && postsCount >= 5) ?
                    <div style={{ position: 'absolute', left: 550, bottom: -250, width: 450, height: 200 }}>
                        <Post clubname={clubname[4+6*page]} title={title[4+6*page]} author={author[4+6*page]} content={content[4+6*page]} comments={comments[4+6*page]} id={id[4+6*page]} />
                    </div> : <></>}

            {((postClick === '' || !postOriginal) && postsCount >= 6) ?
                <div style={{ position: 'absolute', left: 1040, bottom: -520, width: 450, height: 200 }} onClick={() => { setPostClick('5'); setPostOriginal(true); }}>
                    <Post clubname={clubname[5+6*page]} title={title[5+6*page]} author={author[5+6*page]} content={content[5+6*page]} comments={comments[5+6*page]} id={id[5+6*page]} />
                </div> : (postClick === '5' && postsCount >= 6) ?
                    <div style={{ position: 'absolute', left: 550, bottom: -250, width: 450, height: 200 }}>
                        <Post clubname={clubname[5+6*page]} title={title[5+6*page]} author={author[5+6*page]} content={content[5+6*page]} comments={comments[5+6*page]} id={id[5+6*page]} />
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

export default HomePagePosts;