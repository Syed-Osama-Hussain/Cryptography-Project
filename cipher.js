const select = document.querySelector("#select"),
  CT = document.querySelector("#CT"),
  PT = document.querySelector("#PT"),
  key = document.querySelector("#key"),
  btn = document.querySelectorAll(".btn");
let alpha = {};

window.onload = () => {
  CT.value = "";
  PT.value = "";
  if(parseInt(select.value) == 2){
    key.disabled = true;
  }else{
  key.value = "";
  }
}

select.addEventListener("change", (e) => {
  CT.value = "";
  PT.value = "";
  key.value = "";

  if(parseInt(select.value) == 2){
    key.disabled = true;
  }else{
    key.disabled = false;
  }

}, false);

for (let i = 0; i <= 25; i++) {
  alpha[String.fromCharCode(65 + i)] = i;
}

for (let i = 0; i < btn.length; i++) {
  btn[i].addEventListener("click", (e) => {
    switch (parseInt(select.value)) {
      case 0:
        shift(e.currentTarget.innerHTML);
        break;

      case 1:
        viginere(e.currentTarget.innerHTML);
        break;

      case 2:
        substitution(e.currentTarget.innerHTML);
        break;  
    }

  }, false);
}


function checkKey(val) {
  if (val.charCodeAt(0) >= 65 && val.charCodeAt(0) <= 90)
    return true;

  return false;
}


function shift(btnType) {
  let ptval = "";
  let ctval = "";
  let length;

  if (btnType === "Encrypt") {
    ctval = CT.value;
    length = ctval.length;
  } else {

    ptval = PT.value;
    length = ptval.length;
  }


  for (let i = 0; i < length; i++) {
    let code = "";
    let uppercase = "";

    if (btnType === "Encrypt") {

      uppercase = ctval[i].toUpperCase();

      if (checkKey(uppercase)) {

        code = alpha[uppercase] + parseInt(key.value);
        if(code < 0){
          if(code < -26){
            code = code % 26;
            code += 26; 
          }else{
            code += 26;
          }
        }else{
          code = code % 26;
        }
        ptval += Object.keys(alpha).find(k => alpha[k] === code);

      } else {

        alert(`Invalid string ${ctval} `);
        return;
      }
    } else {
      uppercase = ptval[i].toUpperCase();

      if (checkKey(uppercase)) {

        code = alpha[uppercase] - parseInt(key.value);
        if(code < 0){
          if(code < -26){
            code = code % 26;
            code += 26; 
          }else{
            code += 26;
          }
        }else{
          code = code % 26;
        }
        // while (code < 0) {
        //   code += 26;
        // }
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

function constructKey(keyval, text) {

  let len = text.length;

  for (let i = 0; ; i++) {
    if (len == i)
      i = 0;
    if (keyval.length === text.length)
      break;
    keyval += keyval[i];
  }
  return keyval;

}



function viginere(btnType) {
  let keyval = key.value;
  let ptval = "";
  let ctval = "";
  let length;

  if (btnType === "Encrypt") {
    ctval = CT.value;
    length = ctval.length;
    keyval = constructKey(keyval, ctval);
  } else {

    ptval = PT.value;
    length = ptval.length;
    keyval = constructKey(keyval, ptval);
  }

  for (let i = 0; i < length; i++) {
    let code = "";
    let uppercase = "";

    if (btnType === "Encrypt") {

      uppercase = ctval[i].toUpperCase();

      if (checkKey(uppercase)) {

        if (!checkKey(keyval[i].toUpperCase())) {
          alert(`Invalid key ${keyval} `);
          return;
        }

        code = (alpha[uppercase] + alpha[keyval[i].toUpperCase()]) % 26;
        ptval += Object.keys(alpha).find(k => alpha[k] === code);

      } else {

        alert(`Invalid string ${ctval}`);
        return;
      }
    } else {
      uppercase = ptval[i].toUpperCase();

      if (checkKey(uppercase)) {

        if (!checkKey(keyval[i].toUpperCase())) {
          alert(`Invalid key ${keyval} `);
          return;
        }

        code = (alpha[uppercase] - alpha[keyval[i].toUpperCase()] + 26) % 26;

        ctval += Object.keys(alpha).find(k => alpha[k] === code);

      } else {

        alert(`Invalid string ${ptval}`);
        return;
      }
    }
  }

  if (btnType === "Encrypt") {
    PT.value = ptval;
  } else {
    CT.value = ctval;
  }

}


function substitution(btnType){
  const randKey = constructRandKey();
  console.log(randKey);
  let ptval = "";
  let ctval = "";
  let length;
  
  if (btnType === "Encrypt") {
    ctval = CT.value.toUpperCase();
    length = ctval.length;
  } else {

    ptval = PT.value.toUpperCase();
    length = ptval.length;
  }

  for(let i=0;i<length;i++){
    if(btnType == "Encrypt"){
      ptval += Object.keys(randKey).find(k => randKey[k] === ctval[i]);
    
    }else{
      ctval += randKey[ptval[i]];
    }
  }

  if (btnType === "Encrypt") {
    PT.value = ptval;
  } else {
    CT.value = ctval;
  }
}

function constructRandKey(){
  let randKey = {};
  while(Object.keys(randKey).length <= 25){
    let num = Math.floor(Math.random() * (90 - 65 +1) + 65);
    if(!randKey[String.fromCharCode(num)])
      randKey[String.fromCharCode(num)] = String.fromCharCode(Object.keys(randKey).length + 65);
  }
  return randKey;   
}