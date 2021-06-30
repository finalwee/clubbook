import { useState } from 'react';
import {
    Paper,
    Grid,
    Avatar,
    Button,
    ButtonGroup,
    Card,
    IconButton,
} from '@material-ui/core';
import { useCommonProps } from "../containers/ClubBook";
import {QUERY_USERS} from "../graphql/Query";
import {useQuery} from '@apollo/react-hooks';


function PersonalProfile() {

    const {me} = useCommonProps();
    const userInfo = useQuery(QUERY_USERS, {variables: {username: me}});
    let email = userInfo?.data?.user?.email;
    let favourite = userInfo?.data?.user?.favourite;
    let clubs = userInfo?.data?.user?.subscribe?.map(club => {return club.name});
    let friends = userInfo?.data?.user?.friends?.map(friend => {return friend.name});
    email = email === undefined ? '' : email;
    favourite = favourite === undefined ? '' : favourite;
    clubs = clubs === undefined ? [] : clubs;
    friends = friends === undefined ? [] : friends;
    // const [email, setEmail] = useState('b06901168@ntu.edu.tw');
    // const [favourite, setFavourite] = useState('sleep');
    // const [friends, setFriends] = useState(['Peter', 'Jeff', 'Kevin', 'Edan', 'Kane', 'Lisheng', 'David']);
    // const [clubs, setClubs] = useState(['羽球社', '網球社', '鋼琴社', '口琴社', '國樂社', '美食社', '書法社']);
    const [aboutvisible, setAboutvisible] = useState('hidden');
    const [friendvisible, setFriendvisible] = useState('hidden');
    const [clubvisible, setClubvisible] = useState('hidden');
    const [aboutbuttonvisible, setAboutbuttonvisible] = useState('visible');
    const [friendbuttonvisible, setFriendbuttonvisible] = useState('visible');
    const [clubbuttonvisible, setClubbuttonvisible] = useState('visible');
    const calname = (name) => {
        let length = 0;
        for (let i = 0; i < name.length; i++) {
            if (name[i].match(/^[0-9a-z]+$/) !== null) {
                length += 1;
            } else {
                length += 2;
            }
        }
        return length;
    }

    const handleaboutvisible = () => {
        setFriendvisible('hidden');
        setClubvisible('hidden');
        if (aboutvisible == 'hidden') {
            setAboutvisible('visible');
            setAboutbuttonvisible('visible');
            setFriendbuttonvisible('hidden');
            setClubbuttonvisible('hidden');
        }
        else {
            setAboutvisible('hidden');
            setAboutbuttonvisible('visible');
            setFriendbuttonvisible('visible');
            setClubbuttonvisible('visible');
        }
    }

    const handlefriendvisible = () => {
        setAboutvisible('hidden');
        setClubvisible('hidden');
        if (friendvisible == 'hidden') {
            setFriendvisible('visible');
            setAboutbuttonvisible('hidden');
            setFriendbuttonvisible('visible');
            setClubbuttonvisible('hidden');
        }
        else {
            setFriendvisible('hidden');
            setAboutbuttonvisible('visible');
            setFriendbuttonvisible('visible');
            setClubbuttonvisible('visible');
        }
    }

    const handleclubvisible = () => {
        setAboutvisible('hidden');
        setFriendvisible('hidden');
        if (clubvisible == 'hidden') {
            setClubvisible('visible');
            setAboutbuttonvisible('hidden');
            setFriendbuttonvisible('hidden');
            setClubbuttonvisible('visible');
        }
        else {
            setClubvisible('hidden');
            setAboutbuttonvisible('visible');
            setFriendbuttonvisible('visible');
            setClubbuttonvisible('visible');
        }
    }

    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'row', position: 'absolute', left: 687.5 - 12.5 * calname(me), bottom: -250, width: 450, height: 200 }}>
                <Avatar alt={me} style={{ height: '7em', width: '7em' }} />
                <p style={{ fontSize: '4em', paddingTop: '0.6em', paddingLeft: '0.5em' }}>{me}</p>
            </div>
            <div style={{ visibility: aboutbuttonvisible, position: 'absolute', left: (aboutvisible == 'hidden') ? 470 : 670, bottom: -350 }}>
                <Button
                    color='primary'
                    variant='contained'
                    onClick={handleaboutvisible}
                    style={{ height: '2em', width: '6em', fontSize: '2em', borderRadius: '10em' }}>About</Button>
            </div>
            <div style={{ visibility: friendbuttonvisible, position: 'absolute', left: 670, bottom: -350 }}>
                <Button
                    color='primary'
                    variant='contained'
                    onClick={handlefriendvisible}
                    style={{ height: '2em', width: '6em', fontSize: '2em', borderRadius: '10em' }}>Friend</Button>
            </div>
            <div style={{ visibility: clubbuttonvisible, position: 'absolute', left: (clubvisible == 'hidden') ? 870 : 670, bottom: -350 }}>
                <Button
                    color='primary'
                    variant='contained'
                    onClick={handleclubvisible}
                    style={{ height: '2em', width: '6em', fontSize: '2em', borderRadius: '10em' }}>Club</Button>
            </div>
            <div style={{ position: 'absolute', left: 600, bottom: -600, overflow: 'auto', visibility: aboutvisible }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <p style={{ fontSize: '2em', marginLeft: '1em' }}>email:</p>
                    <p style={{ fontSize: '2em', marginLeft: '1em', color: 'gray' }}>{email}</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <p style={{ fontSize: '2em', marginLeft: '1em' }}>Favourite:</p>
                    <p style={{ fontSize: '2em', marginLeft: '1em', color: 'gray' }}>{favourite}</p>
                </div>
            </div>
            <div style={{ visibility: friendvisible }}>
                {friends.map(function (friend, index) {
                    const row = Math.floor(index / 3);
                    const column = index % 3;
                    return (<div style={{ textAlign: 'center', position: 'absolute', left: 500 + 220 * column, bottom: -430 - 100 * row, fontSize: '30px' }}>
                        {friend}
                    </div>)
                })}
            </div>
            <div style={{ visibility: clubvisible }}>
                {clubs.map(function (club, index) {
                    const row = Math.floor(index / 3);
                    const column = index % 3;
                    return (<div style={{ textAlign: 'center', position: 'absolute', left: 480 + 220 * column, bottom: -430 - 100 * row, fontSize: '30px' }}>
                        {club}
                    </div>)
                })}
            </div>
        </>
    );
};

export default PersonalProfile;