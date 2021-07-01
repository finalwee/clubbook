import { useState } from 'react';
import {
    Avatar,
    Button,
} from '@material-ui/core';
import { useCommonProps } from "../containers/ClubBook";
import { QUERY_USERS } from "../graphql/Query";
import { useQuery } from '@apollo/react-hooks';


function PersonalProfile() {

    const { me } = useCommonProps();
    const userInfo = useQuery(QUERY_USERS, { variables: { username: me } });
    let email = userInfo?.data?.user?.email;
    let favorite = userInfo?.data?.user?.favourite;
    let clubs = userInfo?.data?.user?.subscribe?.map(club => { return club.name });
    email = email === undefined ? '' : email;
    favorite = favorite === undefined ? '' : favorite;
    clubs = clubs === undefined ? [] : clubs;
    const [emailvisible, setEmailvisible] = useState('hidden');
    const [favoritevisible, setFavoritevisible] = useState('hidden');
    const [clubvisible, setClubvisible] = useState('hidden');
    const [emailbuttonvisible, setEmailbuttonvisible] = useState('visible');
    const [favoritebuttonvisible, setFavoritebuttonvisible] = useState('visible');
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

    const handleemailvisible = () => {
        setFavoritevisible('hidden');
        setClubvisible('hidden');
        if (emailvisible == 'hidden') {
            setEmailvisible('visible');
            setEmailbuttonvisible('visible');
            setFavoritebuttonvisible('hidden');
            setClubbuttonvisible('hidden');
        }
        else {
            setEmailvisible('hidden');
            setEmailbuttonvisible('visible');
            setFavoritebuttonvisible('visible');
            setClubbuttonvisible('visible');
        }
    }

    const handlefavoritevisible = () => {
        setEmailvisible('hidden');
        setClubvisible('hidden');
        if (favoritevisible == 'hidden') {
            setFavoritevisible('visible');
            setEmailbuttonvisible('hidden');
            setFavoritebuttonvisible('visible');
            setClubbuttonvisible('hidden');
        }
        else {
            setFavoritevisible('hidden');
            setEmailbuttonvisible('visible');
            setFavoritebuttonvisible('visible');
            setClubbuttonvisible('visible');
        }
    }

    const handleclubvisible = () => {
        setEmailvisible('hidden');
        setFavoritevisible('hidden');
        if (clubvisible == 'hidden') {
            setClubvisible('visible');
            setEmailbuttonvisible('hidden');
            setFavoritebuttonvisible('hidden');
            setClubbuttonvisible('visible');
        }
        else {
            setClubvisible('hidden');
            setEmailbuttonvisible('visible');
            setFavoritebuttonvisible('visible');
            setClubbuttonvisible('visible');
        }
    }

    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'row', position: 'absolute', left: 687.5 - 12.5 * calname(me), bottom: -250, width: 450, height: 200 }}>
                <Avatar alt={me} style={{ height: '7em', width: '7em' }} />
                <p style={{ fontSize: '4em', paddingTop: '0.6em', paddingLeft: '0.5em' }}>{me}</p>
            </div>
            <div style={{ visibility: emailbuttonvisible, position: 'absolute', left: (emailvisible == 'hidden') ? 470 : 670, bottom: -350 }}>
                <Button
                    color='primary'
                    variant='contained'
                    onClick={handleemailvisible}
                    style={{ height: '2em', width: '6em', fontSize: '2em', borderRadius: '10em' }}>Email</Button>
            </div>
            <div style={{ visibility: favoritebuttonvisible, position: 'absolute', left: 670, bottom: -350 }}>
                <Button
                    color='primary'
                    variant='contained'
                    onClick={handlefavoritevisible}
                    style={{ height: '2em', width: '6em', fontSize: '2em', borderRadius: '10em' }}>Favorite</Button>
            </div>
            <div style={{ visibility: clubbuttonvisible, position: 'absolute', left: (clubvisible == 'hidden') ? 870 : 670, bottom: -350 }}>
                <Button
                    color='primary'
                    variant='contained'
                    onClick={handleclubvisible}
                    style={{ height: '2em', width: '6em', fontSize: '2em', borderRadius: '10em' }}>Club</Button>
            </div>
            <div style={{ visibility: emailvisible }}>
                <div style={{ textAlign: 'center', position: 'absolute', left: 690, bottom: -430, fontSize: '30px' }}>
                    {email}
                </div>
            </div>
            <div style={{ visibility: favoritevisible }}>
                <div style={{ textAlign: 'center', position: 'absolute', left: 690, bottom: -430, fontSize: '30px' }}>
                    {favorite}
                </div>
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