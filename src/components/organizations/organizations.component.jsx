import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Avatar, Button, Typography } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import { token } from "../../keys/keys";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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

export default function Organizations() {
  const [organizations, setOrganizations] = React.useState([]);
  const [totalOrganizations, setTotalOrganizations] = React.useState([]);
  const perPage = 5;
  console.log(token);
  React.useEffect(() => {
    getOrganizations();
  }, []);
  const organizationsTodDisplay = (totalOrganizations, { index1, index2 }) =>
    totalOrganizations.slice(index1, index2);
  const routeChange = (repo_url) => {
    // let path = `/news/${id}`;
    // history.push(path);
  };

  const getOrganizations = () => {
    fetch("https://api.github.com/organizations", {
      method: "get",
      headers: new Headers({
        Authorization: "Bearer" + token,
        "Content-Type": "application/x-www-form-urlencoded",
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        setTotalOrganizations(response);
        setOrganizations(
          organizationsTodDisplay(response, { index1: 0, index2: perPage })
        );
      })
      .catch((error) => console.error(error));
  };
  const handleChange = (event, value) => {
    setOrganizations(
      organizationsTodDisplay(totalOrganizations, {
        index1: value * perPage - perPage,
        index2: value * perPage,
      })
    );
  };

  return (
    <div style={{ paddingLeft: "250px", paddingTop: "100px" }}>
      <Typography align="left" ariant="h1" component="h1">Organizations of Github</Typography>
      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell>Avatar</StyledTableCell>
              <StyledTableCell align="left">Name</StyledTableCell>
              <StyledTableCell align="left">Description</StyledTableCell>
              <StyledTableCell align="left">Repos</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {organizations.map((organization) => (
              <StyledTableRow key={organization.id}>
                <StyledTableCell component="th" scope="row">
                  <Avatar
                    alt={organization.login}
                    src={organization.avatar_url}
                  />
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {organization.login}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {organization.description}
                </StyledTableCell>
                <StyledTableCell align="left">
                  <Button onClick={(e) => routeChange(organization.repos_url)}>
                    <FontAwesomeIcon icon={faEye} />
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        count={Math.ceil(totalOrganizations.length / perPage)}
        onChange={handleChange}
        shape="rounded"
      />
    </div>
  );
}
