import { useCallback, useState } from "react";
import {
    Card,
    IconButton,
} from '@material-ui/core';
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';
import { CardContent, Typography, } from "@material-ui/core";
import CreatePostModal from '../components/CreatePostModal';
import { useCommonProps } from "../containers/ClubBook";
import { JOINED_CLUB_MUTATION, UPDATE_USER_MUTATION } from "../graphql/Mutation";
import { useMutation } from '@apollo/react-hooks';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

function ClubHeader({ clubname, createPost, setClubSelected }) {
    const [modalVisible, setModalVisible] = useState(false);
    const { me } = useCommonProps();
    const addPost = () => { setModalVisible(true); };
    const [hasjoinedClub, setHasJoinedClub] = useState(false);
    const [joinedClub] = useMutation(JOINED_CLUB_MUTATION);
    const [updateUser] = useMutation(UPDATE_USER_MUTATION);
    const joinedclub = useCallback(async ({ userName, clubName }) => {
        const success = await joinedClub({
            variables: {
                userName: userName,
                clubName: clubName
            },
        });
        setHasJoinedClub(success.data.joinedClub);
    }, [joinedClub]
    );
    const addClub = useCallback(async () => {
        await updateUser({
            variables: {
                username: me,
                subscribe: clubname
            },
        });
        setHasJoinedClub(true);
    }, [updateUser, clubname]
    );
    joinedclub({ userName: me, clubName: clubname })

    return (
        <div style={{ padding: 16, margin: 'auto' }}>{/*調整width */}
            <Card style={{ backgroundColor: "white", padding: 20, width: 420, height: 280, display: 'flex', justify: 'content', alignItems: 'center', flexDirection: 'column' }}>
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p" style={{ fontSize: '60px', textAlign: 'center' }}>
                        {clubname}
                    </Typography>
                </CardContent>
                {(hasjoinedClub === true
                ) ?
                    (<IconButton
                        onClick={addPost}>
                        <AddToPhotosIcon style={{ height: '3em', width: '3em' }} />
                    </IconButton>) :
                    (<IconButton
                        onClick={addClub}>
                        <PersonAddIcon style={{ height: '3em', width: '3em' }} />
                    </IconButton>)}
            </Card >
            <CreatePostModal
                visible={modalVisible}
                onCreate={({ Title, Content }) => {
                    const Author = me;
                    createPost({ author: Author, title: Title, body: Content, clubName: clubname });
                    setModalVisible(false);
                }}
                onCancel={() => {
                    setModalVisible(false);
                }
                }
            />
        </div >
    );


}

export default ClubHeader;