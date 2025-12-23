// Constants & Variables

// 0. Actions
const openFilters = document.querySelector("#openFilters");
const reset = document.querySelector("#reset");
const downloadBtn = document.querySelector("#downloadBtn");

// 1. Editor
const editor = document.querySelector("#editor");
const closeFilters = document.querySelector("#closeFilters");
const filtersCont = document.querySelector("#filtersCont");
const presetsCont = document.querySelector("#presetsCont");

// Open & Close Editor
openFilters.addEventListener("click", () => editor.style.transform = "translateX(0)");
closeFilters.addEventListener("click", () => editor.style.transform = "translateX(-1000px)");

// 2. Preview
const loader = document.querySelector("#loader");
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

const presets = {
    "Cyber Punk": {
        brightness: 120,
        contrast: 150,
        hueRotate: 280,
        blur: 0,
        grayscale: 0,
        invert: 0,
        opacity: 100
    },
    "Noire": {
        brightness: 90,
        contrast: 180,
        hueRotate: 0,
        blur: 2,
        grayscale: 100,
        invert: 0,
        opacity: 100
    },
    "Vintage": {
        brightness: 110,
        contrast: 120,
        hueRotate: 30,
        blur: 0,
        grayscale: 20,
        invert: 0,
        opacity: 100
    },
    "Dreamy": {
        brightness: 130,
        contrast: 100,
        hueRotate: 200,
        blur: 5,
        grayscale: 0,
        invert: 0,
        opacity: 90
    },
    "Retro": {
        brightness: 100,
        contrast: 130,
        hueRotate: 50,
        blur: 0,
        grayscale: 10,
        invert: 0,
        opacity: 100
    },
    "Modern Minimal": {
        brightness: 105,
        contrast: 120,
        hueRotate: 0,
        blur: 0,
        grayscale: 5,
        invert: 0,
        opacity: 100
    },
    "Neon Glow": {
        brightness: 150,
        contrast: 140,
        hueRotate: 320,
        blur: 2,
        grayscale: 0,
        invert: 10,
        opacity: 100
    }
};

// Creating Filter Elements & Presets
function createElements(){
	filtersCont.innerHTML = presetsCont.innerHTML = ""; // Clear Conts
	for (name in filters){
		let filter = filters[name];
		let divHTML = `<div class="filterCont"><label>${name.charAt(0).toUpperCase() + name.slice(1)}</label><br><input type="range" class="filterInput" min="${filter["min"]}" max="${filter["max"]}" value="${filter["value"]}" unit="${filter["unit"]}" name="${name}"></div>`;
		filtersCont.insertAdjacentHTML("beforeend", divHTML);
	}
	for (preset in presets){
		let btnHTML = `<button class="button hover" name="${preset}">${preset}</button>`;
		presetsCont.insertAdjacentHTML("beforeend", btnHTML);
	}
}
createElements();

// Previewing Selected Img
imgInput.addEventListener("change", (event)=>{
	placeholder.style.display = "none";
	loader.style.opacity = "1";
	let file = event.target.files[0];

	img = new Image();
	img.src = URL.createObjectURL(file);
	
	img.onload = () => {
		loader.style.opacity = "0";
		canvas.style.display = "block";
		canvas.width = img.width;
		canvas.height = img.height;
		ctx.drawImage(img, 0, 0);
	}
});

function makeImg(){
	ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear Previous Img
	ctx.filter = `brightness(${filters.brightness.value}${filters.brightness.unit}) blur(${filters.blur.value}${filters.blur.unit}) contrast(${filters.contrast.value}${filters.contrast.unit}) hue-rotate(${filters.hueRotate.value}${filters.hueRotate.unit}) grayscale(${filters.grayscale.value}${filters.grayscale.unit}) invert(${filters.invert.value}${filters.invert.unit}) opacity(${filters.opacity.value}${filters.opacity.unit})`;
	if(!(img === undefined)){ ctx.drawImage(img, 0, 0); }
}

// Applying Filters
function edit(){
	// Applying Filters
	let filterElements = document.querySelectorAll(".filterInput");
	filterElements.forEach((e)=>{
		e.addEventListener("input", ()=>{
			let key = filters[e.name];
			key.value = e.value;
			makeImg();
		});
	});
	// Appling Presets
	presetsCont.querySelectorAll("button").forEach((e)=>{
		e.addEventListener("click", ()=>{
				let preset = presets[e.name];
				for (filter in preset){
					filters[filter].value = preset[filter];
				}
				// Creating Filters according to selected Preset
				filtersCont.innerHTML = ""; // Clear Conts
				for (name in filters){
					let filter = filters[name];
					let divHTML = `<div class="filterCont"><label>${name.charAt(0).toUpperCase() + name.slice(1)}</label><br><input type="range" class="filterInput" min="${filter["min"]}" max="${filter["max"]}" value="${filter["value"]}" unit="${filter["unit"]}" name="${name}"></div>`;
					filtersCont.insertAdjacentHTML("beforeend", divHTML);
				}
				makeImg();
				edit();
			});
		});
}
edit();

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
	createElements();
	edit();
	makeImg();
});

// Downloading Img
downloadBtn.addEventListener("click", ()=>{
	if (!(img === undefined)){
		let link = document.createElement("a");
		link.download = "edited-img.png";
		link.href = canvas.toDataURL(); // Convert Canvas Img to URL 
		link.click();
	}
});

// Prevent Right Click
// document.body.addEventListener("contextmenu", e => e.preventDefault());
