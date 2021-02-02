import React, {useState} from 'react'
import axios from '../axios'


const Login: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const postUri = isLogin ? `/auth/` : `/question/users/`


  const changeFunc = () => {
    setIsLogin(!isLogin)
    resetForm()
  }

  const postLogin = () => {
    let data = new FormData()

    data.append('username', username)
    data.append('password', password)

    axios.post(postUri, data)
      .then(res => {alert(res.data)})
      .catch(error => {alert(error.message)})

    // TODO ページ遷移
    resetForm()
  }

  const postRegister = () => {
    let data = new FormData()

    data.append('username', username)
    data.append('email', email)
    data.append('password', password)

    axios.post(postUri, data)
      .then(res=> {alert(res.data)})
      .catch(error => {alert(error.message)})

    // TODO ページ遷移
    resetForm()
  }

  const resetForm = () => {
    setUsername("")
    setEmail("")
    setPassword("")
  }

  return (
    <div>
      <h1>{isLogin ? "ログイン" : "新規登録"}</h1>
      <div>
        <label htmlFor="name">ユーザー名<span>（必須）</span></label>
        <input type="text" id="name" name="name" value={username} onChange={evt=> {setUsername(evt.target.value)}}></input>
      </div>
      {
        isLogin ? null :
        <div>
        <label htmlFor="email">メールアドレス<span>（任意）</span></label>
        <input type="email" id="email" name="email" value={email} onChange={evt=>{setEmail(evt.target.value)}} ></input>
      </div>
      }
      <div>
        <label htmlFor="password">パスワード<span>（必須）</span></label>
        <input type="password" id="password" name="password" value={password} onChange={evt=>{setPassword(evt.target.value)}}></input>
      </div>
      <div>
        <button type="submit" onClick={isLogin ? postLogin : postRegister}>{isLogin ? 'ログイン' : "新規登録"}</button>
      </div>
      <button type="button" onClick={changeFunc}>{isLogin ? "新規登録へ" : "ログインへ"}</button>
    </div>
  )
}

export default Login