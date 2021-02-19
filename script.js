//Element Defs

const canvas = document.querySelector("canvas");
const minusBtn = document.querySelector(".minus");
const plusBtn = document.querySelector(".plus");
const widthOutput = document.querySelector(".width");
const colorChange = document.querySelector("input[type='color']");
const saveBtn = document.querySelector(".save");
const delBtn = document.querySelector(".clear");
const closeBtn = document.querySelector(".close");
const saveForm = document.querySelector("form");

//Get Canvas Info
let ctx = canvas.getContext("2d");
let boundings = canvas.getBoundingClientRect();

/*Recalculate bounding for resizing */

setInterval(() => {
  boundings = canvas.getBoundingClientRect();
}, 500);

//Defaults
let width = 5;
let color = "black";
let isDrawing = false;
let mX = 0;
let mY = 0;

//Fix Blur Issue
function fixBlur() {
  let dpi = window.devicePixelRatio;
  let style_height = +getComputedStyle(canvas)
    .getPropertyValue("height")
    .slice(0, -2);
  //get CSS width
  let style_width = +getComputedStyle(canvas)
    .getPropertyValue("width")
    .slice(0, -2);
  //scale the canvas
  canvas.setAttribute("height", style_height * dpi);
  canvas.setAttribute("width", style_width * dpi);
}
fixBlur();

//Functions to change canvas items
const updateWidth = newWidth => {
  if (newWidth < 1) return;
  width = newWidth;
  widthOutput.textContent = width;
  ctx.lineWidth = width;
};

updateWidth(width); //Init call

//Event Listeners
plusBtn.addEventListener("click", e => {
  updateWidth(width + 1);
});

minusBtn.addEventListener("click", e => {
  updateWidth(width - 1);
});

delBtn.addEventListener("click", e => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

colorChange.addEventListener("change", e => {
  const currentColor = colorChange.value;
  ctx.strokeStyle = currentColor;
});

//Save the canvas
saveBtn.addEventListener("click", function() {
  document.querySelector(".bg-modal").style.display = "flex";
});

closeBtn.addEventListener("click", e => {
  document.querySelector(".bg-modal").style.display = "none";
});

saveForm.addEventListener("submit", e => {
  const value = document.querySelector(".saveinput").value;
  document.querySelector(".bg-modal").style.display = "none";
  e.preventDefault();
  const DataURL = canvas.toDataURL();
  const a = document.createElement("a");
  a.href = DataURL;
  a.download = value|| "mydrawing";
  a.click();
});

//Drawing!

canvas.addEventListener("mousedown", e => {
  updateMouseEvents(e);
  isDrawing = true;
  ctx.beginPath();
  ctx.moveTo(mX, mY);
});

canvas.addEventListener("mouseup", e => {
  updateMouseEvents(e);
  isDrawing = false;
});

canvas.addEventListener("mousemove", e => {
  updateMouseEvents(e);
  if (isDrawing) {
    ctx.lineTo(mX, mY);
    ctx.stroke();
  }
});

const updateMouseEvents = event => {
  mX = event.clientX - boundings.left;
  mY = event.clientY - boundings.top;
};
