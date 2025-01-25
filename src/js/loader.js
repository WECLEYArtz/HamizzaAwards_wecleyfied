function loadHTML(id, htmlFile){
	fetch(htmlFile).then(fetched => fetched.text()).then(
		snippet => {
		document.getElementById(id).insertAdjacentHTML("beforeend",snippet)}
	).catch(error => console.log(error))
}
