import React, {useState, useEffect} from 'react'
import { useHistory } from "react-router-dom";
import { asyncLogin, asyncRegister } from '../api/UserAPI'


const Auth: React.FC = () => {
  const history = useHistory()
  const [isLogin, setIsLogin] = useState(true)
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const authUser = (e: any) => {
    e.preventDefault()
    if (isLogin) {;
      login()
    }
    else {
      register()
    }
    resetForm()
  }

  const register = async () => {
    await asyncRegister({ username: username, password: password })
    login()
  }

  const login = async () => {
    const result = await asyncLogin({ username: username, password: password })
    localStorage.setItem("token", result.token)
    history.push("/question");
  }

  const changeFunc = () => {
    setIsLogin(!isLogin)
    resetForm()
  }

  const resetForm = () => {
    setUsername("")
    setEmail("")
    setPassword("")
  }

  const redirect = () => {
    history.push("/question")
  }

  useEffect(() => {
    const auth: string | null = localStorage.getItem('token')
    if (auth) {redirect()}
  })

  return (
    <div>
      <h1>{isLogin ? "ログイン" : "新規登録"}</h1>
      <form onSubmit={authUser}>
        <div>
          <label>ユーザー名<span>（必須）</span>: </label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        {
          isLogin ? null :
          <div>
            <label>メールアドレス<span>（任意）</span>: </label>
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
        }
        <div>
          <label>パスワード<span>（必須）</span>: </label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">{isLogin ? "ログイン" : "新規登録"}</button>
        <button type="button" onClick={changeFunc}>{isLogin ? "新規登録へ" : "ログインへ"}</button>
      </form>
    </div>
  )
}

export default Auth