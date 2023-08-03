import * as React from 'react';
import List from '@mui/material/List';
import Folder from '../../folder';
import { useTypesSelector } from '../../../hooks/useTypesSelector';
import { useAction } from "../../../hooks/useAction";
import {useEffect} from "react";
import { useParams } from 'react-router-dom';

export const SidebarList = () => {
    const state = useTypesSelector(state => state.folder);
    const {fetchFolders} = useAction();
    const {id} = useParams();

    useEffect(() => {
        fetchFolders(id as string);
    }, [])

    return(
        <List
        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
        component="nav"
        aria-labelledby="nested-list-subheader">
            {state.folders.map((folder, key) => {
                return <Folder folder={folder} key={key}/>
            })}
      </List>
    );
}