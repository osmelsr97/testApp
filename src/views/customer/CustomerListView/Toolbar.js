import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import axios from 'axios';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  makeStyles
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';
import RegisterView from 'src/views/auth/RegisterView';

const useStyles = makeStyles((theme) => ({
  root: {},
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Toolbar = ({ className, refreshData, ...rest }) => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = async (data) => {
    console.log(data);
    setOpen(false);
    try {
      const result = await axios.post(`http://127.0.0.1:3100/users/`, data);
      if (result.status === 200) {
        refreshData();
      }
    } catch (error) {
      console.error('Create-Error', error);
    }
  };

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Box
        display="flex"
        justifyContent="flex-end"
      >
        {/* <Button className={classes.importButton}>
          Import
        </Button>
        <Button className={classes.exportButton}>
          Export
        </Button> */}
        <Button
          color="primary"
          variant="contained"
          onClick={handleClickOpen}
        >
          Add user
        </Button>
      </Box>
      <Box mt={3}>
        <Card>
          <CardContent>
            <Box maxWidth={500}>
              <TextField
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon
                        fontSize="small"
                        color="action"
                      >
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  )
                }}
                placeholder="Search customer"
                variant="outlined"
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        disableBackdropClick={true}
        disableEscapeKeyDown={true}
      >
        <DialogContent>
          <RegisterView
            onCloseDialog={handleClose}
            title='Create'
            exitDialog={() => setOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string
};

export default Toolbar;
