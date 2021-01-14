import React, {useRef} from "react";
import {Grid, TextField, Button } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import LinkM from '@material-ui/core/Link';
import {Register} from "../../actions/authActions";
import {useDispatch} from "react-redux";
import swal from 'sweetalert';
import { withStyles } from "@material-ui/core/styles";

const ColoredInput = withStyles({
  root: {
    "& label": {
        color: "#FFF",
    },
    "& label.Mui-focused": {
      color: "yellow"
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "yellow"
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#FFF"
      },
      "&:hover fieldset": {
        borderColor: "orange",
      },
      "&.Mui-focused fieldset": {
        borderColor: "yellow"
      }
    }
  }
})(TextField);

export default function RegisterComponent(props){
    const classes = props.styles;
    const history = useHistory();
    const refEmail = useRef();
    const refPassword = useRef();
    const refName= useRef();
    const refLastName= useRef();
    const dispatch = useDispatch();
    
    const Registeruser = async(event) => {
      event.preventDefault();
      let name=`${refName.current.value} ${refLastName.current.value}`
      console.log(name)
      console.log(refEmail.current.value, refPassword.current.value)
      if(refEmail.current.value=== "" ){
        swal("¡Para registrarte!", "¡Ingresa tu dirección de correo!", "warning");
        //alert('Debe ingresar su email para poder registrarse')
      }
      if(refPassword.current.value=== "" ){
        swal("¡Para registrarte!", "¡Ingresa tu contraseña!", "warning");
      }
      if(refName.current.value=== "" || refLastName.current.value=== ""  ){
        swal("¡Para registrarte!", "¡Ingresa tu nombre y apellido!", "warning");
      }
      else{
      try{
        await dispatch(Register(`${refEmail.current.value}`, `${refPassword.current.value}`,`${refName.current.value}`, `${refLastName.current.value}`));
        swal("¡Binvenido Al Cotorreo!", "¡Ya estás registrado! Inicia sesión", "success");
        history.push("/");
      }catch(error){
        swal("¡Esta cuenta ya existe!", "¡La dirección de correo ya está registrada!", "error");
      }
    }
  }
    return (
        <form className={props.styles.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <ColoredInput
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="Nombre"
                name="firstName"
                autoComplete="fname"
                autoFocus
                inputRef={refName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <ColoredInput
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Apellido"
                name="lastName"
                autoComplete="lname"
                inputRef={refLastName}
              />
            </Grid>
            <Grid item xs={12}>
              <ColoredInput
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Correo Electronico"
                name="email"
                autoComplete="email"
                inputRef={refEmail}
              />
            </Grid>
            <Grid item xs={12}>
              <ColoredInput
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Contraseña"
                type="password"
                id="password"
                autoComplete="current-password"
                inputRef={refPassword}
              />
            </Grid>
          
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="inherit"
            className={classes.submit}
            onClick={(event) => Registeruser(event)}
          >
            Registraté
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <LinkM variant="body2">
              <Link to="/" className={classes.text}>{"¡Ya tienes cuenta! Inicia Sesión"}</Link>
              </LinkM>
            </Grid>
          </Grid>
        </form>
    )
}