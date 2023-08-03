import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Endpoint from '../endpoint';
import {IFolder} from '../../interfaces/folder';
import Modal from '../modal';
import Input from '../input';
import { Button } from '../button';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useAction } from '../../hooks/useAction';
import Loader from '../loader';

type FolderProps = {
  folder : IFolder
}

const Folder = ({ folder }  : FolderProps) => {
    const [open, setOpen] = React.useState(false);
    const [endpointModal, setEndppintModal] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const openMenu = Boolean(anchorEl);
    const [method, setMethod] = React.useState('');
    const titleRef = React.useRef<HTMLInputElement>(null);
    const pathRef = React.useRef<HTMLInputElement>(null);
    const {createEndpointForFolder} = useAction();
    const [requestIsSend, setRequestIsSend] = React.useState(false);

    const handleChange = (event: SelectChangeEvent) => {
      setMethod(event.target.value as string);
    };

    const handleClick = () => {
      setOpen(!open);
    };

    const handleMenuClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      event.stopPropagation();
      event.preventDefault();
      setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleEnpointModal = () => {
      handleClose();
      setEndppintModal(prev => !prev)
    }

    const handleCreateEndpoint = () => {
      setRequestIsSend(prev => !prev)

      const model = {
        title: titleRef.current?.value,
        path: pathRef.current?.value,
        method: method
      }

      createEndpointForFolder(model, folder.id);

      setRequestIsSend(prev => !prev)
    }

    return(
        <>
              <ListItemButton sx={{padding: "0px 15px"}} onClick={handleClick} onContextMenu={event => handleMenuClick(event)}>
            <ListItemText primary={folder.name} />
            {folder.endpoints.length > 0 ?
            (open ? <ExpandLess /> : <ExpandMore />): null
            }
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
              {folder.endpoints.map((endpoint, key) => {
                return <Endpoint endpoint={endpoint} key={key}/>
              })}
            </Collapse>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={openMenu}
                onClose={handleClose}
                MenuListProps={{
                'aria-labelledby': 'basic-button',
                }}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
            >
                <MenuItem onClick={handleEnpointModal} >Create endpoint</MenuItem>
                <MenuItem style={{color: "red"}} onClick={handleClose}>Remove</MenuItem>
            </Menu>

            {endpointModal &&
            <Modal onClose={handleEnpointModal}>
              <div>
                <h3>Enpoint</h3>
                <Input placeholder='Endpoint title' inputRef={titleRef}/>
                <Input placeholder='Endpoint path' margin='0px 0px 15px 0px' inputRef={pathRef}/>
                <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Method</InputLabel>
                <Select
                style={{fontSize: "14px"}}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={method}
                  label="Method"
                  onChange={handleChange}>
                  <MenuItem value="GET" style={{fontSize: "14px"}}>GET</MenuItem>
                  <MenuItem value="POST" style={{fontSize: "14px"}}>POST</MenuItem>
                  <MenuItem value="PUT" style={{fontSize: "14px"}}>PUT</MenuItem>
                  <MenuItem value="PATCH" style={{fontSize: "14px"}}>PATCH</MenuItem>
                  <MenuItem value="DELETE" style={{fontSize: "14px"}}>DELETE</MenuItem>
                  <MenuItem value="OPTIONS" style={{fontSize: "14px"}}>OPTIONS</MenuItem>

                </Select>
              </FormControl>
                <div style={{display:"flex", justifyContent: 'flex-end', marginTop: '10px'}}>
                  {requestIsSend ? <Loader /> : <Button title='Create' onClick={handleCreateEndpoint}/>}
                </div>
              </div>
            </Modal>}
        </>
        )
}

export default Folder;