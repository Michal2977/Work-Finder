
import "../styles/reset-password-send.css";


function ResetPasswordSend(){
   return(
     <div className="check-email">
    <h1>Check your email</h1>

   
        <span>If an account exists for the email address you entered, we have sent a password reset link.</span>
        <span>Open the email and click the link to create a new password.</span>
    

    <p>
        If you don't see the email, check your Spam or Junk folder.
        You can also request another password reset email if needed.
    </p>
</div>
    );
}

export default ResetPasswordSend;