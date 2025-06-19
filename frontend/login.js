const form=document.getElementById('loginform');
form.addEventListener('submit',async(e)=>{
    e.preventDefault();//generally the form willl be executed by default,to not happenn we use this
    console.log("Login form submitted"); // Add this

    const formdata=new URLSearchParams(new FormData(form));
    const response=await fetch('http://localhost:3000/loginuser',{
        method:'POST',
        headers:{'Content-Type':'application/x-www-form-urlencoded'},
        body:formdata
    });
    //const text=await response.json();
    //alert(text);
    console.log(response);
    let body=await response.json();
    console.log(body);
    localStorage.setItem('userid',body.userid);
    if(response.status==200)
    { 
        window.location.href="feed.html";
    }
    
});