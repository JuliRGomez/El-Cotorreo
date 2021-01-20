import React, { useRef } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import LinkM from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import { Link, useHistory } from "react-router-dom";
import { login, checkActiveSession } from "../../actions/authActions";
import { useDispatch } from "react-redux";
import swal from "sweetalert";

const ColoredInput = withStyles({
  root: {
    "& label": {
      color: "#FFF",
    },
    "& label.Mui-focused": {
      color: "yellow",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "yellow",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#FFF",
      },
      "&:hover fieldset": {
        borderColor: "orange",
      },
      "&.Mui-focused fieldset": {
        borderColor: "yellow",
      },
    },
  },
})(TextField);

export default function LoginComponent(props) {
  const classes = props.styles;
  const history = useHistory();
  const refEmail = useRef();
  const refPassword = useRef();
  const dispatch = useDispatch();

  const signIn = async (event, provider) => {
    event.preventDefault();

    if (
      provider === "email" &&
      (refEmail.current.value === "" || refPassword.current.value === "")
    ) {
      swal(
        "¡Para iniciar sesión!",
        "¡Ingresa tu dirección de correo y contraseña!",
        "warning"
      );
    } else {
      try {
        await dispatch(
          login(provider, refEmail.current.value, refPassword.current.value)
        );
        dispatch(checkActiveSession(true));
        history.push("/chat");
      } catch (error) {
        swal("¡Para entrar Al Cotorreo!", "¡Debes registrarte!", "error");
      }
    }
  };

  return (
    <form
      className={classes.form}
      noValidate
      onSubmit={(event) => signIn(event, "email")}
    >
      <ColoredInput
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="email"
        label="Dirección de correo"
        name="email"
        autoComplete="email"
        autoFocus
        inputRef={refEmail}
      />
      <ColoredInput
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="password"
        label="Contraseña"
        type="password"
        id="password"
        autoComplete="current-password"
        inputRef={refPassword}
      />
      <FormControlLabel
        control={
          <Checkbox
            value="remember"
            className={classes.text}
            color="secondary"
          />
        }
        className={classes.text}
        label="Recordarme"
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="inherit"
        className={classes.submit}
      >
        Inicia Sesión
      </Button>
      <Button
        fullWidth
        variant="contained"
        color="inherit"
        className={classes.submit}
        onClick={(event) => signIn(event, "google")}
      >
        Inicia Sesión Con Google
      </Button>
      <Button
        fullWidth
        variant="contained"
        color="inherit"
        className={classes.submit}
        onClick={(event) => signIn(event, "facebook")}
      >
        Inicia Sesión Con Facebook
      </Button>
      <Grid container>
        <Grid item xs>
          <LinkM variant="body2">
            <Link to="/recover" className={classes.text}>
              {"¿Olvidaste tu contraseña?"}
            </Link>
          </LinkM>
        </Grid>
        <Grid item>
          <LinkM variant="body2">
            <Link to="/register" className={classes.text}>
              {"¿No tienes cuenta? ¡Registrate!"}
            </Link>
          </LinkM>
        </Grid>
      </Grid>
    </form>
  );
}
