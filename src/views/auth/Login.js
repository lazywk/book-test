import { Button, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import styled from 'styled-components'
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import { Link } from 'react-router-dom';
import { Formik } from 'formik';
import useAuth from 'utils/hooks/useAuth';


const LoginFormContainer = styled.div`
  max-width: 430px;
  margin: 0 auto;
  padding-top: 135px;
`


const LoginForm = styled.div`
  border-radius: 12px;
  background: var(--foundation-white-white-50, #FEFEFE);
  box-shadow: 0px 4px 32px 0px rgba(51, 51, 51, 0.04);
  padding: 48px 28px;
`

const Line = styled.span`
  background: #24272C;
  display: block;
  height: 1px;
  width: 100%;
`

export default function Login() {
  const [errPhone, setErrPhone] = useState(false)
  const [errPass, setErrPass] = useState(false)
  const [submiting, setSubmiting] = useState(false)


  const { signIn } = useAuth()

  const handleSubmit = async (values) => {
    await signIn(values)
      .then(data => console.log(data))
      .catch(err => console.log(err))

    setSubmiting(false)
  }



  return (
    <LoginFormContainer>
      <LoginForm>
        <Typography sx={{ fontSize: 36, fontWeight: 600, textAlign: 'center' }}>Sign in</Typography>

        <Button startIcon={<GoogleIcon />}
          sx={{ width: '100%', textTransform: 'capitalize', margin: '30px 0 16px' }} variant='outlined'>Continue with Google</Button>

        <Button startIcon={<FacebookIcon />}
          sx={{ width: '100%', textTransform: 'capitalize' }} variant='outlined'>Continue with Facebook</Button>

        <Typography
          sx={{ fontSize: 12, fontWeight: 400, textAlign: 'center', margin: '28px 0', display: 'flex', alignItems: 'center', gap: 1 }}>
          <Line />
          OR
          <Line />
        </Typography>
        <Formik
          initialValues={{ email: '', password: '' }}
          validate={values => {
            const errors = {};
            if (!values.email || errPhone) {
              errors.email = errPhone || 'This fielt is required';
            }

            if (!values.password || errPass) {
              errors.password = 'This fielt is required';
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            handleSubmit(values)
            setSubmitting(true);
            setSubmiting(true)
          }}
        >
          {({
            values,
            errors,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => (
            <div className='login-form'>
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <TextField
                  label="Email"
                  // eslint-disable-next-line
                  error={values.email && errors.email || values.email === '' && errors.email || errPhone}
                  helperText={errors.email || errPhone}
                  variant="outlined"
                  size="small"
                  name="email"
                  type='email'
                  onChange={(e) => {
                    handleChange(e)
                    setErrPhone(false)
                    setErrPass(false)
                  }}
                  onBlur={handleBlur}
                  value={values.email}
                />
                <TextField
                  // eslint-disable-next-line
                  error={values.password && errors.password || errors.password || errPass}
                  helperText={errors.password || errPass}
                  label="Password"
                  variant="outlined"
                  size="small"
                  name="password"
                  onChange={(e) => {
                    handleChange(e)
                    setErrPhone(false)
                    setErrPass(false)
                  }}
                  onBlur={handleBlur}
                  value={values.password}
                  type='password'
                />
                <Button variant="contained" size='large' type='submit' disabled={submiting}>{
                  submiting ? 'Submitting...' : 'Submit'
                }</Button>
              </form>
              <Typography sx={{ margin: '5px 0', textAlign: 'center', fontSize: 14 }}>
                Already signed up? Go to <Link to='/register'>sign up</Link>.
              </Typography>
            </div>
          )}
        </Formik>

      </LoginForm>
    </LoginFormContainer>

  )
}
