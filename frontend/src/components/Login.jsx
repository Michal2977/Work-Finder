
import { useState,useEffect } from "react";
import {Link, useLocation, useNavigate } from "react-router-dom";
import "../styles/login.css";
import { Mail ,Lock, UserRound, UserRoundPlus} from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

function Login({fetchUser}){

    const [message,setMessage] = useState("");

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const location = useLocation();
    const navigate = useNavigate();


    useEffect(() => {
      if(location.state?.message){
        setMessage(location.state.message);
      }
    },[location.state]);

  
    async function handleLogin(){
        const resposne = await fetch("http://localhost:8080/api/auth/login",{
         
            method : "POST",
            headers : {"Content-Type" : "application/json"},
            body : JSON.stringify({email,password})
        });

       
        if(resposne.ok){
             const data = await resposne.json();
            localStorage.setItem("token",data.token);
            await fetchUser();
            navigate("/jobs");
        }else{
             const text = await resposne.json();
            setMessage(text.message);
        }
    }

    function loginWithGoogle(){
        window.location.href= "http://localhost:8080/oauth2/authorization/google"
    }

    function loginWithFacebook(){
        window.location.href= "http://localhost:8080/oauth2/authorization/facebook"
    }

    return(
        
        <div className="login-container">

            {message && (
          <div className="notifications">
            <h1>{message}</h1>
         </div>
          )} 
           <div className="welcome">
            <h1>Welcome Back</h1>
            <span>Logn in to your WorkFinder account</span >  
            </div>

            <div className="input">
            <span>Email</span>
            <div className="input-wrapper">
            <Mail  size={18}/>
            <input type="email" placeholder="email" value={email} required
            onChange={(e) => setEmail(e.target.value)}/>
            </div>

            <span>Password</span>
            <div className="input-wrapper">
            <Lock size={18}/>
            <input type="password" placeholder="password" value={password} required
            onChange={(e) => setPassword(e.target.value)}/> 
            </div>
            <button onClick={handleLogin}>Sign In</button>
           </div>

            <div className="registration">
            <UserRoundPlus size={35}/>
            <div className="registration-text">      
            <span>Don't have an account yet?</span>
            <p>Join WorkFinder and take the next step in your career.</p>
            </div>   
            </div>
            <div className="register">
            <Link to={"/employee-registration"} className ="register-button"> 
            <UserRound size={22}/>
            <span> Create a job seeker account</span>
            
            </Link>
             <Link to={"/employer-registration"} className="register-button">
             <UserRoundPlus size={22}/>
             <span>Create an employer Account</span> 
             </Link> 
         
            </div>
        
            <div className="support">
            <Lock size={35}/>  
            <div className="support-text">
             <span>Problems with your account?</span>
             <p>Activate your account or reset your password.</p>
             </div>
              </div>

            <div className="support-link">
            
             <Link to={"/resend-email"} className="support">
             <Mail size={22}/>
             <span> Resend activation email </span>
             </Link>
    
              <Link to={"/forgot-password"} className="support">
                <Lock size={22}/>  
               <span>Forgot your Password?</span>
             </Link>   
             </div>

             <div className="hrs">
             <hr />
             <span>Or continue with</span>
                 <hr />
             </div>
             <div className="oauth2">
             <button onClick={loginWithGoogle}><FcGoogle size={22} />Continue with Google</button>
             <button onClick={loginWithFacebook}> <FaFacebook size={22}/>Continue with Facebook</button>
             </div>
        </div>
    );
}

export default Login;