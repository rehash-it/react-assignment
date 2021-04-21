import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Avatar, Grid, Typography } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import {token} from "../../keys/keys";
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.grey,
    color: theme.palette.common.black,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

export default function Users() {
  const [users, setUsers] = React.useState([]);
  const [totalUsers, setTotalUsers] = React.useState([]);
  const perPage = 5;
  console.log(token);
  React.useEffect(() => {
    getUsers();
  }, []);
  const usersTodDisplay = (totalUsers, { index1, index2 }) =>
    totalUsers.slice(index1, index2);

  const getUsers = () => {
    fetch("https://api.github.com/users", {
      method: "get",
      headers: new Headers({
        Authorization: "Bearer" + token,
        "Content-Type": "application/x-www-form-urlencoded",
      }),
    })
      .then((response) => response.json())
      .then(
        (response) => {
          setTotalUsers(response);
          setUsers(usersTodDisplay(response, { index1: 0, index2: perPage }));
        }
        // response.map((user) =>
        //   fetch(user.url, {
        //     method: "get",
        //     headers: new Headers({
        //       Authorization:
        //         "Bearer" + "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",
        //       "Content-Type": "application/x-www-form-urlencoded",
        //     }),
        //   })
        //     .then((response) => response.json())
        //     .then((response) => usersMain.push(response))
        //     .catch((error) => console.error(error))
        // )
      )
      .catch((error) => console.error(error));
  };
  const handleChange =(event, value)=> {
    setUsers(
      usersTodDisplay(totalUsers, {
        index1: value * perPage - perPage,
        index2: value * perPage,
      })
    );
  };

  return (
    <Grid container >
    <Grid item xs ={12} sm={12} md={12} lg={12}>
       <Typography align="left" ariant="h1" component="h1">
        Users of Github
      </Typography>
      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell>Avatar</StyledTableCell>
              <StyledTableCell align="right">Username</StyledTableCell>
              <StyledTableCell align="right">Name</StyledTableCell>
              <StyledTableCell align="right">Company</StyledTableCell>
              <StyledTableCell align="right">Location</StyledTableCell>
              <StyledTableCell align="right">Email</StyledTableCell>
              <StyledTableCell align="right">
                Number of Public Repos
              </StyledTableCell>
              <StyledTableCell align="right">
                Number of Private Repos
              </StyledTableCell>
              <StyledTableCell align="right">Followers</StyledTableCell>
              <StyledTableCell align="right">Following</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <StyledTableRow key={user.id}>
                <StyledTableCell component="th" scope="row">
                  <Avatar alt={user.name} src={user.avatar_url} />
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {user.login}
                </StyledTableCell>
                <StyledTableCell align="right">{user.name}</StyledTableCell>
                <StyledTableCell align="right">{user.company}</StyledTableCell>
                <StyledTableCell align="right">{user.location}</StyledTableCell>
                <StyledTableCell align="right">{user.email}</StyledTableCell>
                <StyledTableCell align="right">
                  {user.publicrepos}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {user.privaterepos}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {user.followers}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {user.following}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        count={Math.ceil(totalUsers.length / perPage)}
        onChange={handleChange}
        shape="rounded"
      />
</Grid>
</Grid>
  );
}
