import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { register } from "../redux/features/authSlice.js"
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import { TailSpin } from "react-loader-spinner"
const Register = () => {
  const userInitialState = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmePassword: "",
  }
  const [formData, setFormData] = useState(userInitialState)
  const { firstName, lastName, email, password, confirmePassword } = formData
  const { loading, error } = useSelector((state) => ({ ...state.auth }))
  // const [avoidToastPlus, set]
  // const reRegister = useRef(false)

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
    if (password !== confirmePassword) return toast.error("Password Should Match")
    if (firstName && lastName && email && password && confirmePassword) {
      dispatch(register({ formData, navigate, toast }))
      // reRegister.current = !reRegister.current
    }
  }

  return (
    <div className="all">
      <div className="container-login">
        <div className="form-login">
          <h2 className="app-name">Accounts Trade</h2>
          <input value={firstName} name="firstName" onChange={onInputChange} type="text" placeholder="Your firstName" className="from-login-inputs" />
          <input value={lastName} name="lastName" onChange={onInputChange} type="text" placeholder="Your lastName" className="from-login-inputs" />
          <input value={email} name="email" onChange={onInputChange} type="email" placeholder="Your Email" className="from-login-inputs" />
          <input value={password} name="password" onChange={onInputChange} type="password" placeholder="Your Password" className="from-login-inputs" />
          <input value={confirmePassword} name="confirmePassword" onChange={onInputChange} type="password" placeholder="Your confirmePassword" className="from-login-inputs" />
          <button onClick={handleSubmit} className="form-login-login">
            {loading && <TailSpin color="#fff" height={26} width={26} />}
            Register
          </button>
          <Link to={"/Login"}>
            <p className="go-signup">Already Have An Account ? Sign In</p>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Register
