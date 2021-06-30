import {useState} from 'react';
import { IconButton } from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import Post from '../components/Post';
import { useFlag } from '../hooks/useFlag';
import {QUERY_POSTS} from "../graphql/Query";
import {useQuery} from '@apollo/react-hooks';
import { useCommonProps } from "../containers/ClubBook";


function HomePagePosts(){

    const {me} = useCommonProps();
    const [page, setPage] = useState(0);
    const posts = useQuery(QUERY_POSTS, {variables: {username: me, begin: 1+6*page, end: 6*(page+1)}});
    const nextPost = useQuery(QUERY_POSTS, {variables: {username: me, begin: 6*(page+1)+1, end: 6*(page+1)+1}});
    let title = posts?.data?.posts?.map(post => {return post.title});
    let author = posts?.data?.posts?.map(post => {return post.author.name});
    let content = posts?.data?.posts?.map(post => {return post.body});
    let comments = posts?.data?.posts?.map(post => {return post.comments});
    let clubname = posts?.data?.posts?.map(post => {return post.clubName});
    let postsCount = posts?.data?.posts?.length;
    let disableNextPage = nextPost?.data?.posts?.length===0 ? true : false ;
    const [postClick, setPostClick] = useState('');
    const {postOriginal, setPostOriginal} = useFlag();

    return(
        <>
            {((postClick === '' || !postOriginal) && postsCount>=1) ? 
            <div style={{position: 'absolute', left: 80, bottom: -200, width: 450, height: 200}} onClick={()=>{setPostClick('0');setPostOriginal(true);}}>
                <Post clubname={clubname[0]} title={title[0]} author={author[0]} content={content[0]} comments={comments[0]}/>
            </div> :  (postClick === '0') ? 
            <div style={{position: 'absolute', left: 550, bottom: -250, width: 450, height: 200}}>
                <Post clubname={clubname[0]} title={title[0]} author={author[0]} content={content[0]} comments={comments[0]}/>
            </div> : <></>}

            {((postClick === '' || !postOriginal) && postsCount>=2) ?
            <div style={{position: 'absolute', left: 560, bottom: -200, width: 450, height: 200}} onClick={()=>{setPostClick('1');setPostOriginal(true);}}>
                <Post clubname={clubname[1]} title={title[1]} author={author[1]} content={content[1]} comments={comments[1]}/>
            </div> : (postClick === '1') ? 
            <div style={{position: 'absolute', left: 550, bottom: -250, width: 450, height: 200}}>
                <Post clubname={clubname[1]} title={title[1]} author={author[1]} content={content[1]} comments={comments[1]}/>
            </div> : <></>}

            {((postClick === '' || !postOriginal) && postsCount>=3) ?
            <div style={{position: 'absolute', left: 1040, bottom: -200, width: 450, height: 200}} onClick={()=>{setPostClick('2');setPostOriginal(true);}}>
                <Post clubname={clubname[2]} title={title[2]} author={author[2]} content={content[2]} comments={comments[2]}/>
            </div> : (postClick === '2') ? 
            <div style={{position: 'absolute', left: 550, bottom: -250, width: 450, height: 200}}>
                <Post clubname={clubname[2]} title={title[2]} author={author[2]} content={content[2]} comments={comments[2]}/>
            </div> : <></>}

            {((postClick === '' || !postOriginal) && postsCount>=4) ?
            <div style={{position: 'absolute', left: 80, bottom: -520, width: 450, height: 200}} onClick={()=>{setPostClick('3');setPostOriginal(true);}}>
                <Post clubname={clubname[3]} title={title[3]} author={author[3]} content={content[3]} comments={comments[3]}/>
            </div> : (postClick === '3') ? 
            <div style={{position: 'absolute', left: 550, bottom: -250, width: 450, height: 200}}>
                <Post clubname={clubname[3]} title={title[3]} author={author[3]} content={content[3]} comments={comments[3]}/>
            </div> : <></>}

            {((postClick === '' || !postOriginal) && postsCount>=5) ? 
            <div style={{position: 'absolute', left: 560, bottom: -520, width: 450, height: 200}} onClick={()=>{setPostClick('4');setPostOriginal(true);}}>
                <Post clubname={clubname[4]} title={title[4]} author={author[4]} content={content[4]} comments={comments[4]}/>
            </div> :  (postClick === '4') ?
            <div style={{position: 'absolute', left: 550, bottom: -250, width: 450, height: 200}}>
                <Post clubname={clubname[4]} title={title[4]} author={author[4]} content={content[4]} comments={comments[4]}/>
            </div> : <></>}

            {((postClick === '' || !postOriginal) && postsCount>=6) ? 
            <div style={{position: 'absolute', left: 1040, bottom: -520, width: 450, height: 200}} onClick={()=>{setPostClick('5');setPostOriginal(true);}}>
                <Post clubname={clubname[5]} title={title[5]} author={author[5]} content={content[5]} comments={comments[5]}/>
            </div> : (postClick === '5') ?
            <div style={{position: 'absolute', left: 550, bottom: -250, width: 450, height: 200}}>
                <Post clubname={clubname[5]} title={title[5]} author={author[5]} content={content[5]} comments={comments[5]}/>
            </div> : <></>}

            {(postClick === '' || !postOriginal) ?
            <>
            <div style={{position: 'absolute', left: 1470, bottom: -340}}>
                <IconButton disabled={disableNextPage} onClick={()=>setPage(page => {return page+1;})}>
                    <NavigateNextIcon/>
                </IconButton>
            </div>
            <div style={{position: 'absolute', left: 50, bottom: -340}}>
                <IconButton disabled={page == 0 ? true : false} onClick={()=>setPage(page => {return page-1;})}>
                    <NavigateBeforeIcon/>
                </IconButton>
            </div> </> : <></>}
        </> 
    );
};

export default HomePagePosts;