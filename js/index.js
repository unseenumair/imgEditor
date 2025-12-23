// Constants & Variables
const reset = document.querySelector("#reset");
const downloadBtn = document.querySelector("#downloadBtn")
const filtersCont = document.querySelector("#filtersCont");
const cont = document.querySelector("#cyberpunk");
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
		filtersCont.insertAdjacentHTML("beforeend", divHTML);
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
		placeholder.style.display = "none";
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
	if (!(img === undefined)){
		let link = document.createElement("a");
		link.download = "edited-img.png";
		link.href = canvas.toDataURL(); // Convert Canvas Img to URL 
		link.click();
	}
});

// Prevent Right Click
// document.body.addEventListener("contextmenu", e => e.preventDefault());

let presets = {
    "cyberpunk": {
        brightness: 120,
        contrast: 150,
        hueRotate: 280,
        blur: 0,
        grayscale: 0,
        invert: 0,
        opacity: 100
    },
    "noire": {
        brightness: 90,
        contrast: 180,
        hueRotate: 0,
        blur: 2,
        grayscale: 100,
        invert: 0,
        opacity: 100
    },
    "vintage": {
        brightness: 110,
        contrast: 120,
        hueRotate: 30,
        blur: 0,
        grayscale: 20,
        invert: 0,
        opacity: 100
    },
    "dreamy": {
        brightness: 130,
        contrast: 100,
        hueRotate: 200,
        blur: 5,
        grayscale: 0,
        invert: 0,
        opacity: 90
    },
    "retro": {
        brightness: 100,
        contrast: 130,
        hueRotate: 50,
        blur: 0,
        grayscale: 10,
        invert: 0,
        opacity: 100
    },
    "modern_minimal": {
        brightness: 105,
        contrast: 120,
        hueRotate: 0,
        blur: 0,
        grayscale: 5,
        invert: 0,
        opacity: 100
    },
    "neon_glow": {
        brightness: 150,
        contrast: 140,
        hueRotate: 320,
        blur: 2,
        grayscale: 0,
        invert: 10,
        opacity: 100
    }
};

// Creating Presets
function createPresetBtns(){
	return;
}

// Apply the 'cyberpunk' preset
let preset = presets["cyberpunk"];

cont.addEventListener("click", ()=>{
	for (let key in preset) {
    	if (filters[key]) {
        	filters[key].value = preset[key];
    	}
	}
	applyFilters();
	makeImg();
})

// 
// console.log(filters);
