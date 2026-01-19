
import { useEffect, useState } from 'react'
import { loginuser } from '../service/userservice/userservice'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Login = () => {
  const [form, setform] = useState('')
  const navigate = useNavigate()

  const handleinput = (e) => {
    setform({ ...form, [e.target.name]: e.target.value })
  }

  const loginhandle = async (e) => {
    e.preventDefault()
    const res = await loginuser(form)
    const { status, token } = res

    if ({ status, token }) {
      toast.success("user login successfully")
      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(res.user));
      navigate('/chat')
    }
    toast.error("user error")

  }

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Login</h2>

        <form onSubmit={loginhandle}>
          <div className="input-group">
            <label>Username</label>
            <input
              type="text"
              name="name"
              placeholder="Enter username"
              value={form.name}
              onChange={handleinput}
              required />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={form.password}
              onChange={handleinput}
              required />
          </div>

          <button type="submit">Login</button>
        </form>

        <p className="create-link">
          Don&apos;t have an account? <a href="/create">Create Account</a>
        </p>
      </div>
    </div>
  )
}

export default Login