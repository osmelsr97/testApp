import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  Link,
  Grid,
  TextField,
  Typography,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import axios from 'axios';
import { ContactsOutlined } from '@material-ui/icons';
import moment from 'moment'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const genderData = [
  { label: 'Select', value: '' },
  { label: 'Masculino', value: 1 },
  { label: 'Femenino', value: 2 }
];

const RegisterView = (props) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = React.useState(props.title === 'Update' ? new Date(props.user.birthday) : new Date());
  const [first_name, setFirst_name] = React.useState(props.title === 'Update' ? props.user.first_name : '');
  const [last_name, setLast_name] = React.useState(props.title === 'Update' ? props.user.last_name : '');
  const [password, setPassword] = React.useState('');
  const [gender, setGender] = React.useState(props.title === 'Update' ? props.user.gender_id : '');
  const [Invalid, setInvalid] = React.useState(false);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleSave = () => {
    if (first_name.length < 1 || last_name < 1 || password.length < 1 || gender.length < 0) {
      setInvalid(true);
    } else {
      const user = {
        first_name,
        last_name,
        birthday: moment(selectedDate).format('YYYY-MM-DD'),
        password,
        gender: parseInt(gender)
      };
      if (props.title === 'Update') {
        props.onCloseDialog(props.user.user_id, user);
      } else {
        props.onCloseDialog(user);
      }
    }
  };

  return (
    <Page
      className={classes.root}
      title="Register"
    >
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="sm">
          <Box mb={3}>
            <Typography
              color="textPrimary"
              variant="h2"
            >
              {props.title} user
                  </Typography>
          </Box>
          <TextField
            error={first_name.length < 1 && Invalid}
            helperText={first_name.length < 1 && Invalid ? "This field is required!" : ""}
            fullWidth
            label="First name"
            margin="normal"
            name="firstName"
            onChange={evt => setFirst_name(evt.target.value)}
            defaultValue={first_name}
            variant="outlined"
          />
          <TextField
            error={last_name.length < 1 && Invalid}
            helperText={last_name.length < 1 && Invalid ? "This field is required!" : ""}
            fullWidth
            label="Last name"
            margin="normal"
            name="lastName"
            onChange={evt => setLast_name(evt.target.value)}
            defaultValue={last_name}
            variant="outlined"
          />
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container>
              <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                label="Birthday"
                format="yyyy/MM/dd"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </Grid>
          </MuiPickersUtilsProvider>
          <Grid>
            <TextField
            style={{ marginTop: '12px' }}
              error={gender < 0 && Invalid}
              helperText={gender < 0 && Invalid ? "This field is required!" : ""}
              fullWidth
              label="Select Gender"
              name="gender"
              onChange={(evt) => setGender(evt.target.value)}
              required
              select
              SelectProps={{ native: true }}
              value={gender}
              variant="outlined"
            >
              {genderData.map((option, index) => (
                <option
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </option>
              ))}
            </TextField>
          </Grid>

          <TextField
            error={password.length < 1 && Invalid}
            helperText={password.length < 1 && Invalid ? "This field is required!" : ""}
            fullWidth
            label="Password"
            margin="normal"
            name="password"
            onChange={evt => setPassword(evt.target.value)}
            type="password"
            defaultValue={password}
            variant="outlined"
          />
          <Box my={2}>
            <Button
              color="default"
              onClick={evt => props.exitDialog()}
              size="large"
              style={{ marginRight: '8px' }}
              variant="contained"
            >
              Cancel
            </Button>
            <Button
              color="primary"
              onClick={handleSave}
              size="large"
              type="submit"
              variant="contained"
            >
              {props.title}
            </Button>
          </Box>
        </Container>
      </Box>
    </Page>
  );
};

export default RegisterView;
