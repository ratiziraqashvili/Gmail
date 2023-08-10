import React, { useEffect, useState } from 'react';
import './EmailList.css';
import { Checkbox, IconButton } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import RedoIcon from '@mui/icons-material/Redo';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import KeyboardHideIcon from '@mui/icons-material/KeyboardHide';
import SettingsIcon from '@mui/icons-material/Settings';
import Section from './Section';
import InboxIcon from '@mui/icons-material/Inbox';
import PeopleIcon from '@mui/icons-material/People';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import EmailRow from './EmailRow';
import { db } from './firebase';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';

const EmailList = () => {
const [emails, setEmails] = useState([]);

useEffect(() => {
    const unsubscribe = onSnapshot(
        query(collection(db, 'emails'), orderBy('timestamp', 'desc')),
        snapshot => {
            setEmails(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data(),
            })));
        }
    );

    return () => unsubscribe();
}, []);


  return (
    <div className='emailList'>
        <div className="emailList_settings">
            <div className="emailList_settingsLeft">
                <Checkbox/>
                <IconButton>
                    <ArrowDropDownIcon />
                </IconButton>
                <IconButton>
                    <RedoIcon />
                </IconButton>
                <IconButton>
                    <MoreVertIcon />
                </IconButton>
            </div>
            <div className="emailList_settingsRight">
                <IconButton>
                    <ChevronLeftIcon />
                </IconButton>
                <IconButton>
                    <ChevronRightIcon />
                </IconButton>
                <IconButton>
                    <KeyboardHideIcon />
                </IconButton>
                <IconButton>
                    <SettingsIcon />
                </IconButton>
            </div>
        </div>


        <div className="emailList_section">
            <Section Icon={InboxIcon} title='Primary' color="red" selected />
            <Section Icon={PeopleIcon} title='Social' color="#1A73E8"  />
            <Section Icon={LocalOfferIcon} title='Promotions' color="green"  />
        </div>


        <div className="emailList_list">
            {emails.map(({ id, data: {to, subject, message, timestamp} }) => (
                <EmailRow
                    id={id}
                    key={id}
                    title={to}
                    subject={subject}
                    description={message}
                    time={new Date (timestamp?.seconds * 1000).toUTCString()}
                />
            ))}
        </div>
    </div>
  )
}

export default EmailList