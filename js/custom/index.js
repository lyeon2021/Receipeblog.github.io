const bestRecipeIds = ["52848", "52812", "52765", "52787", "52857", "52785"];

//Hero section - 3 recipes are displayed at random from API in the form of a slider
window.onload = async () => {
  $("#carousel-parent").owlCarousel();
  for (let x = 0; x <= 2; x++) {
    const item = await fetch(
      "https://www.themealdb.com/api/json/v1/1/random.php"
    );
    const itemResp = await item.json();
    $("#carousel-parent")
      .trigger("add.owl.carousel", [
        `<div
        class="single-hero-slide bg-img"
        style="background-image: url(` +
          itemResp.meals[0].strMealThumb +
          `)"
      >
        <div class="container h-100">
          <div class="row h-100 align-items-center">
            <div class="col-12 col-md-9 col-lg-7 col-xl-6">
              <div
                class="hero-slides-content"
                data-animation="fadeInUp"
                data-delay="100ms"
              >
                <h2 data-animation="fadeInUp" data-delay="300ms">
                  ` +
          itemResp.meals[0].strMeal +
          `
                </h2>
                <p data-animation="fadeInUp" data-delay="700ms">
                  ` +
          itemResp.meals[0].strArea +
          ` ` +
          itemResp.meals[0].strCategory +
          `
                </p>
                <a
                  href="receipe-post.html?recipeId=` +
          itemResp.meals[0].idMeal +
          `"
                  class="btn delicious-btn"
                  data-animation="fadeInUp"
                  data-delay="1000ms"
                  >See Recipe</a
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>`,
      ])
      .trigger("refresh.owl.carousel");
  }

  //top recipes displayed in rows
  bestRecipeIds.forEach((recipeId) => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`)
      .then((response) => response.json())
      .then((data) => {
        document.getElementById("best-receipes-row").innerHTML +=
          `
        <div class="col-12 col-sm-6 col-lg-4">
            <div class="single-best-receipe-area mb-30">
              <img src="` +
          data.meals[0].strMealThumb +
          `" alt="" />
              <div class="receipe-content">
                <a href="receipe-post.html?recipeId=` +
          data.meals[0].idMeal +
          `">
                  <h5>` +
          data.meals[0].strMeal +
          `</h5>
                </a>
              </div>
            </div>
          </div>
        `;
      });
  });
};
