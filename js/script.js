// Constants & Variables
const reset = document.querySelector("#reset");
const downloadBtn = document.querySelector("#downloadBtn")
const editor = document.querySelector("#editor");
const placeHolder = document.querySelector("#placeholder");
const imgInput = document.querySelector("#img-input");
const canvas = document.querySelector("#preview").querySelector("canvas");
const ctx = canvas.getContext("2d");
let img;

let filters = {
	"brightness": {
		"min": 0,
		"max": 200,
		"value": 100,
		"unit": "%"
	},
	"blur": {
		"min": 0,
		"max": 100,
		"value": 0,
		"unit": "px"
	},
	"contrast": {
		"min": 0,
		"max": 200,
		"value": 100,
		"unit": "%"
	},
	"hueRotate": {
		"min": 0,
		"max": 360,
		"value": 0,
		"unit": "deg"
	},
	"grayscale": {
		"min": 0,
		"max": 100,
		"value": 0,
		"unit": "%"
	},
	"invert": {
		"min": 0,
		"max": 100,
		"value": 0,
		"unit": "%"
	},
	"opacity": {
		"min": 0,
		"max": 100,
		"value": 100,
		"unit": "%"
	}
}

// Creating Filter Elements
function createFilterElements(){
	for (name in filters){
		let filter = filters[name];
		let divHTML = `<div class="filterCont"><label>${name.charAt(0).toUpperCase() + name.slice(1)}</label><br><input type="range" class="filterInput" min="${filter["min"]}" max="${filter["max"]}" value="${filter["value"]}" unit="${filter["unit"]}" name="${name}"></div>`;
		editor.insertAdjacentHTML("beforeend", divHTML);
	}
}
createFilterElements();

// Previewing Selected Img
imgInput.addEventListener("change", (event)=>{
	canvas.style.display = "block";
	let file = event.target.files[0];

	img = new Image();
	img.src = URL.createObjectURL(file);
	
	img.onload = () => {
		placeHolder.style.display = "none";
		canvas.width = img.width;
		canvas.height = img.height;
		ctx.drawImage(img, 0, 0);
	}
});

function makeImg(){
	ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear Previous Img
	ctx.filter = `brightness(${filters.brightness.value}${filters.brightness.unit}) blur(${filters.blur.value}${filters.blur.unit}) contrast(${filters.contrast.value}${filters.contrast.unit}) hue-rotate(${filters.hueRotate.value}${filters.hueRotate.unit}) grayscale(${filters.grayscale.value}${filters.grayscale.unit}) invert(${filters.invert.value}${filters.invert.unit}) opacity(${filters.opacity.value}${filters.opacity.unit})`;
	ctx.drawImage(img, 0, 0);
}

// Applying Filters
function applyFilters(){
	let filterElements = document.querySelectorAll(".filterInput");
	filterElements.forEach((e)=>{
		e.addEventListener("input", ()=>{
			let key = filters[e.name];
			key.value = e.value;
			makeImg();
		});
	});
}
applyFilters();

// Reset
reset.addEventListener("click", ()=>{
	filters = {
		"brightness": {
			"min": 0,
			"max": 200,
			"value": 100,
			"unit": "%"
		},
		"blur": {
			"min": 0,
			"max": 100,
			"value": 0,
			"unit": "px"
		},
		"contrast": {
			"min": 0,
			"max": 200,
			"value": 100,
			"unit": "%"
		},
		"hueRotate": {
			"min": 0,
			"max": 360,
			"value": 0,
			"unit": "deg"
		},
		"grayscale": {
			"min": 0,
			"max": 100,
			"value": 0,
			"unit": "%"
		},
		"invert": {
			"min": 0,
			"max": 100,
			"value": 0,
			"unit": "%"
		},
		"opacity": {
			"min": 0,
			"max": 100,
			"value": 100,
			"unit": "%"
		}
	}
	editor.innerHTML = "";
	createFilterElements();
	applyFilters();

	makeImg();
});

// Downloading Img
downloadBtn.addEventListener("click", ()=>{
	let link = document.createElement("a");
	link.download = "edited-img.png";
	link.href = canvas.toDataURL(); // Convert Canvas Img to URL 
	link.click();
})
