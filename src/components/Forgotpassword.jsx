import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import { forgotPassword } from "../actions/authActions";
import { useHistory } from "react-router-dom";
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

export default function ForgotpasswordComponent(props) {
  const classes = props.styles;
  const history = useHistory();
  const refEmail = useRef();
  const dispatch = useDispatch();

  const forgotPass = async (event) => {
    event.preventDefault();
    try {
      await dispatch(forgotPassword(refEmail.current.value));
      swal(
        "¡Revisa tu buzón!",
        "¡Correo de recuperación para contraseña enviado!",
        "success"
      );
      history.push("/");
    } catch (error) {
      swal(
        "¡Dirección de correo incorrecta!",
        "¡Vuelve a ingresarla!",
        "warning"
      );
    }
  };

  return (
    <form
      className={classes.form}
      noValidate
      onSubmit={(event) => forgotPass(event, "email")}
    >
      <ColoredInput
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        autoFocus
        inputRef={refEmail}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
      >
        Recuperar contraseña
      </Button>
    </form>
  );
}
