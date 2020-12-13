console.log("Welcome");
let addParaCount = 0;
// hiding parameterBox
let paraBox = document.getElementById("paraBox");
paraBox.style.display = "none";

// if user click para hide jsonbox.
let paraRadio = document.getElementById("paraRadio");
paraRadio.addEventListener("click", () => {
  document.getElementById("jsonBox").style.display = "none";
  document.getElementById("paraBox").style.display = "block";
});
// if user click jsonbox hide parabox

let JsonRadio = document.getElementById("jsonRadio");
JsonRadio.addEventListener("click", () => {
  document.getElementById("paraBox").style.display = "none";
  document.getElementById("jsonBox").style.display = "block";
});

// get DOM Element from str
function GetEleFromstr(str) {
  let div = document.createElement("div");
  div.innerHTML = str;
  return div.firstElementChild;
}

// adding more parameters

let add_para = document.getElementById("add-para");
let str = "";
add_para.addEventListener("click", () => {
  let para = document.getElementById("para");
  str = `<div class="form-row my-2">
<label for="url" class="col-sm-2 col-form-label">Parameter ${
    addParaCount + 2
  }</label>
<div class="col-md-4">
  <input
    type="text"
    class="form-control"
    id="parameterKey${addParaCount + 2}"
    placeholder="Enter Parameter ${addParaCount + 2} Key"
  />
</div>
<div class="col-md-4">
  <input
    type="text"
    class="form-control"
    id="parameterValue${addParaCount + 2}"
    placeholder="Enter Parameter ${addParaCount + 2} Value"
  />
</div>
<button class="btn btn-danger del-para">-</button>
</div>`;

  let paraElement = GetEleFromstr(str);
  para.appendChild(paraElement);

  // adding EventListener to remove para

  let del_para = document.getElementsByClassName("del-para");
  for (item of del_para) {
    item.addEventListener("click", (e) => {
      e.target.parentElement.remove();
    });
  }
  addParaCount++;
});

let submit = document.getElementById("submit");
submit.addEventListener("click", () => {
  document.getElementById("resPrism").innerHTML =
    "Please wait..fetching response...";

  // fetch all the user values;
  let input_url = document.getElementById("url").value;
  let request_type = document.querySelector("input[name='requestType']:checked")
    .value;
  let content_type = document.querySelector("input[name='contentType']:checked")
    .value;

  // collecting all para in an object
  if (content_type == "para") {
    data = {};
    for (i = 0; i < addParaCount + 1; i++) {
      if (document.getElementById("parameterKey" + (i + 1)) != undefined) {
        let key = document.getElementById("parameterKey" + (i + 1)).value;
        let value = document.getElementById("parameterValue" + (i + 1)).value;
        data[key] = value;
      }
    }
    data = JSON.stringify(data);
  } else {
    data = document.getElementById("JsonRequest").value;
  }

  if (request_type == "GET") {
    fetch(input_url, {
      method: "GET",
    })
      .then((response) => response.text())
      .then((text) => {
        // document.getElementById('responseJsonText').value = text;
        document.getElementById("resPrism").innerHTML = text;
        Prism.highlightAll();
      });
  } else {
    fetch(input_url, {
      method: "POST",
      body: data,
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.text())
      .then((text) => {
        // document.getElementById('responseJsonText').value = text;
        document.getElementById("resPrism").innerHTML = text;
        Prism.highlightAll();
      });
  }
});

let clear = document.getElementById("clear");
clear.addEventListener("click", () => {
  if(confirm("Do You want to Clear All?")){
    console.clear()
    window.location.reload()
  }
});
