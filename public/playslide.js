document.getElementById("forward").addEventListener('click', move_forward);

var next_slide = 1;

function move_forward(event) {
  next_slide += 1;
  document.getElementById("forward").innerHTML = next_slide;
}