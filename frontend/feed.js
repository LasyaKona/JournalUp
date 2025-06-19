
function viewMyPosts() {
  const userid = localStorage.getItem('userid'); // get from localStorage (set during login)
  if (!userid) {
    alert("You are not logged in!");
    return;
  }
  window.location.href = `dedicatedpage.html?userid=${userid}`;
}
