//	<div class="categories-container">
//	 	<div class="category-card">
//			<img src="../image/path" alt="Series N">
//			<span> Title </span>
//		</div>
//	 	...
//	</div>
// data : image , alt , title.

const categories_title = document.getElementById("categories-title");
const categories_paragraph = document.getElementById("categories-paragraph");
const categories_container = document.getElementById("categories-container");

// console.log(categories_title, categories_paragraph, categories_container);

var current_category =parseInt( localStorage.getItem("current_category"));

function surfeCategory(direction) {


	if (direction == 1) {
		current_category += 1;
		console.log(current_category);
	}
	else if(direction == -1){
		current_category -= 1;
		console.log(current_category);
	}

	categories_title.innerText=		headers_collection[current_category].title;
	categories_paragraph.innerText=	headers_collection[current_category].paragraph;

	generateCards(0);

	localStorage.setItem("current_category", current_category);
}

function generateCards(i) {
	categories_container.innerHTML="";
	for (; i < cards_collection[current_category].length; i++){
		const card = document.createElement("div");
		const card_img = document.createElement("img");
		const card_title = document.createElement("span");
		card.className = "category-card"


		card_img.src= cards_collection[current_category][i].img;
		card_img.alt= cards_collection[current_category][i].alt;
		card_title.innerText= cards_collection[current_category][i].title;

		card.appendChild(card_img);
		card.appendChild(card_title);

		categories_container.appendChild(card)

		console.log(i + " card generated " + cards_collection[current_category][i].img);
	}
}
surfeCategory(null);
