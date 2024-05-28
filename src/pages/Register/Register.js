import {useEffect, useState} from 'react';

import {registerAPI} from '../../api/api'
import {isAuth} from "../../api/isAuth";
import {Link} from "react-router-dom";

const Index = () => {
  useEffect(()=>{
    if(isAuth()){
      window.location.href='/'
    }
  },[])
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState('');

  const login = async () => {
    setIsLoading(true);
    await registerAPI(username, password);
    setIsLoading(false);
  };

  return (
    <div className="login">
      <div className="login__modal" style={{ marginTop: 'auto', marginBottom: 'auto' }}>
        {isLoading ? (
          <div className="login__modal-loading">
            Loading...
          </div>
        ) : (
          <>
            <h1>Regiser</h1>
            <h3>Username</h3>
            <input
              value={username}
              onChange={(e)=>setUsername(e.target.value)}
              placeholder="Username"
            />
            <h3>Password</h3>
            <input
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              placeholder="********"
            />
            <button
              onClick={login}
              style={{ marginTop: '16px' }}
              disabled={!username || !password}
            >Register</button>
            <h5>
              Already have an account?{' '}
              <Link to='/login'>
                <p>Login</p>
              </Link>
            </h5>
          </>
        )}
      </div>
    </div>
  );
};

export default Index;
