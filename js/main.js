// Constants & Variables

// 0. Actions
const openFilters = document.querySelector("#openFilters");
const reset = document.querySelector("#reset");
const downloadBtn = document.querySelector("#downloadBtn");

// 1. Editor
const editor = document.querySelector("#editor");
const closeFilters = document.querySelector("#closeFilters");
const filtersCont = document.querySelector("#filtersCont");
const filterElements = document.querySelectorAll(".filterInput");
const presetsCont = document.querySelector("#presetsCont");

// Open & Close Editor
openFilters.addEventListener("click", () => editor.style.transform = "translateX(0)");
closeFilters.addEventListener("click", () => editor.style.transform = "translateX(-1000px)");

// 2. Preview
const previewCont = document.querySelector("#preview");
const loader = document.querySelector("#loader");
const placeHolder = document.querySelector("#placeholder");
const imgInput = document.querySelector("#img-input");
const canvas = document.querySelector("#preview").querySelector("canvas");
const ctx = canvas.getContext("2d");
const img = document.querySelector("#previewImg"); const MAX_SIZE = 1500;
const message = document.querySelector("#message");
const msgText = document.querySelector("#msgText");

let filters = {
	"Brightness": {
		"min": 0,
		"max": 200,
		"value": 100,
		"unit": "%"
	},
	"Blur": {
		"min": 0,
		"max": 100,
		"value": 0,
		"unit": "px"
	},
	"Contrast": {
		"min": 0,
		"max": 200,
		"value": 100,
		"unit": "%"
	},
	"HueRotate": {
		"min": 0,
		"max": 360,
		"value": 0,
		"unit": "deg"
	},
	"GrayScale": {
		"min": 0,
		"max": 100,
		"value": 0,
		"unit": "%"
	},
	"Invert": {
		"min": 0,
		"max": 100,
		"value": 0,
		"unit": "%"
	},
	"Opacity": {
		"min": 0,
		"max": 100,
		"value": 100,
		"unit": "%"
	}
}

const presets = {
    "Cyber Punk": {
        Brightness: 120,
        Contrast: 150,
        HueRotate: 280,
        Blur: 0,
        GrayScale: 0,
        Invert: 0,
        Opacity: 100
    },
    "Noire": {
        Brightness: 90,
        Contrast: 180,
        HueRotate: 0,
        Blur: 2,
        GrayScale: 100,
        Invert: 0,
        Opacity: 100
    },
    "Vintage": {
        Brightness: 110,
        Contrast: 120,
        HueRotate: 30,
        Blur: 0,
        GrayScale: 20,
        Invert: 0,
        Opacity: 100
    },
    "Dreamy": {
        Brightness: 130,
        Contrast: 100,
        HueRotate: 200,
        Blur: 5,
        GrayScale: 0,
        Invert: 0,
        Opacity: 90
    },
    "Retro": {
        Brightness: 100,
        Contrast: 130,
        HueRotate: 50,
        Blur: 0,
        GrayScale: 10,
        Invert: 0,
        Opacity: 100
    },
    "Modern Minimal": {
        Brightness: 105,
        Contrast: 120,
        HueRotate: 0,
        Blur: 0,
        GrayScale: 5,
        Invert: 0,
        Opacity: 100
    },
    "Neon Glow": {
        Brightness: 150,
        Contrast: 140,
        HueRotate: 320,
        Blur: 2,
        GrayScale: 0,
        Invert: 10,
        Opacity: 100
    }
};

// Creating Filter Elements & Presets
function createElements(){
	filtersCont.innerHTML = presetsCont.innerHTML = ""; // Clear Conts
	for (name in filters){
		let filter = filters[name];
		let divHTML = `<div class="filterCont"><label>${name}</label><br><input type="range" class="filterInput" min="${filter["min"]}" max="${filter["max"]}" value="${filter["value"]}" unit="${filter["unit"]}" name="${name}"></div>`;
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
	// Storing File and Robust Checking if it is other than image
	let file = event.target.files[0];
	
	if (!(file.type.startsWith("image"))){ showMsg("Invalid Image File"); return }
		
	placeholder.style.display = "none";
	loader.style.opacity = "1";
	
	canvasImg = new Image();
	img.src = canvasImg.src = URL.createObjectURL(file);
	
	img.onload = () => {
		loader.style.opacity = "0";
		img.style.display = "block";
		// Initializing Canvas
		let scale = Math.min(MAX_SIZE/canvasImg.width, MAX_SIZE/canvasImg.height, 1); // DownScaling if img larger than MAX_SIZE
		canvas.width = canvasImg.width * scale;
		canvas.height = canvasImg.height * scale;
		// Enable Actions & Editor
		actions.classList.remove("disable");
		editor.classList.remove("disable");
	}
});

function applyFilter(){ img.style.filter = `brightness(${filters.Brightness.value}${filters.Brightness.unit}) blur(${filters.Blur.value}${filters.Blur.unit}) contrast(${filters.Contrast.value}${filters.Contrast.unit}) hue-rotate(${filters.HueRotate.value}${filters.HueRotate.unit}) grayscale(${filters.GrayScale.value}${filters.GrayScale.unit}) invert(${filters.Invert.value}${filters.Invert.unit}) opacity(${filters.Opacity.value}${filters.Opacity.unit})`; }

function renderFilters(e){
	let key = filters[e.name];
	key.value = e.value;
	applyFilter();
}

function renderPresets(e){
	let preset = presets[e.name];
	for (filter in preset){ filters[filter].value = preset[filter]; }
	// Creating Filters according to selected Preset
	filtersCont.innerHTML = ""; // Clear Conts
	for (name in filters){
		let filter = filters[name];
		let divHTML = `<div class="filterCont"><label>${name}</label><br><input type="range" class="filterInput" min="${filter["min"]}" max="${filter["max"]}" value="${filter["value"]}" unit="${filter["unit"]}" name="${name}"></div>`;
		filtersCont.insertAdjacentHTML("beforeend", divHTML);
	}
	applyFilter();
}

function edit(){
	// Applying Filters
	let filterElements = document.querySelectorAll(".filterInput");
	filterElements.forEach( (e)=> e.addEventListener("input", ()=>renderFilters(e)) );
	
	// Appling Presets
	presetsCont.querySelectorAll("button").forEach((e)=>{
		e.addEventListener("click", ()=>{
				renderPresets(e);
				edit();
			});
		});
}
edit();

// Reset
reset.addEventListener("click", ()=>{
	filters = {
		"Brightness": {
			"min": 0,
			"max": 200,
			"value": 100,
			"unit": "%"
		},
		"Blur": {
			"min": 0,
			"max": 100,
			"value": 0,
			"unit": "px"
		},
		"Contrast": {
			"min": 0,
			"max": 200,
			"value": 100,
			"unit": "%"
		},
		"HueRotate": {
			"min": 0,
			"max": 360,
			"value": 0,
			"unit": "deg"
		},
		"GrayScale": {
			"min": 0,
			"max": 100,
			"value": 0,
			"unit": "%"
		},
		"Invert": {
			"min": 0,
			"max": 100,
			"value": 0,
			"unit": "%"
		},
		"Opacity": {
			"min": 0,
			"max": 100,
			"value": 100,
			"unit": "%"
		}
	}
	createElements();
	edit();
	applyFilter();
});

// Disabling if Img is not present
if (img.src === ""){
	actions.classList.add("disable");
	editor.classList.add("disable");
}

// Downloading Img
downloadBtn.addEventListener("click", download);
downloadBtn.addEventListener("dblclick", (e)=>e.preventDefault()); // Prevent Double Click

function download(){
	if (!(img.src === "")){
		// If no changes made
		if (img.style.filter === 'brightness(100%) blur(0px) contrast(100%) hue-rotate(0deg) grayscale(0%) invert(0%) opacity(100%)' || img.style.filter === ""){
			showMsg("Image is same as when Uploaded");
			return
		}
		
		previewCont.classList.add("downloading");
		loader.style.opacity = "1";
		document.body.style.pointerEvents = "none";
		
		setTimeout(()=>{
			ctx.filter = img.style.filter;
			ctx.drawImage(canvasImg, 0, 0, canvas.width, canvas.height);
			let link = document.createElement("a");
			link.download = "edited-img-by-UmairShakoor.png";
			link.href = canvas.toDataURL(); // Convert Canvas Img to URL 
			link.click();
			
			setTimeout(()=>{
				previewCont.classList.remove("downloading");
				loader.style.opacity = "0";
				document.body.style.pointerEvents = "";
			}, 1000);
		}, 700);
	}
} // Added Multiple TimeOuts to prevent hanging some features...

// showing some msg 
function showMsg(msg){
	msgText.innerText = msg;
	message.style.opacity = "1"
	setTimeout(()=> message.style.opacity = "0", 1500);
}

// Prevent Right Click
document.body.addEventListener("contextmenu", e => e.preventDefault());
