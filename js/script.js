const blogContainer = document.getElementById("blog-container");
const apiKey = "00227680d6694ae6b55d4a957ad79874";
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
async function fetchNews() {
  try {
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apiKey=${apiKey}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    displayNews(data.articles);
  } catch (err) {
    console.log(err);
  }
}
function displayNews(articles) {
  blogContainer.innerHTML = "";
  //   console.log(articles[0]);
  articles.forEach((article) => {
    if (article.content !== "[Removed]") {
      const div = document.createElement("div");
      const img = document.createElement("img");
      const h2 = document.createElement("h2");
      const p = document.createElement("p");
      const publishDate = document.createElement("p");
      publishDate.classList.add("publish");
      div.classList.add("blog-card");
      img.src = article.urlToImage;
      h2.textContent = article.title;
      p.textContent = article.description;
      publishDate.textContent = `Date: ${
        article.publishedAt
          ? article.publishedAt.slice(0, 10)
          : "date is expired"
      }`;
      div.appendChild(img);
      div.appendChild(h2);
      div.appendChild(p);
      div.appendChild(publishDate);
      div.addEventListener("click", () => {
        window.open(article.url, "_blank");
      });
      blogContainer.appendChild(div);
    }
  });
}
searchButton.addEventListener("click", async () => {
  const searchValue = searchInput.value;
  try {
    const apiUrl = `https://newsapi.org/v2/everything?q=${searchValue}&pageSize=10&apiKey=${apiKey}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log(data.articles[1]);
    displayNews(data.articles);
  } catch (err) {
    console.log(err);
  }
});
window.addEventListener("load", () => {
  console.log("window loaded");
  fetchNews();
});
