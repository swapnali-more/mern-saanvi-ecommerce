import { FormControl, Grid, TextField, Typography, FormControlLabel, Checkbox, Button, FormHelperText, Box, InputAdornment, IconButton, Alert } from '@mui/material'
import Layout from '../../Components/Layout/Layout'
import React, { useEffect, useState } from 'react'
import * as Yup from "yup";
import { useFormik } from 'formik';
import { connect, useDispatch } from 'react-redux';
import { createUserRequest } from '../../ReduxSaga/Actions/createUserActions';
import { fetchUsersRequest } from '../../ReduxSaga/Actions/usersActions';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { loginUserRequest } from '../../ReduxSaga/Actions/loginUserActions';
import { useNavigate } from 'react-router-dom';

const validationRegSchema = Yup.object().shape({
  userName: Yup.string().required('User Name is required!'),
  userEmail: Yup.string().email('Invalid User Email').required('User Email is required!'),
  userPassword: Yup.string()
    .required('Password is required')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    ),
  userConfirmPassword: Yup.string().required('Confirm Password is required').oneOf([Yup.ref('userPassword')], 'Password should match!'),
});

const validationLogSchema = Yup.object().shape({
  userEmail: Yup.string().email('Invalid User Email').required('User Email is required!'),
  userPassword: Yup.string().required('Password is required'),
});

interface userProps {
  users: {
    userId: string,
    userName: string;
    userEmail: string;
    userPassword: string;
    userConfirmPassword: string;
    isAdmin: boolean;
  }[];
  isLoadingReg: any;
  errorReg: any;
  messageReg: any;
  isLoadingLog: any;
  errorLog: any;
  messageLog: any;
}

const Auth = ({ users, isLoadingReg, errorReg, messageReg, isLoadingLog, errorLog, messageLog }: userProps) => {
  console.log(users)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showRegPassword, setShowRegPassword] = useState(false);
  const [showRegConPassword, setShowRegConPassword] = useState(false);
  const [showLogPassword, setShowLogPassword] = useState(false);

  useEffect(() => {
    dispatch(fetchUsersRequest('GET'))
  }, [dispatch])

  const isUserNameRepeated = (name: any, users: any) => {
    return users.some((user: any) => user.userName === name)
  }

  const isUserEmailRepeated = (email: any, users: any) => {
    return users.some((user: any) => user.userEmail === email)
  }

  const formikReg = useFormik({
    initialValues: {
      userName: users.length > 0 ? users[0].userName : '',
      userEmail: users.length > 0 ? users[0].userEmail : '',
      userPassword: users.length > 0 ? users[0].userPassword : '',
      userConfirmPassword: users.length > 0 ? users[0].userConfirmPassword : '',
      isAdmin: users.length > 0 ? users[0].isAdmin : false,
    },
    validationSchema: validationRegSchema,
    onSubmit: async (values, { resetForm }) => {
      const userNameRepeated = isUserNameRepeated(values.userName, users)
      const userEmailRepeated = isUserEmailRepeated(values.userEmail, users)

      if (userNameRepeated) {
        formikReg.setErrors({ userName: "User name already exists" });
      } else if (userEmailRepeated) {
        formikReg.setErrors({ userEmail: "User email already exists" })
      } else {
        dispatch(createUserRequest('POST', values))
        resetForm();
      }
    }
  })

  const formikLog = useFormik({
    initialValues: {
      userEmail: users.length > 0 ? users[0].userEmail : '',
      userPassword: users.length > 0 ? users[0].userPassword : '',
      isAdmin: users.length > 0 ? users[0].isAdmin : false,
    },
    validationSchema: validationLogSchema,
    onSubmit: async (values, { resetForm }) => {
      dispatch(loginUserRequest('POST', values))
      resetForm();
      navigate('/');
    }
  })

  const { values: regValues, touched: regTouched, errors: regErrors }: { values: any, touched: any, errors: any } = formikReg;
  const { values: logValues, touched: logTouched, errors: logErrors }: { values: any, touched: any, errors: any } = formikLog;

  return (
    <Layout>
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={6} sx={{ borderRight: 1, paddingLeft: 20, paddingRight: 20 }} component="form" onSubmit={formikReg.handleSubmit}>
          {messageReg && <Alert variant="outlined" severity={errorReg ? "error" : "success"} sx={{fontSize: 14, alignItems: 'center', mb: 2}}>{messageReg}</Alert> }
            <Typography variant="h3" textAlign="center" mb={4}>New In Saanvi</Typography>
            {["userName", "userEmail", "userPassword", "userConfirmPassword", "isAdmin"].map((input) => (
              <FormControl fullWidth sx={{ mb: 2 }}>
                {input === "isAdmin" ?
                  <FormControlLabel
                    control={
                      <Checkbox
                        id={input}
                        value={input}
                        checked={regValues[input]}
                        onChange={formikReg.handleChange}
                      />
                    }
                    label="Register as Admin"
                  />
                  :
                  <TextField
                    id={input}
                    size="small"
                    label={input.slice(4).replace(/([A-Z])/g, ' $1').trim()}
                    name={input}
                    value={regValues[input]}
                    onChange={formikReg.handleChange}
                    InputProps={
                      input === 'userPassword' ? {
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={() => setShowRegPassword((prevShowPassword) => !prevShowPassword)}>
                              {showRegPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                            </IconButton>
                          </InputAdornment>
                        ),
                        type: showRegPassword ? 'text' : 'password'
                      } : input === 'userConfirmPassword' ? {
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={() => setShowRegConPassword((prevShowPassword) => !prevShowPassword)}>
                              {showRegConPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                            </IconButton>
                          </InputAdornment>
                        ),
                        type: showRegConPassword ? 'text' : 'password'
                      } : undefined
                    }
                  />
                }

                {regTouched[input] && regErrors[input] && (
                  <FormHelperText id="my-helper-text">{regErrors[input]}</FormHelperText>
                )}
              </FormControl>
            ))}
            <Button type="submit" variant='contained'>Register</Button>
          </Grid>
          <Grid item xs={6} sx={{ paddingLeft: 20, paddingRight: 20 }} component="form" onSubmit={formikLog.handleSubmit}>
          {messageLog && <Alert variant="outlined" severity={errorReg ? "error" : "success"} sx={{fontSize: 14, alignItems: 'center', mb: 2}}>{messageLog}</Alert> }
            <Typography variant="h3" textAlign="center" mb={4}>Log In</Typography>
            {["userEmail", "userPassword"].map((input) => (
              <FormControl fullWidth sx={{ mb: 2 }}>
                <TextField
                  id={input}
                  size="small"
                  label={input.slice(4).replace(/([A-Z])/g, ' $1').trim()}
                  name={input}
                  value={logValues[input]}
                  onChange={formikLog.handleChange}
                  InputProps={
                    (input === 'userPassword') ? {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => setShowLogPassword((prevShowPassword) => !prevShowPassword)}>
                            {showLogPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                          </IconButton>
                        </InputAdornment>
                      ),
                      type: showLogPassword ? 'text' : 'password'
                    } : undefined
                  }
                />

                {logTouched[input] && logErrors[input] && (
                  <FormHelperText id="my-helper-text">{logErrors[input]}</FormHelperText>
                )}
              </FormControl>
            ))}
            <Button type="submit" variant='contained'>Log In</Button>
          </Grid>
        </Grid>
      </Box>
    </Layout>
  )
}

const mapStateToProps = (state: {
  createUser: { isLoading: any, error: any, message: any },
  loginUser: { isLoading: any, error: any, message: any },
  users: { users: any }
}) => ({
  users: state.users.users,
  isLoadingReg: state.createUser.isLoading,
  errorReg: state.createUser.error,
  messageReg: state.createUser.message,
  isLoadingLog: state.loginUser.isLoading,
  errorLog: state.loginUser.error,
  messageLog: state.loginUser.message,
})

const mapDispatchToProps = {
  createUserRequest,
  loginUserRequest,
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)