import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Results from './Results';
import Toolbar from './Toolbar';
import data from './data';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const CustomerListView = (props) => {
  const classes = useStyles();
  // const [customers] = useState(data);
  const [customers, setCustomer] = useState([]);

  const fetchData = async () => {
    try {
      const result = await axios.get('http://127.0.0.1:3100/users/');
      setCustomer(result.data);
    } catch (error) {
      console.log('GetUsers-Error', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Page
      className={classes.root}
      title="Customers"
    >
      <Container maxWidth={false}>
        <Toolbar refreshData={fetchData}/>
        <Box mt={3}>
          <Results customers={customers} refreshData={fetchData}/>
        </Box>
      </Container>
    </Page>
  );
};

export default CustomerListView;
