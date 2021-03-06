import { useCallback, useState, useEffect } from "react";
import {
    Avatar,
    Button,
    ButtonGroup,
    Card,
    IconButton,
} from '@material-ui/core';
import { Input } from "antd";
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import { CardHeader, CardMedia, CardContent, Typography, CardActions, Collapse } from "@material-ui/core";
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useFlag } from "../hooks/useFlag";
import { useCommonProps } from "../containers/ClubBook";
import { useMutation, useQuery } from '@apollo/react-hooks';
import { CREATE_COMMENT_MUTATION } from "../graphql/Mutation";
import { QUERY_COMMENTS } from "../graphql/Query";
import { COMMENTS_SUBSCRIPTION } from "../graphql/Subscription";


function Post({ clubname, title, author, content,  id }) {

    let comments = useQuery(QUERY_COMMENTS, { variables: {postId: id}});
    let subscribeToMore = comments?.subscribeToMore;
    comments = comments?.data === undefined ? [] : comments?.data?.comments;
    const [messageInput, setMessageInput] = useState("");
    const [expanded, setExpanded] = useState(false);
    const [moodexpanded_primary, setMoodexpanded_primary] = useState(false);
    const [moodexpanded_secondary, setMoodexpanded_secondary] = useState(false);
    const [show, setShow] = useState(true);
    const { postOriginal } = useFlag();
    const { me, displayStatus } = useCommonProps();
    const [createPostComment] = useMutation(CREATE_COMMENT_MUTATION);
    const createComment = useCallback(async ({ body, commenter, postId }) => {
        const success = await createPostComment({
            variables: {
                body: body,
                commenter: commenter,
                postId: postId
            },
        });
    }, [createPostComment]
    )

    useEffect(() => {
        subscribeToMore({
            document: COMMENTS_SUBSCRIPTION,
            variables: { postId: id },
            updateQuery: (prev, {subscriptionData}) => {
                if(!subscriptionData.data) return prev;
                const newComment = subscriptionData.data.Post.data;

                if (prev !== undefined) {
                    return({comments: [...prev.comments, ...newComment]})
                }
            }
        })
    }, [subscribeToMore]);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    const handleMouseover_primary = () => {
        setMoodexpanded_primary(true);
    };
    const handleMouseout_primary = () => {
        setMoodexpanded_primary(false);
    };
    const handleMouseover_secondary = () => {
        setMoodexpanded_secondary(true);
    };
    const handleMouseout_secondary = () => {
        setMoodexpanded_secondary(false);
    };
    const Calculate_time_difference = (post_time) => {
        const current_time_numerical = new Date().getTime();
        const difference_second = Math.floor((current_time_numerical - post_time) / 1000);
        const difference_minute = Math.floor(difference_second / 60);
        const difference_hour = Math.floor(difference_minute / 60);
        const difference_day = Math.floor(difference_hour / 24);
        const difference_week = Math.floor(difference_day / 7);
        var date;
        if (difference_week > 0) {
            date = difference_week + ((difference_week < 2) ? " week ago" : " weeks ago");
        }
        else if (difference_day > 0) {
            date = difference_day + ((difference_day < 2) ? " day ago" : " days ago");
        }
        else if (difference_hour > 0) {
            date = difference_hour + ((difference_hour < 2) ? " hour ago" : " hours ago");
        }
        else if (difference_minute > 0) {
            date = difference_minute + ((difference_minute < 2) ? " minute ago" : " minutes ago");
        }
        else if (difference_second > 0) {
            date = difference_second + ((difference_second < 2) ? " second ago" : " seconds ago");
        }
        else {
            date = "now";
        }
        return date;
    };
    return (
        <div style={postOriginal ? { padding: 16, margin: 'auto', maxWidth: 600 } : { padding: 16, margin: 'auto', width: 450 }}>{/*??????width */}
            {(show || postOriginal) ?
                <Card style={postOriginal ? { backgroundColor: "white", padding: 20 } : { backgroundColor: "white", padding: 20, height: 280 }}
                    onMouseOver={() => setShow(() => { return false })}>{/*??????height*/}
                    <CardHeader
                        avatar={
                            <Avatar alt={author} style={{ height: '2.5em', width: '2.5em' }} />
                        }
                        title={title}
                        subheader={author}
                    />
                    <CardContent style={postOriginal ? {} : { height: 300 }}>{/*??????height*/}
                        <Typography variant="body2" color="textSecondary" component="p">
                            {content}
                        </Typography>
                    </CardContent>
                    <CardMedia style={{ height: 0, paddingTop: '56.25%', }}
                        image="/static/images/cards/paella.jpg"
                        alt={title}
                    />
                    <CardActions disableSpacing>
                        <ButtonGroup size="large" aria-label="small outlined button group" variant="text" >
                            <Button
                                onMouseOver={handleMouseover_primary}
                                onMouseOut={handleMouseout_primary}
                                aria-expanded={moodexpanded_primary}
                                aria-label="mood_primary"
                            >
                                <ThumbUpIcon style={{ marginRight: "0.3em" }}></ThumbUpIcon>Like</Button>
                            <Button
                                onClick={handleExpandClick}
                                aria-expanded={expanded}
                                aria-label="show more">
                                <QuestionAnswerIcon style={{ marginRight: "0.3em" }}></QuestionAnswerIcon>Comment</Button>
                            <Button><BookmarkIcon style={{ marginRight: "0.3em" }}></BookmarkIcon>Collection</Button>
                        </ButtonGroup>
                    </CardActions>
                    <Collapse
                        in={moodexpanded_primary || moodexpanded_secondary}
                        timeout="auto"
                        unmountOnExit
                        style={{ zIndex: 2, position: 'absolute' }}
                        onMouseOver={handleMouseover_secondary}
                        onMouseOut={handleMouseout_secondary}
                        aria-expanded={moodexpanded_secondary}
                        aria-label="mood_primary">
                        <ButtonGroup size="small" aria-label="small outlined button group" variant="text">
                            <IconButton><FavoriteIcon /></IconButton>
                            <IconButton><ShareIcon /></IconButton>
                            <IconButton><ExpandMoreIcon /></IconButton>
                        </ButtonGroup>
                    </Collapse>
                    <div style={{ height: "0.5em" }}></div>
                    <div style={{ height: "auto" }}>
                        <Collapse in={expanded} timeout="auto" unmountOnExit>
                            <CardContent>
                                <div style={{ backgroundColor: "white", display: "flex", justifyContent: "center", flexDirection: "column", width: "24.4em", height: '15em', overflow: 'auto' }}>
                                    {

                                        (comments.length === 0) ?
                                            <></>
                                            :
                                            comments.map(function (comment) {
                                                return (
                                                    <div style={{ backgroundColor: "white", width: "18em", marginTop: '0.2em' }}>
                                                        <div style={{ marginTop: '0.2em' }}>
                                                            <Avatar alt={comment?.commenter?.name} src={comment?.photo} style={{ float: 'left', marginTop: '0.2em', marginRight: '0.5em', height: '1.5em', width: '1.5em' }} />
                                                            <div style={{ float: 'left' }}>
                                                                <div style={{ backgroundColor: "#DDDDDD", width: "auto", height: "auto", borderRadius: "0.5em" }}>
                                                                    <p style={{ marginTop: '0.3em', marginLeft: '0.3em', marginRight: '0.3em' }}>{comment?.commenter?.name}</p>
                                                                    <p style={{ marginTop: '-1em', marginLeft: '0.3em', marginRight: '0.3em', marginBottom: '0.2em' }}>{comment?.body}</p>
                                                                </div>
                                                                <p style={{ color: 'gray', textAlign: 'left', fontSize: '0.3em' }}> {Calculate_time_difference(comment?.createTime)} </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })
                                    }
                                </div>
                                <Input.Search
                                    value={messageInput}
                                    onChange={(e) =>
                                        setMessageInput(e.target.value)}
                                    enterButton="Send"
                                    placeholder=
                                    "Enter comment here..."
                                    onSearch={(msg) => {
                                        if (!msg) {
                                            displayStatus({
                                                type: "error",
                                                msg: "Please enter comment.",
                                            });
                                            return;
                                        }
                                        createComment({ body: msg, commenter: me, postId: id })
                                        setMessageInput("");
                                    }}
                                ></Input.Search>
                            </CardContent>
                        </Collapse>
                    </div>
                </Card >
                :
                <Card style={{ backgroundColor: "white", height: 280 }} onMouseOut={() => setShow(true)}>
                    <div style={{
                        width: 418, height: 280, fontSize: 45, overflowWrap: 'break-word',
                        opacity: 0.7, backgroundColor: 'rgb(97, 188, 241)'
                    }}>
                        <CardHeader
                            avatar={
                                <Avatar alt={author} style={{ height: '2.5em', width: '2.5em' }} />
                            }
                            title={title}
                            subheader={author}
                            textAlign='start'
                            style={{ opacity: 0.6 }}
                        />
                        <div style={{ textAlign: "center", marginTop: 40, marginBottom: 10 * (Math.floor(clubname.length / 7)) }}>{clubname}</div>
                    </div>
                </Card>
            }
        </div >
    );


}

export default Post;