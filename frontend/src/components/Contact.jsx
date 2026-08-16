import { useState ,useEffect, useRef} from "react";


function Contact(){
    const [user,setUser] = useState(null);
    const [file,setFile] = useState(null);
    const fileInputRef = useRef(null);
    const [message,setMessage] = useState("");
    const [contact,setContact] = useState({title : "",description : ""});


    useEffect(() => {
     const token  = localStorage.getItem("token");
     if(!token){return;}

     fetch("http://localhost:8080/api/auth/account-information",{
        headers : {Authorization : `Bearer ${token}`},
     }).then(response => response.json()).then(data => setUser(data));
    },[])

    const sendContactMessage = async(e) => {
        e.preventDefault();
       const token  = localStorage.getItem("token");
        const formData = new FormData();

        formData.append("request",new Blob([
            JSON.stringify({...contact})
        ],{type : "application/json"}));
       
        if(file){
           formData.append("file",file);
        }

        const response = await fetch("http://localhost:8080/api/contact",{
            method : "POST",
            headers : {Authorization : `Bearer ${token}`},
            body : formData
        });

        const text = await response.json();
        if(response.ok){
            setMessage(text.message);
            setContact({ title: "", description: "" });
            fileInputRef.current.value = "";
        }else{
            setMessage(text.message);
        }
    } 

    return(
        <div>
            {message && <h1>{message}</h1>}
            <form onSubmit={sendContactMessage}>
            <input type="text" placeholder="subject" value={contact.title} required minLength={3} maxLength={50}
            onChange={(e) => setContact({...contact,title : e.target.value})}/>
            <br/>
             <input type="text" placeholder="description" value={contact.description} required minLength={10} maxLength={5000}
            onChange={(e) => setContact({...contact,description : e.target.value})}/>
            <br/>
            <input type="file" accept="image/jpeg,image/png,image/webp" onChange={(e) => setFile(e.target.files[0])} ref={fileInputRef}/>
            <br/>
            {file && (
                <img src={URL.createObjectURL(file)} alt="preview" width={"200px"} height={"200px"}/>
            )}
            <br/>
            <button className="btn btn-success" type="submit">Send</button>
            </form>
        </div>
    )
}

export default Contact;
