const form=document.getElementById('postpage');
form.addEventListener('submit',async(e)=>{
    e.preventDefault();//generally the form willl be executed by default,to not happenn we use this
    console.log("posted successfully"); // Add this

    const formdata=new URLSearchParams(new FormData(form));
    formdata.append('userid',localStorage.getItem('userid'));
    const response=await fetch('http://44.220.80.191:3000/userpost',{
        method:'POST',
        headers:{'Content-Type':'application/x-www-form-urlencoded'},
        body:formdata
    });
    const text=await response.json();
    alert(text);
    if(response.status===200)
    {
        window.location.href="feed.html";
    }
});