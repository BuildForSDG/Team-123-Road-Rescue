const url =
'http://newsapi.org/v2/top-headlines?country=ng&category=health&apiKey=c61fbf3a3e7340ea99b4eea46dbbbaf4';

export async function getNews() {
let result = await fetch(url).then(response => response.json());
return result.articles;
};