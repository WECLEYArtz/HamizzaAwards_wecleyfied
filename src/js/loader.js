function loadHTML(id, htmlFile){
	fetch(htmlFile).then(fetch => fetch.text()).then(snippet => {
		document.getElementById(id).innerHTML=snippet}
	).catch(error => console.log(error))
}
