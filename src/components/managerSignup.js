import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory } from "react-router-dom";
import axios from "axios";
import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';



import { useFormik } from 'formik';
import * as Yup from "yup";
import { Collapse, IconButton } from '@material-ui/core';



const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  }
}));

const validationSchema = Yup.object({
  firstName: Yup.string().required("Please fill the field"),
  lastName: Yup.string().required("Please fill the field"),
  email: Yup.string().email("Please enter a valid email").required("Please fill the field"),
  password: Yup.string().min(8).required("Please fill the field"),
  confirm_password: Yup.string().required("Please fill the field").oneOf([Yup.ref('password'), null], 'Passwords do not match',),
});



function SignUp({signUpManager}) {

  const[msg, setMsg] = useState();
  const[show, setShow] = useState(false);
  const[severity,setSeverity] = useState();
  

  let history = useHistory();

  function redirect() { history.push("/login"); }

  const fetchData = async (manager) =>{
 
    try{
    
    const data = manager ;
    
       const correctData = manager["manager"];
    
    
    const response = await axios.request({
        method: 'POST',
        url: "http://localhost:4000/api/signupManager",
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
              "Access-Control-Allow-Origin": "*"
        },
        data: JSON.stringify(data),
        
        }).then((res) => {
    
        const result =  res.data;
        console.log(result);

       if (res.data.code == "error"){
          setShow(true);
          setSeverity("error");
          setMsg(res.data.message);
        }
        else{
          setMsg(res.data.message);
          setShow(true);
          setSeverity("success");
          setTimeout(() => { redirect()}, 4000); 
        }
        //return result;
        });
    
      const resData = await response;
       
      console.log('responsee api',resData);
       return resData;
       
    
    
    }
    catch(e){
      console.log(e);
    }
    
    
    }


  

    const { handleSubmit, handleChange, values, errors } = useFormik({
      initialValues: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirm_password: "",
      },
      validationSchema,
      onSubmit(values) {
          console.log(values);
          const managerObject = {
            "firstName": values.firstName,
            "lastName": values.lastName,
            "email": values.email,
            "password": values.password
          }
          console.log(managerObject);
          fetchData(managerObject);
          //redirect();
        
      }
    });

    
    
    const isDisabled = Object.keys(errors).some(x => errors[x]);


  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Manager Sign Up
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
         
         <Collapse in={show}>

           <Alert severity={severity} variant="filled" action={
             <IconButton 
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  
                  setShow(false);

                }}><CloseIcon fontSize="inherit"/>
                </IconButton>}>{msg}</Alert>
           


         </Collapse>
          
          
          <br></br>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange={handleChange}
              />{errors.firstName}
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                onChange={handleChange}
              />{errors.lastName}
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={handleChange}
              />
            </Grid>
            {errors.email}

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={handleChange}
              />
            </Grid>
            {errors.password}

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                name="confirm_password"
                label="Confirm Password"
                type="password"
                id="confirm_password"
                onChange={handleChange}
              />
            </Grid>
            {errors.confirm_password}

          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={isDisabled}
            onClick = {  handleSubmit  }
            
          >
            Sign Up
          </Button>
        </form>
      </div>
      <Box mt={5}>
      </Box>
    </Container>
  );
}



  export default  (SignUp);