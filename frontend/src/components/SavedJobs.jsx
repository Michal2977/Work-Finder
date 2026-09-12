import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


function SavedJobs(){

    const [favoriteJobs,setFavoriteJobs] = useState([]);
    const [user,setUser] = useState(null);
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
       <h2>You don't have any saved jobs yet</h2> )
            }

       
   return (
        <div>
            {favoriteJobs.map(favoriteJob => {
                   const employerOwner = user?.employerDto?.id === favoriteJob?.jobDto?.employerDto?.id;
                return (
                  
                    <div className="card" key={favoriteJob.id}>
                        {favoriteJob.jobDto.picture && (
                          
                            <img
                                src={`data:${favoriteJob.jobDto.pictureContentType};base64,${favoriteJob.jobDto.picture}`}
                                width={"200px"}
                                height={"200px"}
                                alt="empty"
                            />
                        )}
                        
                        <div className="card-body">
                          {user && employerOwner && (
                            <Link to={`/update-job/${favoriteJob.jobDto.id}`}>Update Job Offer</Link>
                          )}
                 <button className="btn btn-danger" type="button" onClick={() => deleteFavoriteJobOffer(favoriteJob.id)}>Delete</button>
                            <Link to={`/jobs/${favoriteJob.jobDto.id}`}>
                                Details
                            </Link>
                            <p>
                                Expiration:{" "}
                                {new Date(favoriteJob.jobDto.expiresAt).toLocaleDateString("pl-PL")}
                            </p>
                            <button
                                type="button"
                                className="btn btn-success"
                                onClick={() => saveJobOffer(favoriteJob.jobDto.id)}
                            >
                                Save Job Offer
                            </button>
                            <p>
                                {getTimeLeft(favoriteJob.jobDto.expiresAt)}
                            </p>
                            <h5 className="card-title">
                                {favoriteJob.jobDto.position}
                            </h5>
                            <p className="card-text">
                                {favoriteJob.jobDto.salary}
                            </p>
                            <p className="card-text">
                                {favoriteJob.jobDto.salaryPeriod}
                            </p>
                            <p className="card-text">
                                {favoriteJob.jobDto.salaryType}
                            </p>
                            <p className="card-text">
                                {favoriteJob.jobDto.location}
                            </p>
                            <p className="card-text">
                                {favoriteJob.jobDto.jobCategory}
                            </p>

                            <p className="card-text">
                                {favoriteJob.jobDto.employmentType}
                            </p>
                            <p className="card-text">
                                {favoriteJob.jobDto.contractType}
                            </p>
                            <p className="card-text">
                                {favoriteJob.jobDto.jobStart}
                            </p>
                            <p className="card-text">
                                {favoriteJob.jobDto.workMode}
                            </p>
                        </div>
                    </div> ); })}
                    </div>
    );
}

export default SavedJobs;
