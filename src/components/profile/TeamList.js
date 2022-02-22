import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';

export default function TeamList({ team }) {
  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {team.map(member => (
        <ListItem key={member.id}>
          <ListItemAvatar>
            <Avatar>
              <img
                alt={member.name}
                src={member.img} 
              />
            </Avatar>
          </ListItemAvatar>
          <ListItemText className="team-member" primary={member.name} secondary={member.job} />
        </ListItem>
      ))}
      
    </List>
  );
}
