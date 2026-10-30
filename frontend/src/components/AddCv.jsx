import { useEffect, useState ,useRef} from "react";
import "../styles/add-resume.css";
import { Trash } from "lucide-react";


function AddCv(){

    const fileInputRef = useRef(null);
    const [user,setUser] = useState(null);
    const [message,setMessage] = useState("");
    const [file,setFile] = useState(null);

    useEffect(() => {
    const token = localStorage.getItem("token");
    if(!token){return;}

    fetch("http://localhost:8080/api/auth/account-information",{
        headers : {Authorization : `Bearer ${token}`}
    }).then(response => response.json()).then(data => setUser(data));
    },[]);

    const addCv = async() => {
        const token = localStorage.getItem("token");
        if(!token || !file){return;}

        const formData = new FormData();

         const request = {
          cvFileName: file.name
         };
        formData.append("request",new Blob([
            JSON.stringify(request)
        ],{type : "application/json"}));
        if(file){
           formData.append("file",file);
        }

        const response = await fetch("http://localhost:8080/api/auth/add-cv",{
            method : "POST",
            headers : {Authorization : `Bearer ${token}`},
            body : formData
            
            
        });
        const text = await response.json();
        if(response.ok){
         setMessage(text.message);
         setFile(null);
         fileInputRef.current.value="";
         setTimeout(() => {
          window.location.reload();
         },2000);
       
        }else{
            setMessage(text.message);
        }
    }

    const openCv = (base64) => {
        const binary = atob(base64);
        const bytes = new Uint8Array(binary.length);

        for(let i = 0; i < binary.length; i++){
            bytes[i] = binary.charCodeAt(i);
        }

        const blob = new Blob([bytes],{type : "application/pdf"});
        const url = URL.createObjectURL(blob);

        window.open(url,"_blank");
    };

    const deleteCv = async(id) => {
        const token = localStorage.getItem("token")
        if(!token){return;}
        const response = await fetch(`http://localhost:8080/api/auth/delete-cv/${id}`,{
            method : "DELETE",
            headers : {Authorization : `Bearer ${token}`}
        });

        const text = await response.json();
        if(response.ok){
            setMessage(text.message);
            setTimeout(() => {
                window.location.reload();
            },2000)
        }
    }

    return(
        <div>

                {message && (
                <div className="notifications">
                <h1>{message}</h1>
                </div>
            )}

            {user && (
                <div className="main-containers">     
              
                    <div className="welcome">
                    <h1>Manage Your Resumes</h1>
                    <p>Upload your CV in PDF format to apply for job offers faster. You can store multiple resumes and delete them whenever you want</p>
                    </div>
               <div className="picture">   
               <input type="file" accept="application/pdf" onChange={(e) => setFile(e.target.files[0])} ref={fileInputRef}/>
               </div>    
               <button type="button" className="button" onClick={addCv}>Add Resume</button>
                 {user?.employeeDto?.employeeCvDto?.map(cv => (
                    
                    <div  key={cv.id} className="cv-buttons">
                    <button className="open" onClick={() => openCv(cv.cvFile)}>{cv.cvFileName ? cv.cvFileName : "Open Cv"}</button>
                    
                    <button type="button" className="delete-button" onClick={() => deleteCv(cv.id)}> <Trash size={20}/></button>
                    </div>
                   
                    
                ))} 
                </div>
            )}
       
        </div>
    )
}
export default AddCv;