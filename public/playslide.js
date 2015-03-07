document.getElementById("forward").addEventListener('click', move_forward);

var next_slide = 1;

function move_forward(event) {
  next_slide += 1;
  document.getElementById("forward").innerHTML = next_slide;
}

function edit_prompt(event) {
  their_choice = prompt("What student do you want to edit?");
  attribute_to_edit = prompt("What attribute would you like to edit?");
  new_edit = prompt("What would you like to change " + attribute_to_edit + " to?");
  set_edit_params();
}

function set_edit_params() {
  get_new_slide = new XMLHttpRequest;
  get_new_slide.open("post", "http://localhost:4567/update/"+their_choice);
  get_new_slide.send();
  get_new_slide.addEventListener("load", function(event){
	  response =JSON.parse(this.response);
	  if(attribute_to_edit === "id"){
		  get_new_slide.id= new_edit;
	  }
	  else  {
		  alert("Didn't work");
	  }
	  sendData(get_new_slide);
  
  })
}

function sendData(data) {
  var XHR = new XMLHttpRequest();
  var urlEncodedData = "";
  var urlEncodedDataPairs = [];
  var name;

  // We turn the data object into an array of URL encoded key value pairs.
  for(name in data) {
    urlEncodedDataPairs.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]));
  }

  // We combine the pairs into a single string and replace all encoded spaces to 
  // the plus character to match the behaviour of the web browser form submit.
  urlEncodedData = urlEncodedDataPairs.join('&').replace(/%20/g, '+');

  // We define what will happen if the data is successfully sent
  XHR.addEventListener('load', function(event) {
    alert('Yeah! Data sent and response loaded.');
  });

  // We define what will happen in case of error
  XHR.addEventListener('error', function(event) {
    alert('Oups! Something goes wrong.');
  });

  // We setup our request
  XHR.open('POST', "http://localhost:4567/students/edited");

  // We add the required HTTP header to handle a form data POST request
  XHR.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
 
  // And finally, We send our data.
  XHR.send(urlEncodedData);
}