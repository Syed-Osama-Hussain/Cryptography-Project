const select = document.querySelector("#select"),
  CT = document.querySelector("#CT"),
  PT = document.querySelector("#PT"),
  key = document.querySelector("#key"),
  btn = document.querySelectorAll(".btn");

btn[0].addEventListener("click", (e) => {
  switch (parseInt(select.value)) {
    case 0:
      shift(e.currentTarget.innerHTML);
      break;

    case 1:
      viginere(e.currentTarget.innerHTML);
      break;
  }

}, false);


btn[1].addEventListener("click", (e) => {
  switch (parseInt(select.value)) {
    case 0:
      shift(e.currentTarget.innerHTML);
      break;

    case 1:
      viginere(e.currentTarget.innerHTML);
      break;
  }

}, false);

function shift(btnType) {
  let ptval = "";
  let alpha = {};
  let ctval = "";
  let length;

  if (btnType === "Encrypt") {
    ctval = CT.value;
    length = ctval.length;
  } else {

    ptval = PT.value;
    length = ptval.length;
  }

  for (let i = 0; i <= 25; i++) {
    alpha[String.fromCharCode(65 + i)] = i;
  }

  for (let i = 0; i < length; i++) {
    let code = "";
    let uppercase = "";

    if (btnType === "Encrypt") {

      uppercase = ctval[i].toUpperCase();

      if (uppercase.charCodeAt(0) >= 65 && uppercase.charCodeAt(0) <= 90) {

        code = (alpha[uppercase] + parseInt(key.value)) % 26;
        ptval += Object.keys(alpha).find(k => alpha[k] === code);

      } else {

        alert(`Invalid string ${ctval} `);
        return;
      }
    } else {
      uppercase = ptval[i].toUpperCase();

      if (uppercase.charCodeAt(0) >= 65 && uppercase.charCodeAt(0) <= 90) {

        code = (alpha[uppercase] - parseInt(key.value)) % 26;
        ctval += Object.keys(alpha).find(k => alpha[k] === code);

      } else {

        alert(`Invalid string ${ptval} `);
        return;
      }
    }
  }

  if (btnType === "Encrypt") {
    PT.value = ptval;
  } else {
    CT.value = ctval;
  }


};

function viginere(btnType) {
  alert("Viginere");
}