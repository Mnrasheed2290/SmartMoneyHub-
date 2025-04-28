const postsContainer = document.getElementById('posts');
const loadMoreBtn = document.getElementById('loadMoreBtn');

let postsLoaded = 0;
const postsPerLoad = 5;

// Fetch posts from serverless function
async function fetchPosts() {
  const res = await fetch('/.netlify/functions/getPosts');
  const data = await res.json();
  return data.posts;
}

// Create post element HTML
function createPostElement(post) {
  return `
    <div class="post">
      <h3><a href="${post.url}" target="_blank">${post.title}</a></h3>
      <p>${post.excerpt}</p>
    </div>
  `;
}

// Load posts to page
async function loadPosts() {
  const posts = await fetchPosts();
  const newPosts = posts.slice(postsLoaded, postsLoaded + postsPerLoad);

  newPosts.forEach((post, index) => {
    postsContainer.innerHTML += createPostElement(post);

    // Insert AdSense ad after every 2 posts
    if ((postsLoaded + index + 1) % 2 === 0) {
      postsContainer.innerHTML += `
        <div class="ad-slot">
          <ins class="adsbygoogle"
            style="display:block"
            data-ad-client="ca-pub-7519055218598456"
            data-ad-slot="1234567890"
            data-ad-format="auto"
            data-full-width-responsive="true"></ins>
          <script>
            (adsbygoogle = window.adsbygoogle || []).push({});
          </script>
        </div>
      `;
    }
  });

  postsLoaded += newPosts.length;

  if (postsLoaded >= posts.length) {
    loadMoreBtn.style.display = 'none';
  }
}

loadMoreBtn.addEventListener('click', loadPosts);

// Initial load
window.onload = loadPosts;
