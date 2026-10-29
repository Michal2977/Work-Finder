import { Pencil, Star, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/saved-jobs.css";


function SavedJobs(){

    const [favoriteJobs,setFavoriteJobs] = useState([]);
    const [user,setUser] = useState(null);
    const navigate = useNavigate();
    const [message,setMessage] = useState("");

    useEffect(() => {
       const token = localStorage.getItem("token");
       if(!token){return;}

       fetch("http://localhost:8080/api/saved-jobs",{
        headers : {Authorization : `Bearer ${token}`}
       }).then(response => response.json()).then(data => setFavoriteJobs(data))
         
       fetch("http://localhost:8080/api/auth/account-information",{
        headers : {Authorization : `Bearer ${token}`}
      }).then(response => response.json()).then(data => setUser(data))

    },[]);

    const deleteFavoriteJobOffer = async(id) => {
      const token = localStorage.getItem("token");
      if(!token){return;}

      const response = await fetch(`http://localhost:8080/api/delete-favorite/${id}`,{
        method : "DELETE",
        headers : {Authorization : `Bearer ${token}`}
        
      })
      if(response.ok){
        window.location.reload();
      }
    }

       const softDelete = async(id) => {
    const token = localStorage.getItem("token");
    if(!token) {return;}
    const response  =  await fetch(`http://localhost:8080/api/soft-delete/${id}`,{
        method : "DELETE",
        headers : {Authorization : `Bearer ${token}`}
    });
    if(response.ok){
     window.location.reload();
    }};
const getTimeLeft = (expiresAt) => {
     const now = new Date();
     const expiration = new Date(expiresAt);

     const diff = expiration - now;
     
     if(diff <= 0 ){
           return "The listing has expired";
     }

     const minutes = Math.floor(diff / (1000 * 60));
     const days = Math.floor(minutes /(60 *24));

     if(days >= 1){
        return `Left: ${days}days`;
     }

     const hours = Math.floor(minutes / 60);

     if(hours >= 1){
          return `Left: ${hours}hours`;
     }

     return `Left: ${minutes}minutes`;

    }
      if(favoriteJobs.length === 0){
            return(
         <div className="favorite-empty">       
       <h1>You don't have any saved jobs yet</h1> 
       </div>
       )
            }

       const admin = user?.roleDto?.some(role => role.role === "ADMIN");
   return (
        <div className="favorite-container">
              <div className="favorite-introduction">       
             <h1>Your Saved Jobs</h1>
              </div>  
            {favoriteJobs.map(favoriteJob => {
                   const employerOwner = user?.employerDto?.id === favoriteJob?.jobDto?.employerDto?.id;
                return (
                    <div className="favorite-card" key={favoriteJob.id} 
                    onClick={() => navigate(`/jobs/${favoriteJob.jobDto.id}`)}
                    style={{cursor : "pointer"}}>
                        {favoriteJob.jobDto.picture && (
                            
                            <img src={`data:${favoriteJob.jobDto.pictureContentType};base64,${favoriteJob.jobDto.picture}`}
                                width={"200px"} height={"200px"} alt="empty" />
                        )}
                        
                        <div className="favorite-icons">
                       
                          {user && (admin || employerOwner) && (
                            <div className="favorite-operations">
                            <Link to={`/update-job/${favoriteJob.jobDto.id}`}
                             onClick={(e) =>{e.stopPropagation()}}><Pencil size={22}/></Link>
                            <button  type="button" 
                            onClick={(e) => {e.stopPropagation();softDelete(job.id)}}className="favorite-delete"><Trash2 size={22}/></button>
                             
                             </div>
                           
                          )}
                      <button  type="button" className="favorite-save" onClick={() => deleteFavoriteJobOffer(favoriteJob.id)}><Star size={22}/></button>
                      </div>
                   
                      
                    
                            <div className="favorite-info">
                            <h1 > {favoriteJob.jobDto.position}</h1>  
                            <span >{favoriteJob.jobDto.salary} {favoriteJob?.jobDto?.currency}  {favoriteJob.jobDto.salaryPeriod}  {favoriteJob.jobDto.salaryType}
                            </span>
                          <p  > {favoriteJob.jobDto.companyName}</p>
                          <span > {favoriteJob.jobDto.location}</span>
                       </div>
                              <div className="favorite-details">
                                <span >{favoriteJob.jobDto.jobCategory}</span>
                                <span >{favoriteJob.jobDto.employmentType}</span>
                                <span >{favoriteJob.jobDto.contractType}</span>
                              <span >{favoriteJob.jobDto.jobStart}</span>
                               <span >{favoriteJob.jobDto.workMode}</span>
                                  </div>

                                <hr/>

                             <div className="favorite-publication">
                             <span>Publication :{new Date(favoriteJob.jobDto.createAt).toLocaleDateString("pl-PL")}</span>
                            </div>
                            
                                <div className="favorite-application">
                                <span >{favoriteJob.jobDto.applicationType === "QUICK" && "QUICK Application"}</span>
                                <span >{favoriteJob.jobDto.applicationType === "FORM" && "Form Application"}</span>
                                </div>
                               
        
                        </div>
                        
                    ); })}
                    </div>
    );
}

export default SavedJobs;
