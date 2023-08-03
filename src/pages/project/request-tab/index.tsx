import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import styles from "./request-tab.module.scss";
import {useEffect, useState} from "react"; 
import 'react-json-editor-ui/dist/react-json-editor-ui.cjs.development.css'
import JSONPretty from 'react-json-pretty';
import 'react-json-pretty/themes/monikai.css';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTypesSelector } from '../../../hooks/useTypesSelector';
import { Button } from '../../../components/button';
import CodeEditor from '@uiw/react-textarea-code-editor';
import { IResponseRequestEndpoint } from '../../../interfaces/endpoint';
import { useAction } from '../../../hooks/useAction';
import Loading from '../../loading';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }
  
const RequestTab = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;
  const state = useTypesSelector(state => state.endpoint);
  const [request, setRequest] = useState<IResponseRequestEndpoint>()
  const [json, setJson] = useState<string>("");
  const {updateEndpointRequest} = useAction();
  const {resetEndpount} = useAction();

  useEffect(() => {
    if(state.endpoint?.request) {
      setRequest(state.endpoint.request);

      if(state.endpoint.request.contentJson) {
        setJson(JSON.stringify(state.endpoint.request.contentJson, null, 2) as string);
      } else {
        setJson("{}");
      }

      return () => {resetEndpount()};
    }
  }, [state.endpoint])

  if(state.loading) {
    return <Loading />
  }

  const update = () => {
    const requestModel : IResponseRequestEndpoint = {
      statusCode : request?.statusCode,
      contentJson : JSON.parse(json as string),
      contentType : request?.contentType as string,
      parameters : request?.parameters as []
    }

    updateEndpointRequest(state.endpoint?.id as string, requestModel);
  }
  
  return(
        <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
        >
          <div style={{display:'flex', justifyContent: 'flex-end', padding: '0 5%', margin: '10px 0px'}}>
            <Button title='Save' padding='6px 16px' onClick={update}/>
          </div>

        {value === index && (
          <Box borderTop="1px solid #EDEDED">
            <Accordion style={{boxShadow: 'none'}} defaultExpanded={true}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header">
              <Typography fontWeight={600}>Parameters</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <TableContainer component={Paper} style={{boxShadow: 'none'}}>
                  <Table sx={{ maxWidth: 600 }} aria-label="simple table">
                  <TableHead style={{backgroundColor: "#ECECEC"}}>
                    <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell >In</TableCell>
                    <TableCell>Data type</TableCell>
                    <TableCell>Notes</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                  <TableRow style={{backgroundColor: "#F4F4F4"}} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">cache</TableCell>
                    <TableCell>query</TableCell>
                    <TableCell>bool</TableCell>
                    <TableCell>required:</TableCell>
                  </TableRow>
                  <TableRow style={{backgroundColor: "#F4F4F4"}} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">ttl</TableCell>
                    <TableCell>header</TableCell>
                    <TableCell>datetime</TableCell>
                    <TableCell>optional time to expire</TableCell>
                  </TableRow>
                  </TableBody>
                  </Table>
                </TableContainer>
            </AccordionDetails>
          </Accordion>
          <Accordion style={{boxShadow: 'none'}} defaultExpanded={true}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header">
            <Typography fontWeight={600}>Body [application/json]</Typography>
            </AccordionSummary>
            <AccordionDetails>
            <div className={styles.jsonContainer}>
              <div className={styles.json}>
              <CodeEditor
                value={json}
                language="JSON"
                placeholder="Please enter JSON."
                onChange={(evn) => setJson(evn.target.value)}
                padding={20}
                style={{
                  width: '100%',
                  fontSize: 13,
                  fontFamily: 'monospace',
                  borderRadius: '10px'
                }}
              />
              </div>
            </div>
            </AccordionDetails>
          </Accordion>
          </Box>
        )}
      </div>
  );
}
type JSONProps = {
  data: any
}
const JSONPrettier= ({data} : JSONProps) => {
    const theme = {
      main: 'line-height:1.3;color:#a31515;background:#fff;overflow:auto;',
      error: 'line-height:1.3;color:#66d9ef;background:#272822;overflow:auto;',
      key: 'color:#a31515;',
      string: 'color:#0451a5;',
      value: 'color:#0451a5;',
      boolean: 'color:#0451a5;',
    };

    return   <JSONPretty data={data} theme={theme} mainStyle="padding:10px"/>
}



export default RequestTab;