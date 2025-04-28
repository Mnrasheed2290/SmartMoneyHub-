const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  try {
    // Fetch advice.json from your Netlify site
    const adviceRes = await fetch('https://smartmoneyhub.netlify.app/advice.json');
    const adviceData = await adviceRes.json();

    // Fetch finance news from NewsAPI.org
    const newsRes = await fetch(`https://newsapi.org/v2/top-headlines?category=business&language=en&apiKey=ec60ed4c324948c8bfb8f1184de5eccb`);
    const newsData = await newsRes.json();

    const newsPosts = newsData.articles.map(article => ({
      title: article.title,
      url: article.url,
      excerpt: article.description || ''
    }));

    // Merge both sources
    const allPosts = [...adviceData, ...newsPosts];

    return {
      statusCode: 200,
      body: JSON.stringify({ posts: allPosts })
    };
  } catch (error) {
    console.error('Error loading posts:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ posts: [] })
    };
  }
};
