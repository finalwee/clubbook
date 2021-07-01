import { useState, useEffect } from 'react';
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import styled from 'styled-components';
import { useFlag } from '../hooks/useFlag';
import { useCommonProps } from "../containers/ClubBook";
import { QUERY_USERS } from "../graphql/Query";
import { useQuery } from '@apollo/react-hooks';
import { USER_SUBSCRIPTION } from "../graphql/Subscription";

// SideNav
const StyledSideNav = styled(SideNav)`
    background-color: #db3d44;
    border-right: 1px solid #ddd;
`;
StyledSideNav.defaultProps = SideNav.defaultProps;

// Toggle
const StyledToggle = styled(Toggle)`
    background-color: #db3d44;
`;
StyledToggle.defaultProps = Toggle.defaultProps;

// Nav
const StyledNav = styled(Nav)`
    background-color: #fff;

    &&[class*="expanded--"] {
        [class*="sidenav-subnav--"] {
            > [class*="sidenav-subnavitem--"],
            > [class*="sidenav-subnavitem--"]:hover {
                > [class*="navitem--"] {
                    color: #222;
                }
            }
            > [class*="sidenav-subnavitem--"]:hover {
                > [class*="navitem--"] {
                    background-color: #eee;
                }
            }
            > [class*="sidenav-subnavitem--"][class*="selected--"] {
                > [class*="navitem--"] {
                    color: #db3d44;
                }
                > [class*="navitem--"]::before {
                    border-left: 2px solid #db3d44;
                }
            }
        }
    }

    && > [class*="sidenav-navitem--"] {
        > [class*="navitem--"] {
            background-color: inherit;
            color: #222;
        }
    }
    && > [class*="sidenav-navitem--"]:hover {
        > [class*="navitem--"] {
            background-color: #eee;
        }
    }
    && > [class*="sidenav-navitem--"],
    && > [class*="sidenav-navitem--"]:hover {
        > [class*="navitem--"] {
            [class*="navicon--"] {
                &, > * {
                    color: #666;
                }
            }
            [class*="sidenav-nav-text--"] {
                &, > * {
                    color: #222;
                }
            }
        }
    }

    && > [class*="sidenav-navitem--"][class*="highlighted--"],
    && > [class*="sidenav-navitem--"][class*="highlighted--"]:hover {
        > [class*="navitem--"] {
            [class*="navicon--"],
            [class*="navtext--"] {
                &, > * {
                    color: #db3d44;
                }
            }
            [class*="sidenav-nav-text--"] {
                font-weight: 700;
            }
        }
    }
`;
StyledNav.defaultProps = Nav.defaultProps;

// NavItem
const StyledNavItem = styled(NavItem)`
    &&&:hover {
        [class*="navtext--"] {
            color: #222;
        }
    }
`;
StyledNavItem.defaultProps = NavItem.defaultProps;

function SideBar({ setClubSelected }) {

    const [selected, setSelected] = useState("home");
    const { setPostOriginal, setShowWhich } = useFlag();
    const { me } = useCommonProps();
    const userInfo = useQuery(QUERY_USERS, { variables: { username: me } });
    let subscribeToMore = userInfo?.subscribeToMore;
    let clubs = userInfo?.data?.user?.subscribe?.map(club => { return club.name });
    clubs = clubs === undefined ? [] : clubs;

    useEffect(() => {
        subscribeToMore({
            document: USER_SUBSCRIPTION,
            updateQuery: (prev, {subscriptionData}) => {
                if(!subscriptionData.data) return prev;
                const newSubscribe = subscriptionData.data.User.data;
                
                if (prev !== undefined) {
                    return({user: {...prev.user, subscribe: [...prev.user.subscribe, {name: newSubscribe}]}});
                }
            }
        })
    }, [subscribeToMore]);

    return (
        <StyledSideNav
            onSelect={(eventKey) => {
                if (eventKey.slice(0, 5) === 'club/') {
                    setClubSelected(eventKey.slice(5, eventKey.length))
                    setPostOriginal(false);
                    setShowWhich('club');
                }
                else if (eventKey === 'home') {
                    setClubSelected('');
                    setPostOriginal(false);
                    setShowWhich('club');
                }
                else if (eventKey === 'personal profile') {
                    setShowWhich('personal profile');
                }
            }}
        >
            <StyledToggle />
            <StyledNav defaultSelected={selected}>
                <StyledNavItem eventKey="home">
                    <NavIcon>
                        <div>&#x1F3E0;</div>
                    </NavIcon>
                    <NavText style={{ paddingRight: 32 }} title="HOME">
                        HOME
                    </NavText>
                </StyledNavItem>
                <StyledNavItem eventKey="personal profile">
                    <NavIcon>
                        <div>&#x2139;</div>
                    </NavIcon>
                    <NavText style={{ paddingRight: 32 }} title="PERSONAL PROFILE">
                        PERSONAL PROFILE
                    </NavText>
                </StyledNavItem>
                <StyledNavItem eventKey="club">
                    <NavIcon>
                        <div>&#x2663;</div>
                    </NavIcon>
                    <NavText style={{ paddingRight: 32 }} title="CLUB">
                        CLUB
                    </NavText>
                    {clubs.map(clubname => {
                        return (
                            <StyledNavItem eventKey={"club/" + clubname}>
                                <NavText title={clubname}>
                                    {clubname}
                                </NavText>
                            </StyledNavItem>
                        )
                    })}
                </StyledNavItem>
            </StyledNav>
        </StyledSideNav>
    );
};

export default SideBar;