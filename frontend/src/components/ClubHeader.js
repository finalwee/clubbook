import { useState } from "react";
import {
    Card,
    IconButton,
} from '@material-ui/core';
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';
import { CardContent, Typography, } from "@material-ui/core";
import CreatePostModal from '../components/CreatePostModal';
import { useCommonProps } from "../containers/ClubBook";

function ClubHeader({ clubname, createPost }) {
    const [modalVisible, setModalVisible] = useState(false);
    const {me} = useCommonProps();
    const addPost = () => { setModalVisible(true); };
    
    return (
        <div style={{ padding: 16, margin: 'auto' }}>{/*調整width */}
            <Card style={{ backgroundColor: "white", padding: 20, width: 420, height: 280, display: 'flex', justify: 'content', alignItems: 'center', flexDirection: 'column' }}>
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p" style={{ fontSize: '60px', textAlign: 'center' }}>
                        {clubname}
                    </Typography>
                </CardContent>
                <IconButton
                    onClick={addPost}>
                    <AddToPhotosIcon style={{ height: '3em', width: '3em' }} />
                </IconButton>
            </Card >
            <CreatePostModal
                visible={modalVisible}
                onCreate={({ Title, Content }) => {
                    const Author = me;
                    createPost({ Title, Author, Content });
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