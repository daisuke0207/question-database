import React, {useState, useEffect} from 'react'
import { useHistory } from "react-router-dom";
import { asyncGetProfile } from '../api/UserAPI';
import Question from './Question';


const MainPage: React.FC = () => {

  type PROFILE = {
    id: number;
    username: string;
    email: string;
  }

  const history = useHistory()
  const [profile, setProfile] = useState<PROFILE>()

  const logout = () => {
    localStorage.removeItem("token")
    history.push("/")
  }

  const userProfile = async () => {
    const result = await asyncGetProfile()
    setProfile(result)
  }

  useEffect(() => {
    userProfile()
  }, [])

  return (
    <>
      <div>
        {profile !== undefined ? <div>{profile.id} : {profile.username}</div> : "未ログイン"}
        <Question />
        { profile !== undefined ?
          <button onClick={logout}>ログアウト</button> :
          <button onClick={() => history.push("/")}>ログイン</button>
        }
      </div>
    </>
  )
}


export default MainPage