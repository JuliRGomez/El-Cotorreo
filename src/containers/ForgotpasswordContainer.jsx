import React from "react";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import coto from "../containers/cotoloco.png";
import Grid from "@material-ui/core/Grid";
import LinkM from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Link } from "react-router-dom";
import ForgotpasswordComponent from "../components/Forgotpassword.jsx";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
  },
  avatar: {
    margin: theme.spacing(1),
    background: "linear-gradient(45deg, #f8e369 30%, #9df869 90%)",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    color: "white",
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

export default function ForgotpasswordContainer() {
  const classes = useStyles();
  return (
    <div className="generalCont">
      <Container component="main" maxWidth="xs" className={classes.blur}>
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <img className={classes.icon} src={coto} alt="cotorro" />
          </Avatar>
        </div>
        <ForgotpasswordComponent styles={classes} />
        <Grid item xs>
          <LinkM variant="body2">
            <Link to="/" className={classes.text}>
              {"Regresa a ¡El Cotorreo!"}
            </Link>
          </LinkM>
        </Grid>
      </Container>
    </div>
  );
}
