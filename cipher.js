const select = document.querySelector("#select"),
  CT = document.querySelector("#CT"),
  PT = document.querySelector("#PT"),
  key = document.querySelector("#key"),
  btn = document.querySelector("#btn");

btn.addEventListener("click", (e) => {

  switch (parseInt(select.value)) {
    case 0:
      shift();
      break;

    case 1:
      viginere();
      break;
  }

}, false);

function shift() {
  let ptval = "";
  let ctval = CT.value;
  for (let i = 0; i < ctval.length; i++) {
    let code = "";
    if (parseInt(key.value) != NaN) {
      console.log(parseInt(key.value));
      code = ctval[i].toUpperCase().charCodeAt(0) + parseInt(key.value);
    } else {
      code = ctval[i].toUpperCase().charCodeAt(0) + 1;
    }

    if (code > 90) {
      code -= 26;
    }
    ptval += String.fromCharCode(code);
  }
  PT.value = ptval;
};

function viginere() {
  alert("Viginere");
}