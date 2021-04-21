import { AppBar, Container, Toolbar, Typography } from "@material-ui/core";

export default function Footer() {
    return (
        <AppBar style={{zIndex :"5"}} position="static" color="primary">
          <Container maxWidth="md">
            <Toolbar>
              <Typography align="right" variant="body1" color="inherit">
                © Rehana Abdulber 2021
              </Typography>
            </Toolbar>
          </Container>
        </AppBar>
    )
}