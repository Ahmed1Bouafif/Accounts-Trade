import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { googleSignIn, login } from "../redux/features/authSlice.js"
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import { TailSpin } from "react-loader-spinner"
import { GoogleLogin } from "react-google-login"
import { gapi } from "gapi-script"
const Login = () => {
  const userInitialState = {
    email: "",
    password: "",
  }
  const [formData, setFormData] = useState(userInitialState)
  const { email, password } = formData
  const { loading, error } = useSelector((state) => ({ ...state.auth }))
  // const reLogin = useRef(false)

  useEffect(() => {
    error && toast.error(error)
  }, [error])

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const onInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email && password) {
      dispatch(login({ formData, navigate, toast }))
    }
    // reLogin.current = !reLogin.current
  }

  const googleResponseSuccess = (response) => {
    const email = response?.profileObj?.email
    const userName = response?.profileObj?.name
    const token = response?.tokenId
    const googleId = response?.googleId
    const userImage = response?.profileObj?.imageUrl
    const result = { email, userName, token, googleId, userImage }
    dispatch(googleSignIn({ result, navigate, toast }))
  }

  const googleResponseFailure = (error) => {
    toast.error(error)
  }

  useEffect(() => {
    const Google = () => {
      gapi.client.init({
        clientId: "975840121425-mndjta3rfk157dppvtjtt7s372pf04vs.apps.googleusercontent.com",
        scope: "email",
      })
    }
    gapi.load("client:auth2", Google)
  }, [])

  return (
    <div className="all">
      <div className="container-login">
        <div className="form-login">
          <h2 className="app-name">Accounts Trade</h2>
          <input value={email} name="email" onChange={onInputChange} type="email" placeholder="Your Email" className="from-login-inputs" />
          <input value={password} name="password" onChange={onInputChange} type="password" placeholder="Your Password" className="from-login-inputs" />
          <button onClick={handleSubmit} className="form-login-login">
            {loading && <TailSpin color="#fff" height={26} width={26} />}
            Login
          </button>
          <GoogleLogin
            clientId="975840121425-mndjta3rfk157dppvtjtt7s372pf04vs.apps.googleusercontent.com"
            render={(renderProps) => (
              <button onClick={renderProps.onClick} disabled={renderProps.disabled} className="form-login-google">
                {" "}
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 256 256">
                  <path d="M128,24A104,104,0,1,0,232,128,104.2,104.2,0,0,0,128,24Zm0,184A80,80,0,1,1,184.6,71.4a8,8,0,0,1,0,11.3,7.9,7.9,0,0,1-11.3,0A64.1,64.1,0,1,0,191.5,136H128a8,8,0,0,1,0-16h72a8,8,0,0,1,8,8A80.1,80.1,0,0,1,128,208Z" fill="white" />
                </svg>{" "}
                GOOGLE LOGIN
              </button>
            )}
            onSuccess={googleResponseSuccess}
            onFailure={googleResponseFailure}
            cookiePolicy="single_host_origin"
          />
          <button className="form-login-facebook">
            {" "}
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" viewBox="0 0 16 16">
              <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" fill="white" />
            </svg>{" "}
            FACEBOOK LOGIN
          </button>
          <Link to={"/Register"}>
            <p className="go-signup">Don't have an account ? Sign Up</p>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Login
