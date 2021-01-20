import React from "react";
import "./Denied.css";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import NoCotorro from "../Denied/noCoto.png";
import LinkM from "@material-ui/core/Link";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    height: "40px",
    width: "100%",
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    fontSize: "1.1em",
    fontWeight: "500",
    color: "white",
    border: "none",
  },
  text: {
    fontSize: "1.5em",
    textAlign: "center",
    color: "white",
  },
  smallText: {
    color: "white",
    padding: "20px",
    textDecoration: "none",
  },
  blur: {
    background: "rgb(61, 181, 202, 0.5)",
  },
}));

export default function Denied(props) {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div className="denied">
      <Container component="main" maxWidth="xs" className={classes.blur}>
        <div className={classes.paper}>
          <h3 className={classes.text}>
            ¡SI TÚ QUIERES COTORREAR TE TENDRÁS QUÉ REGISTRAR!
          </h3>
          <img src={NoCotorro} alt="noCotorro" width="240px" height="230px" />
          <button onClick={() => history.push("/")} className={classes.submit}>
            VOLVER A INTENTAR
          </button>
          <LinkM variant="body2">
            <Link to="/register" className={classes.smallText}>
              {"¿No tienes cuenta?"}
            </Link>
          </LinkM>
        </div>
      </Container>
    </div>
  );
}