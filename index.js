//          { Initialize number of params }          \\

let paramsCount = 0;

//          { Utility functions }          \\

//          {               1              }          \\

function getElementFromString(string) {
  let div = document.createElement("div");
  div.innerHTML = string;
  return div.firstElementChild;
}

//          { Hide The parametersBox At Start }          \\

const parabox = document.getElementById("parametersBox");
parabox.style.display = "none";

//          { If The User Clicks on The Params,Hide The Json Box }          \\

let paramRadio = document.getElementById("paramsRadio");
paramRadio.addEventListener("click", () => {
  document.getElementById("requestJsonBox").style.display = "none";
  document.getElementById("parametersBox").style.display = "block";
});

//          { If The User Clicks on The Json,Hide the Params Box }          \\

let jsonRadio = document.getElementById("jsonRadio");
jsonRadio.addEventListener("click", () => {
  document.getElementById("requestJsonBox").style.display = "block";
  document.getElementById("parametersBox").style.display = "none";
});
responseJsonText;

//          { If The User Clicks on The + Button Add More parameters }          \\

let addBtn = document.getElementById("addParam");
addBtn.addEventListener("click", () => {
  const params = document.getElementById("params");
  const str = `<div id="parametersBox">
      <div class="form-row">
        <label for="url" class="col-sm-2 col-form-label">Parameter ${paramsCount +
          2}:</label>
        <div class="col-md-4">
          <input
              type="text"
              class="form-control"
              id="parameterKey${paramsCount + 2}"
              placeholder="Enter Parameter ${paramsCount + 2} Key"
            />
        </div>
        <div class="col-md-4">
          <input
              type="text"
              class="form-control"
              id="parameterValue${paramsCount + 2}"
              placeholder="Enter Parameter ${paramsCount + 2} Value"
            />
        </div>
        <button class="btn btn-primary delete">  -  </button>
      </div>
      <div id="params"></div>
    </div>`;
  //          { Convert the element to DOM node }          \\
  let paramElement = getElementFromString(str);
  params.appendChild(paramElement);
  paramsCount++;
  //          { Add a Event Listener To Delete The Parameter }          \\
  const deleteParam = document.querySelectorAll(".delete");
  for (item of deleteParam) {
    item.addEventListener("click", event => {
      let wantToDelete = confirm("Do you want to realy delete it");
      if (wantToDelete) {
        event.target.parentElement.remove();
      }
    });
  }
});

//          { If the User Clickes Submit Button }          \\

let submit = document.getElementById("submit");
submit.addEventListener("click", () => {
  //
  document.getElementById("responseJsonText").value =
    "Please Wait.............. Fetching Data.......................";
  //           { Fetch All the Value that user has Entered }          \\
  let url = document.querySelector("#url").value;
  let requestType = document.querySelector("input[name='requestType']:checked")
    .value;
  let contentType = document.querySelector("input[name='contentType']:checked")
    .value;
  console.log(contentType === "params");
  let data = {};
  if (contentType === "params") {
    console.log("inside params");
    for (let i = 0; i < paramsCount + 1; i++) {
      //Loop through the array and if the option is deleted then ignore it
      if (
        document.getElementById("parameterKey" + (i + 1)) != undefined ||
        document.getElementById("parameterKey" + (i + 1)) != null
      ) {
        let key = document.getElementById("parameterKey" + (i + 1)).value;
        let value = document.getElementById("parameterValue" + (i + 1)).value;
        data[key] = value;
        console.log(data);
      }
    }
    //stringify the object so it can send the Data to the body of POST request
    data = JSON.stringify(data);
  } else {
    // If the the option taken is Json then we can diretly set it to data
    data = document.getElementById("requestJsonText").value;
  }
  // Checking if the requestType is post if it is send the post or send a Get request
  if (requestType === "GET") {
    fetch(url, {
      method: "GET"
    })
      .then(res => res.text())
      .then(text => {
        let responce = document.getElementById("responseJsonText");
        responce.value = text;
      });
  } else if (requestType === "POST") {
    fetch(url, {
      method: "POST",
      body: data,
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then(res => res.text())
      .then(text => {
        let responce = document.getElementById("responseJsonText");
        responce.value = text;
      });
  }
});
