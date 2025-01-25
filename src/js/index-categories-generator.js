// <a 
// 	onclick="localStorage.setItem('current_category', 0);"
// 	, href="src/htmls/categories/award-template.html" class="category-card">
// 	<h3>Series with the Most Uploaded Episodes in 2024</h3>
// </a>
const categories_container = document.getElementById("categories-container");
let categorie_template = "";

fetch("src/htmls/layers/award.html").then(fetched => fetched.text()).then(fetched_html => {
	categorie_template = fetched_html;
	console.log ("\""+categorie_template +"\"is loaded");
	generateCategories();
})

function generateCategories() {
	categories_container.innerHTML='';
	
	for (let i = 0; i < cards_collection.length; i++) {
	let categorie_prepared = categorie_template;
		categorie_prepared = categorie_prepared.replace("current_category_value", i)
		categorie_prepared = categorie_prepared.replace("<h3></h3>","<h3>"+cards_collection[i][0][0]+"</h3>")

	categories_container.insertAdjacentHTML("beforeend",categorie_prepared);
	console.log ("\""+categorie_prepared +"\"is modified");
	}
}


