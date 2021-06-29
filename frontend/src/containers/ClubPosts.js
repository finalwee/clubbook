import {useState} from 'react';
import { IconButton } from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import Post from '../components/Post';
import ClubHeader from '../components/ClubHeader';
import { useFlag } from '../hooks/useFlag';


function ClubPosts({clubname,}){

    const [title, setTitle] = useState(["唐詩分享", '打羽球',  '寫web', '吹口琴', '彈鋼琴']);
    const [author, setAuthor] = useState(["Rick Huang",  'Ivone', 'David 周', 'Andy', 'Clover']);
    const [content, setContent] = useState(["床前明月光，疑是地上霜，舉頭望明月，低頭思故鄉", "我很會打羽球",  'web好難', '爽爽吹口琴', '我強!']);
    const [comments, setComments] = useState([[{ author: "Eric", comment_time: '2021-06-26T19:24:00', content: "一首好詩" }], [], [], [], []])
    const [postClick, setPostClick] = useState('');
    const {postOriginal, setPostOriginal} = useFlag();
    const createPost = ({ Title, Author, Content }) => {
        setTitle([...title, Title]);
        setAuthor([...author, Author]);
        setContent([...content, Content]);
        setComments([...comments, []]);
    }
    
    return(
        <>
            {(postClick === '' || !postOriginal)  ? 
            <div style={{position: 'absolute', left: 80, bottom: -200, width: 450, height: 200}} onClick={()=>{setPostClick('0');setPostOriginal(true);}}>
                <Post clubname={clubname} title={title[0]} author={author[0]} content={content[0]} comments={comments[0]}/>
            </div> :  (postClick === '0') ? 
            <div style={{position: 'absolute', left: 550, bottom: -250, width: 450, height: 200}}>
                <Post clubname={clubname} title={title[0]} author={author[0]} content={content[0]} comments={comments[0]}/>
            </div> : <></>}

            {(postClick === '' || !postOriginal) ?
            <div style={{ position: 'absolute', left: 560, bottom: -200, width: 450, height: 200 }}>
                <ClubHeader clubname={clubname} createPost={createPost} />
            </div> : <></>}

            {(postClick === '' || !postOriginal)  ?
            <div style={{position: 'absolute', left: 1040, bottom: -200, width: 450, height: 200}} onClick={()=>{setPostClick('1');setPostOriginal(true);}}>
                <Post clubname={clubname} title={title[1]} author={author[1]} content={content[1]} comments={comments[1]}/>
            </div> : (postClick === '1') ? 
            <div style={{position: 'absolute', left: 550, bottom: -250, width: 450, height: 200}}>
                <Post clubname={clubname} title={title[1]} author={author[1]} content={content[1]} comments={comments[1]}/>
            </div> : <></>}

            {(postClick === '' || !postOriginal)  ?
            <div style={{position: 'absolute', left: 80, bottom: -520, width: 450, height: 200}} onClick={()=>{setPostClick('2');setPostOriginal(true);}}>
                <Post clubname={clubname} title={title[2]} author={author[2]} content={content[2]} comments={comments[2]}/>
            </div> : (postClick === '2') ? 
            <div style={{position: 'absolute', left: 550, bottom: -250, width: 450, height: 200}}>
                <Post clubname={clubname} title={title[2]} author={author[2]} content={content[2]} comments={comments[2]}/>
            </div> : <></>}

            {(postClick === '' || !postOriginal)  ? 
            <div style={{position: 'absolute', left: 560, bottom: -520, width: 450, height: 200}} onClick={()=>{setPostClick('3');setPostOriginal(true);}}>
                <Post clubname={clubname} title={title[3]} author={author[3]} content={content[3]} comments={comments[3]}/>
            </div> :  (postClick === '3') ?
            <div style={{position: 'absolute', left: 550, bottom: -250, width: 450, height: 200}}>
                <Post clubname={clubname} title={title[3]} author={author[3]} content={content[3]} comments={comments[3]}/>
            </div> : <></>}

            {(postClick === '' || !postOriginal)  ? 
            <div style={{position: 'absolute', left: 1040, bottom: -520, width: 450, height: 200}} onClick={()=>{setPostClick('4');setPostOriginal(true);}}>
                <Post clubname={clubname} title={title[4]} author={author[4]} content={content[4]} comments={comments[4]}/>
            </div> : (postClick === '4') ?
            <div style={{position: 'absolute', left: 550, bottom: -250, width: 450, height: 200}}>
                <Post clubname={clubname} title={title[4]} author={author[4]} content={content[4]} comments={comments[4]}/>
            </div> : <></>}

            {(postClick === '' || !postOriginal) ?
            <>
            <div style={{position: 'absolute', left: 1470, bottom: -340}}>
                <IconButton>
                    <NavigateNextIcon/>
                </IconButton>
            </div>
            <div style={{position: 'absolute', left: 50, bottom: -340}}>
                <IconButton>
                    <NavigateBeforeIcon/>
                </IconButton>
            </div> </> : <></>}
        </>
    );
};

export default ClubPosts;