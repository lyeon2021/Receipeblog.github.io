//random function to generate prep time, cook time and servings as the info is not available in api as of now
const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;

window.onload = async () => {
  //Using form get method to fetch recipe id or category name as per user selection
  let queryString = window.location.search;
  let urlParams = new URLSearchParams(queryString);
  let recipeId = urlParams.get("recipeId");
  let categoryId = urlParams.get("select1");
  if (recipeId && !categoryId) {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`)
      .then((response) => response.json())
      .then((data) => {
        document.getElementById("receipe-headline").innerHTML =
          `
        <h2>` +
          data.meals[0].strMeal +
          `</h2>
          <h5>` +
          data.meals[0].strArea +
          ` ` +
          data.meals[0].strCategory +
          `</h5>
        <div class="receipe-duration">
            <h6>Prep: ` +
          random(20, 60) +
          ` mins</h6>
            <h6>Cook: ` +
          random(15, 90) +
          ` mins</h6>
            <h6>Yields: ` +
          random(2, 10) +
          ` Servings</h6>
        </div> 
        `;

        const recipeInstructions = data.meals[0].strInstructions.split(/\r?\n/);
        let idx = 1;
        recipeInstructions.forEach((instruction) => {
          if (instruction) {
            document.getElementById("preperation-steps").innerHTML +=
              `
          <div class="single-preparation-step d-flex">
          <h4> ` +
              idx +
              `
          </h4>
          <p> ` +
              instruction +
              `
          </p>
          </div>
          `;
            idx++;
          }
        });

        for (let idx = 1; idx <= 20; idx++) {
          ingredient = data.meals[0][`strIngredient${idx}`];
          measurement = data.meals[0][`strMeasure${idx}`];
          if (ingredient) {
            document.getElementById("ingredients").innerHTML +=
              `<div class="custom-control custom-checkbox">
            <input
              type="checkbox"
              class="custom-control-input"
              id="customCheck` +
              idx +
              `"
            />
            <label class="custom-control-label" for="customCheck` +
              idx +
              `"
              >` +
              measurement +
              ` ` +
              ingredient +
              `</label
            >
          </div>`;
          }
        }

        document.getElementById("recipe-video-container").innerHTML =
          `
          <iframe width="100%" height="400" src="` +
          data.meals[0].strYoutube
            .replace("watch", "embed")
            .replace("?v=", "/") +
          `" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        `;

        recipeImg = document.createElement("img");
        recipeImg.src = data.meals[0].strMealThumb;
        recipeImg.width = 250;
        document.getElementById("receipe-img").appendChild(recipeImg);
        document.getElementById("receipe-list-area").remove();
      });
  } else if (categoryId) {
    document.getElementById("ingredients").innerHTML = "";
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryId}`)
      .then((response) => response.json())
      .then((data) => {
        let h3 = document.createElement("h3");
        let h3Text = document.createTextNode(`${categoryId} Recipes`);
        h3.appendChild(h3Text);
        document.getElementById("recipe-list-heading").appendChild(h3);
        data.meals.forEach((meal) => {
          document.getElementById("receipe-list-row").innerHTML +=
            `
      <div class="col-12 col-sm-6 col-lg-4">
          <div class="single-best-receipe-area mb-30">
            <img src="` +
            meal.strMealThumb +
            `" alt="" />
            <div class="receipe-content">
              <a href="receipe-post.html?recipeId=` +
            meal.idMeal +
            `">
                <h5>` +
            meal.strMeal +
            `</h5>
              </a>
            </div>
          </div>
        </div>
      `;
        });
      });
  } else {
    //when there is no recipe id attached to the page, display recipes by category
    document.getElementById("receipe-post-search").style.display = "block";
    fetch(`https://www.themealdb.com/api/json/v1/1/list.php?c=list`)
      .then((response) => response.json())
      .then((data) => {
        for (let x = 0; x < data.meals.length; x++) {
          let option = document.createElement("option");
          option.value = data.meals[x].strCategory;
          option.text = data.meals[x].strCategory;
          document.getElementById("select1").appendChild(option);
        }
        $("select").niceSelect("destroy"); //destroy the plugin
        $("select").niceSelect(); //apply again
        document.getElementById("ingredients").innerHTML = "";

        recipeImg = document.createElement("img");
        recipeImg.src = "../../img/bg-img/about.png";
        document
          .getElementById("recipe-video-container")
          .appendChild(recipeImg);
        document.getElementById("receipe-headline").remove();
        document.getElementById("receipe-img").remove();
        document.getElementById("preperation-steps").remove();
        document.getElementById("ingredients").remove();
        document.getElementById("recipe-list-heading").remove();
        document.getElementById("receipe-list-row").remove();
        document.getElementById("receipe-list-area").remove();
      });
  }
};
