// dedicatedpage.js

window.onload = function () {
  // Get the user ID from the query string
  const urlParams = new URLSearchParams(window.location.search);
  const userid = urlParams.get('userid');

  // If userid is not present, show an unauthorized message
  if (!userid) {
    document.body.innerHTML = '<h2>Unauthorized. Please login.</h2>';
    return;
  }

  // Fetch posts for the specific user
  fetch(`http://44.220.80.191:3000/getmyposts?userid=${userid}`)
    .then(res => res.json())
    .then(posts => {
      const container = document.querySelector('.anypost');
      container.innerHTML = ''; // Clear existing content

      posts.forEach(post => {
        const div = document.createElement('div');
        div.classList.add('post');
        div.innerHTML = `
          <h2>${post.posttitle}</h2>
          <p>${post.postarea}</p>
          <hr>
        `;
        container.appendChild(div);
      });
    })
    .catch(err => {
      console.error("Failed to fetch posts:", err);
      document.body.innerHTML = '<h2>Failed to load posts. Please try again later.</h2>';
    });
};
