import React from "react";
import styles from "./project.module.scss";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Header from "../../components/header";
import AppContainer from "../../components/app-container";
import Sidebar from "../../components/sidebar";
import RequestTab from "./request-tab";
import { useParams } from 'react-router-dom';
import ResponseTab from "./response-tab";
import { useTypesSelector } from "../../hooks/useTypesSelector";
import Loading from "../loading";

const Project = () => {
    const [value, setValue] = React.useState(0);
    const { id } = useParams();
    const state = useTypesSelector(state => state.endpoint);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
    };

    function a11yProps(index: number) {
        return {
          id: `simple-tab-${index}`,
          'aria-controls': `simple-tabpanel-${index}`,
        };
      }

    return(
      <>
      <Header />
        <AppContainer margin="0px" padding="55px 0px 0px 0px">
          <div className={styles.container}>
            <Sidebar />
            <div className={styles.content}>
              <div className={styles.info}>
                <span className={styles.name}>{state.endpoint?.title}</span>
                <span className={styles.route}>{state.endpoint?.method} {state.endpoint?.path}</span>
              </div>
                {state.endpoint ?
                  <Box sx={{ width: '100%' }}>
                  <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                      <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                      <Tab label="Request" {...a11yProps(0)} />
                      <Tab label="Response" {...a11yProps(1)} />
                      </Tabs>
                  </Box>
                  <RequestTab value={value} index={0}/>
                  <ResponseTab value={value} index={1}/>
              </Box>
                : 
              <div style={{margin: '25px',fontWeight: 600}}><p>Select your endpoints</p></div>}
              </div>
          </div>
        </AppContainer>
      </>    
    );
}



export default Project;