import { useEffect,useRef } from "react";
import { useNavigate } from "react-router-dom";

function OAuth2Success(){

    const navigate = useNavigate();
    const handle = useRef(false);

    useEffect(() => {
        if(handle.current)return;
        handle.current = true;

        const params = new URLSearchParams(window.location.search);

        const token = params.get("token");
        const status = params.get("status");

        if(token){
            localStorage.setItem("token",token);
            if(status === "LINKED"){
                navigate("/jobs",{
                    state: {message : "Account Linked Successfully" 
                    }
                });
            }else{
                navigate("/jobs");
            }
        }else{
            navigate("/login")
        }

    },[navigate]);

    return(
        <div>
            <h1>Signing In .... </h1>
        </div>
    );
}

export default OAuth2Success;

