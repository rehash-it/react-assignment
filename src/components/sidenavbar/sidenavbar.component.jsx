import React from "react";
import { makeStyles } from "@material-ui/core/styles";
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
import { Avatar, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Organizations from "../organizations/organizations.component";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
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
    padding: theme.spacing(3),
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
    <div>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <Button onClick={handleDrawerOpenClose}>
            <FontAwesomeIcon size="2x" icon={faBars} />
          </Button>
          <Typography variant="h6" noWrap>
            Github
          </Typography>
            <div>
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
            <Avatar className={classes.purple}>RA</Avatar>
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
            <Link to="/organization" style={{ textDecoration: "none" }}>
              <ListItem button key="Origanazations">
                <FontAwesomeIcon icon={faBuilding} />
                <ListItemText primary="Organizations" />
              </ListItem>
            </Link>
          </List>
        </div>
      </Drawer>
      <main className={classes.content}>
        <Organizations />
      </main>
    </div>
  );
}
