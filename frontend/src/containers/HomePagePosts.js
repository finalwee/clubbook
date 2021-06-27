import {useState} from 'react';
import { IconButton } from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import Post from '../components/Post';


function HomePagePosts({recover, setRecover}){

    const [clubname, setClubName] = useState(['文學社', '羽球社', '桌球社', '網服社', '口琴社', '鋼琴社']);
    const [title, setTitle] = useState(["唐詩分享", '打羽球', '打桌球', '寫web', '吹口琴', '彈鋼琴']);
    const [author, setAuthor] = useState(["Rick Huang", 'Listen', 'Ivone', 'David 周', 'Andy', 'Clover']);
    const [content, setContent] = useState(["床前明月光，疑是地上霜，舉頭望明月，低頭思故鄉", "我很會打羽球", '我很會打桌球', 'web好難', '爽爽吹口琴', '我強!']);
    const [comments, setComments] = useState([[{ username: "Eric", comment_time: '2021-06-26T19:24:00', content: "一首好詩" }], [], [], [], [], []])
    const [postClick, setPostClick] = useState('');

    return(
        <>
            {(postClick === '' || recover)  ? 
            <div style={{position: 'absolute', left: 80, bottom: -200, width: 450, height: 200}} onClick={()=>{setPostClick('0');setRecover(false);}}>
                <Post clubname={clubname[0]} title={title[0]} author={author[0]} content={content[0]} comments={comments[0]}/>
            </div> :  (postClick === '0') ? 
            <div style={{position: 'absolute', left: 500, bottom: -200, width: 450, height: 200}}>
                <Post clubname={clubname[0]} title={title[0]} author={author[0]} content={content[0]} comments={comments[0]}/>
            </div> : <></>}

            {(postClick === '' || recover)  ?
            <div style={{position: 'absolute', left: 560, bottom: -200, width: 450, height: 200}} onClick={()=>{setPostClick('1');setRecover(false);}}>
                <Post clubname={clubname[1]} title={title[1]} author={author[1]} content={content[1]} comments={comments[1]}/>
            </div> : (postClick === '1') ? 
            <div style={{position: 'absolute', left: 500, bottom: -200, width: 450, height: 200}}>
                <Post clubname={clubname[1]} title={title[1]} author={author[1]} content={content[1]} comments={comments[1]}/>
            </div> : <></>}

            {(postClick === '' || recover)  ?
            <div style={{position: 'absolute', left: 1040, bottom: -200, width: 450, height: 200}} onClick={()=>{setPostClick('2');setRecover(false);}}>
                <Post clubname={clubname[2]} title={title[2]} author={author[2]} content={content[2]} comments={comments[2]}/>
            </div> : (postClick === '2') ? 
            <div style={{position: 'absolute', left: 500, bottom: -200, width: 450, height: 200}}>
                <Post clubname={clubname[2]} title={title[2]} author={author[2]} content={content[2]} comments={comments[2]}/>
            </div> : <></>}

            {(postClick === '' || recover)  ?
            <div style={{position: 'absolute', left: 80, bottom: -520, width: 450, height: 200}} onClick={()=>{setPostClick('3');setRecover(false);}}>
                <Post clubname={clubname[3]} title={title[3]} author={author[3]} content={content[3]} comments={comments[3]}/>
            </div> : (postClick === '3') ? 
            <div style={{position: 'absolute', left: 500, bottom: -200, width: 450, height: 200}}>
                <Post clubname={clubname[3]} title={title[3]} author={author[3]} content={content[3]} comments={comments[3]}/>
            </div> : <></>}

            {(postClick === '' || recover)  ? 
            <div style={{position: 'absolute', left: 560, bottom: -520, width: 450, height: 200}} onClick={()=>{setPostClick('4');setRecover(false);}}>
                <Post clubname={clubname[4]} title={title[4]} author={author[4]} content={content[4]} comments={comments[4]}/>
            </div> :  (postClick === '4') ?
            <div style={{position: 'absolute', left: 500, bottom: -200, width: 450, height: 200}}>
                <Post clubname={clubname[4]} title={title[4]} author={author[4]} content={content[4]} comments={comments[4]}/>
            </div> : <></>}

            {(postClick === '' || recover)  ? 
            <div style={{position: 'absolute', left: 1040, bottom: -520, width: 450, height: 200}} onClick={()=>{setPostClick('5');setRecover(false);}}>
                <Post clubname={clubname[5]} title={title[5]} author={author[5]} content={content[5]} comments={comments[5]}/>
            </div> : (postClick === '5') ?
            <div style={{position: 'absolute', left: 500, bottom: -200, width: 450, height: 200}}>
                <Post clubname={clubname[5]} title={title[5]} author={author[5]} content={content[5]} comments={comments[5]}/>
            </div> : <></>}

            {(postClick === '' || recover) ?
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

export default HomePagePosts;