const categories_title = document.getElementById("categories-title");
const categories_paragraph = document.getElementById("categories-paragraph");
const categories_container = document.getElementById("categories-container");

// console.log(categories_title, categories_paragraph, categories_container);

var current_category = parseInt(localStorage.getItem("current_category"));

function surfeCategory(direction) {


	if (direction == 1) {
		if (current_category >= cards_collection[current_category].length)
			current_category = 0
		current_category += 1;
		console.log(current_category);
	}
	else if(direction == -1){
		if (current_category <= 0 )
			current_category = cards_collection[current_category].length
		current_category -= 1;
		console.log("current_category" + current_category);
	}

	categories_title.innerText=		cards_collection[current_category][0];
	categories_paragraph.innerText=	cards_collection[current_category][1];

	generateCards();

	localStorage.setItem("current_category", current_category);
}

function generateCards() {
	// reset
	categories_container.innerHTML="";
	for (let i = 2 ; i < cards_collection[current_category].length; i++){
		// make element
		card = document.createElement("div");
		card_img = document.createElement("img");
		card_title = document.createElement("span");

		// fill elements
		card.className = "category-card"
		card_img.src= cards_collection[current_category][i].img;
		card_img.alt= cards_collection[current_category][i].alt;
		card_title.innerText= cards_collection[current_category][i].title;

		// append sub elements
		card.appendChild(card_img);
		card.appendChild(card_title);

		// append card
		
		categories_container.insertAdjacentElement("beforeend",card);
		//                   ^ less powerful but more optimised 
		// categories_container.appendChild(card)
		//                      ^ powerful but less optimised 

		console.log(i + " card generated " + cards_collection[current_category][i].img);
	}
}
surfeCategory(null);
