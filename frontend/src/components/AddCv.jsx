import { useEffect, useState ,useRef} from "react";



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

            {message && <h2>{message}</h2>}

            {user && (
                <div >     
                {user?.employeeDto?.employeeCvDto?.map(cv => (
                    <div  key={cv.id}>
                    <button onClick={() => openCv(cv.cvFile)}>{cv.cvFileName ? cv.cvFileName : "Open Cv"}</button>
                    <button type="button" className="btn btn-danger" onClick={() => deleteCv(cv.id)}>Deelte Cv</button>
                    </div>
                ))} 
                   
                </div>
            )}

            <label>Add Resume:</label>
            <br/>
            <input type="file" accept="application/pdf" onChange={(e) => setFile(e.target.files[0])} ref={fileInputRef}/>
            
            <button type="button" className="btn btn-success" onClick={addCv}>Add</button>
        
        </div>
    )
}
export default AddCv;