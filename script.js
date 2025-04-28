const postsContainer = document.getElementById('posts');
const loadMoreBtn = document.getElementById('loadMoreBtn');

let postsLoaded = 0;
const postsPerLoad = 5;

async function fetchPosts() {
  const res = await fetch('/.netlify/functions/getPosts'); // <-- THIS IS THE FIX
  const data = await res.json();
  return data.posts;
}

function createPostElement(post) {
  return `
    <div class="post">
      <h3><a href="${post.url}" target="_blank">${post.title}</a></h3>
      <p>${post.excerpt}</p>
    </div>
  `;
}

async function loadPosts() {
  const posts = await fetchPosts();
  const newPosts = posts.slice(postsLoaded, postsLoaded + postsPerLoad);

  newPosts.forEach(post => {
    postsContainer.innerHTML += createPostElement(post);
    if ((postsLoaded + 1) % 2 === 0) {
      postsContainer.innerHTML += `<div class="ad-slot">[Ad Placeholder]</div>`;
    }
    postsLoaded++;
  });
}

loadMoreBtn.addEventListener('click', loadPosts);

window.onload = loadPosts;
