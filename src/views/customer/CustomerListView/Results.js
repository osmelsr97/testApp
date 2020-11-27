import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import RegisterView from 'src/views/auth/RegisterView';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  makeStyles,
  Button
} from '@material-ui/core';
import getInitials from 'src/utils/getInitials';
import { Router } from 'react-router';
import { isArrayLike } from 'lodash';

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Results = ({ className, customers, refreshData, ...rest }) => {
  const classes = useStyles();
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const [open, setOpen] = useState(false);
  const [user, setUser] = useState({});

  const handleClickOpen = (user) => {
    setUser(user);
    setOpen(true);
  };

  const handleClose = async (user_id, data) => {
    setOpen(false);
    try {
      const result = await axios.put(`http://127.0.0.1:3100/users/${user_id}`, data);
      if (result.status === 200) {
        refreshData();
      }
    } catch (error) {
      console.error('Update-Error', error);
    }
  };

  const handleDelete = async (user_id) => {
    try {
      const result = await axios.delete(`http://127.0.0.1:3100/users/${user_id}`);
      if (result.status === 200) {
        refreshData();
      }
    } catch (error) {
      console.error('Delete-Error', error);
    }
  };

  const handleSelectAll = (event) => {
    let newSelectedCustomerIds;

    if (event.target.checked) {
      newSelectedCustomerIds = customers.map((customer) => customer.user_id);
    } else {
      newSelectedCustomerIds = [];
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedCustomerIds.indexOf(id);
    let newSelectedCustomerIds = [];

    if (selectedIndex === -1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds, id);
    } else if (selectedIndex === 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(1));
    } else if (selectedIndex === selectedCustomerIds.length - 1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(0, selectedIndex),
        selectedCustomerIds.slice(selectedIndex + 1)
      );
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <PerfectScrollbar>
        <Box minWidth={1050}>
          <Table>
            <TableHead>
              <TableRow>
                {/* <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedCustomerIds.length === customers.length}
                    color="primary"
                    indeterminate={
                      selectedCustomerIds.length > 0
                      && selectedCustomerIds.length < customers.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell> */}

                <TableCell>
                  Name
                </TableCell>
                <TableCell>
                  Last Name
                </TableCell>
                <TableCell>
                  Birthday
                </TableCell>
                <TableCell>
                  Created
                </TableCell>
                <TableCell>
                  Updated
                </TableCell>
                <TableCell>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customers.slice(0, limit).map((customer) => (
                <TableRow
                  hover
                  key={customer.user_id}
                  selected={selectedCustomerIds.indexOf(customer.user_id) !== -1}
                >
                  {/* <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedCustomerIds.indexOf(customer.ser_id) !== -1}
                      onChange={(event) => handleSelectOne(event, customer.user_id)}
                      value="true"
                    />
                  </TableCell> */}

                  <TableCell>
                    <Box
                      alignItems="center"
                      display="flex"
                    >
                      {/*  <Avatar
                        className={classes.avatar}
                        src={customer.avatarUrl}
                      >
                        {getInitials(customer.name)}
                      </Avatar> */}
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {customer.first_name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {customer.last_name}
                  </TableCell>
                  <TableCell>
                    {moment(customer.birthday).format('DD/MM/YYYY')}
                  </TableCell>
                  <TableCell>
                    {moment(customer.createdAt).format('DD/MM/YYYY')}
                  </TableCell>
                  <TableCell>
                    {moment(customer.updatedAt).format('DD/MM/YYYY')}
                  </TableCell>
                  <TableCell>
                    <Box
                      alignItems="center"
                      display="flex"
                    >
                      {/*  <Avatar
                        className={classes.avatar}
                        src={customer.avatarUrl}
                      >
                        {getInitials(customer.name)}
                      </Avatar> 
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >*/}
                      <IconButton color="primary" onClick={evt => handleClickOpen(customer)}>
                        <EditRoundedIcon />
                      </IconButton>
                      <IconButton color="secondary" onClick={evt => handleDelete(customer.user_id)}>
                        <DeleteRoundedIcon />
                      </IconButton>
                      {/* </Typography> */}
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={customers.length}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
      {open ?
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
            <RegisterView user={user}
              onCloseDialog={handleClose}
              title='Update'
              exitDialog={() => setOpen(false)} />
          </DialogContent>
        </Dialog> :
        null}
    </Card>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  customers: PropTypes.array.isRequired
};

export default Results;
