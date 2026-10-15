
import { Link } from "react-router-dom";
import "../styles/verify-failed.css"

function VerifyFailed(){
    return(
        <div className="failed">
       <h1>This link has expired or is invalid</h1>
       <span>Please request a new link to continue resetting your password.</span>
       <Link to={"/login"}>Back to Login</Link>
        </div>
    );
}

export default VerifyFailed;