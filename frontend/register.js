const form=document.getElementById('registrationform');
form.addEventListener('submit',async(e)=>{
    e.preventDefault();
    const  formdata=new URLSearchParams(new FormData(form));
    const response=await fetch('http://localhost:3000/registeruser',{
            method:'POST',
            headers:{'Content-Type':'application/x-www-form-urlencoded'},
            body:formdata
        });
         if(response.status==200)
        {
            window.location.href="login.html";
        }
       
});