import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faBell } from "@fortawesome/free-solid-svg-icons";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { faBuilding } from "@fortawesome/free-solid-svg-icons";
import { Avatar, Button, Container, CssBaseline } from "@material-ui/core";
import { Link, Route } from "react-router-dom";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Organizations from "../organizations/organizations.component";
import Users from "../users/users.component";

const drawerWidth = 220;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  appBarBottom: {
    zIndex: theme.zIndex.drawer + 1,
    bottom: "0px",
    top: "90%",
    height: "70px",
    left: "0px",
    right: "0px",
    marginBottom: "10px",
    textAlign: "center",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: "auto",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(10),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  paper: {
    marginRight: theme.spacing(2),
  },
}));

export default function Sidenavbar() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [toggle, setToggle] = React.useState(false);
  const prevToggle = React.useRef(toggle);

  const anchorRef = React.useRef(null);

  const handleDrawerOpenClose = () => {
    setOpen(!open);
  };

  const handleToggle = () => {
    setToggle((prevToggle) => !prevToggle);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setToggle(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setToggle(false);
    }
  }

  React.useEffect(() => {
    if (prevToggle.current === true && toggle === false) {
      anchorRef.current.focus();
    }

    prevToggle.current = toggle;
  }, [toggle]);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar className={classes.appBar}>
        <Toolbar>
          <Button onClick={handleDrawerOpenClose}>
            <FontAwesomeIcon size="2x" icon={faBars} />
          </Button>
          <Typography variant="h6" noWrap>
            Github
          </Typography>
          <div style={{ position: "absolute", right: "100px" }}>
            <Button
              ref={anchorRef}
              aria-controls={toggle ? "menu-list-grow" : undefined}
              aria-haspopup="true"
              onClick={handleToggle}
            >
              <FontAwesomeIcon size="2x" icon={faBell} />
            </Button>
            <Popper
              open={toggle}
              anchorEl={anchorRef.current}
              role={undefined}
              transition
              disablePortal
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{
                    transformOrigin:
                      placement === "bottom" ? "center top" : "center bottom",
                  }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                      <MenuList
                        autoFocusItem={toggle}
                        id="menu-list-grow"
                        onKeyDown={handleListKeyDown}
                      >
                        <MenuItem onClick={handleClose}>
                          31 Issues were reported in ABC repo in past 24 hour
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                          users starred XYZ repo in past 24 hours{" "}
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                          87 people downloaded the GHY repo in past 24 hours
                        </MenuItem>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </div>
          <div style={{ position: "absolute", right: "60px" }}>
            <Avatar>RA</Avatar>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
            <Link to="/users" style={{ textDecoration: "none" }}>
              <ListItem button key="Users">
                <FontAwesomeIcon icon={faUsers} />
                <ListItemText primary="Users" />
              </ListItem>
            </Link>
            <Link to="/organizations" style={{ textDecoration: "none" }}>
              <ListItem button key="Origanazations">
                <FontAwesomeIcon icon={faBuilding} />
                <ListItemText primary="Organizations" />
              </ListItem>
            </Link>
          </List>
        </div>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <Route exact path="/" component={Users} />
        <Route path="/users" component={Users} />
        <Route path="/organizations" component={Organizations} />
      </main>
      <AppBar className={classes.appBarBottom} position="fixed" color="primary">
        <Container maxWidth="md">
          <Toolbar>
            <Typography align="right" variant="body1" color="inherit">
              © Rehana Abdulber 2021
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}
