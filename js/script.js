const apiKey = "00227680d6694ae6b55d4a957ad79874";
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
async function fetchRandomNews() {
  try {
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apiKey=${apiKey}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    displayNews(data.articles);
  } catch (error) {
    console.log("Error fetching random news: ", error);
  }
}
searchButton.addEventListener("click", async () => {
  const inputValue = searchInput.value;
  if (inputValue !== "" && isNaN(inputValue)) {
    try {
      const apiUrl = `https://newsapi.org/v2/everything?q=${inputValue}&pageSize=10&apiKey=${apiKey}`;
      const response = await fetch(apiUrl);
      const data = await response.json();
      displayNews(data.articles);
    } catch (error) {
      console.error("Error fetching random news: ", error);
    }
  } else {
    alert(
      "You can't give any number or empty input field. Please search a relevant news or article"
    );
  }
});

function displayNews(articles) {
  const blogContainer = document.getElementById("blog-container");
  blogContainer.innerHTML = "";
  blogContainer.innerHTML = articles

    .map((article) => {
      if (!(article.content === "[Removed]")) {
        return `<div class="blog-card">
          <img src="${article.urlToImage}" alt="image" />
          <h2>${article.title}</h2>
          <p>
          ${article.description}
          </p>
        </div>`;
      }
      return "";
    })
    .join("");

  const newsList = document.querySelectorAll(".blog-card");
  newsList.forEach((singleNews) => {
    singleNews.addEventListener("click", () => {
      const img = singleNews.firstElementChild;
      articles.forEach((article) => {
        // console.log(img.src);
        // console.log(article.urlToImage);
        if (img.src === article.urlToImage) {
          window.open(article.url, "_blank");
        }
      });
    });
  });
}
window.addEventListener("load", () => fetchRandomNews());
