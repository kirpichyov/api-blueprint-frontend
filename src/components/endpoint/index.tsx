import React from "react";
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IEndpoint from "../../interfaces/endpoint";
import { useAction } from "../../hooks/useAction";

type EndpointProps = {
    endpoint : IEndpoint
  }

const Endpoint = ({endpoint} : EndpointProps) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const openMenu = Boolean(anchorEl);
    const {fetchEndpoint} = useAction();

    const handleMenuClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      event.preventDefault();
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleFetchEndpoint = () => {
      fetchEndpoint(endpoint.id);
    }
    
    return(
        <>
            <List component="div" disablePadding>
                <ListItemButton sx={{ padding: "0px 15px 0px 30px" }} onClick={handleFetchEndpoint} onContextMenu={handleMenuClick}>
                <ListItemText primary={endpoint.title} />
                </ListItemButton>
            </List>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={openMenu}
                onClose={handleClose}
                MenuListProps={{
                'aria-labelledby': 'basic-button',
                }}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
            >
                <MenuItem style={{color: "red"}} onClick={handleClose}>Remove</MenuItem>
            </Menu>
        </>
    );
}

export default Endpoint;