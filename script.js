const imageInput = document.getElementById('previewImage');
let imageDisplay = document.getElementById('imageDisplay');

imageInput.addEventListener('change', (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = (e) => {
    imageDisplay.src = e.target.result;
  };
  reader.readAsDataURL(file);
});

// value from input boxes
function convert(){
  var name = document.getElementById("name").value;
  document.getElementById("nm").innerHTML=name;
  var std = document.getElementById("std").value;
  document.getElementById("sd").innerHTML = std; // standard
  var sec = document.getElementById("sec").value;
  document.getElementById("sc").innerHTML = sec; // section
  var sub = document.getElementById("sub").value;
  document.getElementById("sb").innerHTML = sub; // subject
  var scl = document.getElementById("scl").value;
  document.getElementById("sl").innerHTML = scl; // school
}

// background image removing
const photo1 = document.getElementById('imageDisplay');
const apiKey = 'bed6jXmshZ5mbihEAoD9oVFy';
document.getElementById('bg').addEventListener('click', async () => {
  const file = await fetch(photo1.src)
    .then(res => res.blob());

  const formData = new FormData();
  formData.append('image_file', file);
  formData.append('size', 'auto');

  const response = await fetch('https://api.remove.bg/v1.0/removebg', {
    method: 'POST',
    headers: {
      'X-Api-Key': apiKey
    },
    body: formData
  });

  if (response.ok) {
    const blob = await response.blob();
    const newImgUrl = URL.createObjectURL(blob);
    photo1.src = newImgUrl;
    console.log('Background removed successfully');
  } else {
    console.error(`Error: ${response.status} - ${response.statusText}`);
  }
});

// move direction and flip
const img = document.getElementById('imageDisplay');
let rotation = 0;
let scale = 1;
let flipH = 1; 
let flipV = 1; 
let translateY = 0; 
let translateX = 0; 


// Rotate Left
document.getElementById('rotateLeft').addEventListener('click', () => {
  rotation -= 90;
  applyTransform();
});

// Rotate Right
document.getElementById('rotateRight').addEventListener('click', () => {
  rotation += 90;
  applyTransform();
});

// Zoom In
document.getElementById('zoomIn').addEventListener('click', () => {
  scale += 0.1;
  applyTransform();
});

// Zoom Out
document.getElementById('zoomOut').addEventListener('click', () => {
  scale = Math.max(0.1, scale - 0.1); // Prevent scale from going below 0.1
  applyTransform();
});

// Flip Horizontal
document.getElementById('flipHorizontal').addEventListener('click', () => {
  flipH *= -1; // Toggle between 1 and -1
  applyTransform();
});

// Move Up
document.getElementById('moveUp').addEventListener('click', () => {
  translateY -= 10; // Move up by 10px
  applyTransform();
});

// Move Down
document.getElementById('moveDown').addEventListener('click', () => {
  translateY += 10; // Move down by 10px
  applyTransform();
});

document.getElementById('moveLeft').addEventListener('click', () => {
  translateX -= 10; // Move left by 10px
  applyTransform();
});

// Move Right
document.getElementById('moveRight').addEventListener('click', () => {
  translateX += 10; // Move right by 10px
  applyTransform();
});

// Flip Vertical
document.getElementById('flipVertical').addEventListener('click', () => {
  flipV *= -1; // Toggle between 1 and -1
  applyTransform();
});

// Apply all transformations
function applyTransform() {
  img.style.transform = `rotate(${rotation}deg) scale(${scale}) scaleX(${flipH}) scaleY(${flipV}) translateX(${translateX}px) translateY(${translateY}px)`;
}

// download the label

// Capture the HTML element using html2canvas and send the image to remove.bg API
// document.getElementById('download').addEventListener('click', function() {
//   html2canvas(document.querySelector("#container")).then(canvas => {
//       // Convert the canvas to a base64 image (without the prefix)
//           let link = document.createElement('a');
//           link.download = 'div-image.png';
//           link.href = URL.createObjectURL(canvas);
//           link.click();
//       })
// });

document.getElementById('download').addEventListener('click',async ()=>{
    await html2canvas(document.getElementById("container"),{
      scale:0.5
    }).then( async canvas => {
      let link = document.createElement('a');
      link.download = 'div-image.png';
      link.href = canvas.toDataURL();
      link.click();
    });
  })