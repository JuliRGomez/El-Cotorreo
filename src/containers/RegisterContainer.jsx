import React from "react";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import coto from "../containers/cotoloco.png";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import RegisterComponent from "../components/Register/Register";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      {"Code La Résistance & AAO."}
      <Link color="inherit" href="http://monicavila.com/">
        &nbsp;Design Godzimona.
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    background: "linear-gradient(45deg, #f8e369 30%, #9df869 90%)",
    width: "120px",
    height:"120px",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  margin: {
    margin: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    color:"white",
  },
  icon: {
    width: "80%",
  },
  text: {
    color: "white",
  },
  blur: {
    background: "rgb(61, 181, 202, 0.5)",
  },
}));

export default function RegisterContainer() {
  const classes = useStyles();
  return (
    <Container component="main" maxWidth="xs" className={classes.blur}>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
        <img className={classes.icon} src={coto} alt="cotorro" />
        </Avatar>
        <Typography component="h1" variant="h4" className={classes.text}>
          Registro 
        </Typography>
      </div>
      <RegisterComponent styles={classes} />
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}