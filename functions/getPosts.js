const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  try {
    // Fetch evergreen advice
    const adviceRes = await fetch('https://smartmoneyhub.netlify.app/advice.json');
    const adviceData = await adviceRes.json();

    // Fetch finance news from NewsAPI
    const newsRes = await fetch('https://newsapi.org/v2/top-headlines?category=business&language=en&apiKey=ec60ed4c324948c8bfb8f1184de5eccb');
    const newsData = await newsRes.json();

    // Filter news to only include articles with a valid URL
    const newsPosts = newsData.articles
      .filter(article => article.url) // Only include if a URL exists
      .map(article => ({
        title: article.title,
        url: article.url,
        excerpt: article.description || ''
      }));

    // Merge both advice and news posts
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
