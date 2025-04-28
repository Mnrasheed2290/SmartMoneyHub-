const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  const urls = [
    "https://www.reddit.com/r/sidehustle/top.json?limit=5",
    "https://www.reddit.com/r/financialindependence/top.json?limit=5",
    "https://www.reddit.com/r/frugal/top.json?limit=5",
    "https://www.reddit.com/r/personalfinance/top.json?limit=5"
  ];

  let posts = [];

  for (const url of urls) {
    const res = await fetch(url);
    const json = await res.json();
    const newPosts = json.data.children.map(child => ({
      title: child.data.title,
      url: "https://reddit.com" + child.data.permalink,
      excerpt: child.data.selftext.substring(0, 100) + "..."
    }));
    posts = posts.concat(newPosts);
  }

  posts = posts.slice(0, 20);

  return {
    statusCode: 200,
    body: JSON.stringify({ posts }),
  };
};
