import {useState} from 'react';
import { IconButton } from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import Post from '../components/Post';


function ClubPosts({clubname}){

    const [title, setTitle] = useState(["唐詩分享", '打羽球',  '寫web', '吹口琴', '彈鋼琴']);
    const [author, setAuthor] = useState(["Rick Huang",  'Ivone', 'David 周', 'Andy', 'Clover']);
    const [content, setContent] = useState(["床前明月光，疑是地上霜，舉頭望明月，低頭思故鄉", "我很會打羽球",  'web好難', '爽爽吹口琴', '我強!']);
    const [comments, setComments] = useState([[{ username: "Eric", comment_time: '2021-06-26T19:24:00', content: "一首好詩" }], [], [], [], []])
    
    return(
        <>
            <div style={{position: 'absolute', left: 80, bottom: -200, width: 450, height: 200}}>
                <Post clubname={clubname} title={title[0]} author={author[0]} content={content[0]} comments={comments[0]}/>
            </div>
            <div style={{position: 'absolute', left: 1040, bottom: -200, width: 450, height: 200}}>
                <Post clubname={clubname} title={title[1]} author={author[1]} content={content[1]} comments={comments[1]}/>
            </div>
            <div style={{position: 'absolute', left: 80, bottom: -520, width: 450, height: 200}}>
                <Post clubname={clubname} title={title[2]} author={author[2]} content={content[2]} comments={comments[2]}/>
            </div>
            <div style={{position: 'absolute', left: 560, bottom: -520, width: 450, height: 200}}>
                <Post clubname={clubname} title={title[3]} author={author[3]} content={content[3]} comments={comments[3]}/>
            </div>
            <div style={{position: 'absolute', left: 1040, bottom: -520, width: 450, height: 200}}>
                <Post clubname={clubname} title={title[4]} author={author[4]} content={content[4]} comments={comments[4]}/>
            </div>
            <div style={{position: 'absolute', left: 1470, bottom: -340}}>
                <IconButton>
                    <NavigateNextIcon/>
                </IconButton>
            </div>
            <div style={{position: 'absolute', left: 50, bottom: -340}}>
                <IconButton>
                    <NavigateBeforeIcon/>
                </IconButton>
            </div>
        </>
    );
};

export default ClubPosts;