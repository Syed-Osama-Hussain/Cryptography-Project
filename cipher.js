const select = document.querySelector("#select"),
  CT = document.querySelector("#CT"),
  PT = document.querySelector("#PT"),
  key = document.querySelector("#key"),
  btn = document.querySelectorAll(".btn");
let alpha = {}, randKey = {};

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
    randKey = constructRandKey();
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
        substitution(e.currentTarget.innerHTML,randKey);
        break;
      
      case 3:
        playFair(e.currentTarget.innerHTML)
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


function substitution(btnType,randKey){
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



function playFair(btnType){
  let keyMatrix = {};

  let ptval = "";
  let ctval = "";
  let length;

  if (btnType === "Encrypt") {
    ctval = CT.value;

    ctval = checkCT(ctval.toUpperCase());
    //console.log(ctval);
    length = ctval.length;
    if(!ctval){
      alert(`Invalid CT value ${CT.value}`)
      return;
    }
    keyMatrix = constructMatrix(key.value.toUpperCase());
  } else {

    ptval = PT.value.toUpperCase();
    //ptval = checkCT(ptval.toUpperCase());
    keyMatrix = constructMatrix(key.value.toUpperCase());
    length = ptval.length;
    if(!ptval){
      alert(`Invalid PT value ${PT.value}`);
      return;
    }
  }
  //console.log(keyMatrix)
  
  if(!keyMatrix){
    alert(`Invalid key ${key.value}`);
    return;
  }

  for(let i=0;i<length;i+=2){
    //console.log(ptval)
    if(btnType == "Encrypt"){
      let index1 = {x: keyMatrix[ctval[i]][0],y:keyMatrix[ctval[i]][1]};
      let index2 = {x: keyMatrix[ctval[i+1]][0],y:keyMatrix[ctval[i+1]][1]};

      //console.log(index1,index2);
      if(index1.x === index2.x){
        let targetIndex = pfSameDimension(index1.y,index2.y,"y")

        ptval += Object.keys(keyMatrix).find(k => keyMatrix[k] === `${index1.x}${targetIndex.t1}`);

        ptval += Object.keys(keyMatrix).find(k => keyMatrix[k] === `${index1.x}${targetIndex.t2}`);        

      }else{

        if(index1.y === index2.y){
          let targetIndex = pfSameDimension(index1.x,index2.x,"x")
          //console.log(targetIndex);
          ptval += Object.keys(keyMatrix).find(k => keyMatrix[k] === `${targetIndex.t1}${index1.y}`);
  
          ptval += Object.keys(keyMatrix).find(k => keyMatrix[k] === `${targetIndex.t2}${index1.y}`);
          }
        else{
          // let index1 = {x: ,y:};
          // let index2 = {x: keyMatrix[ctval[i+1]][0],y:};
          //   }

          ptval += Object.keys(keyMatrix).find(k => keyMatrix[k] === `${keyMatrix[ctval[i+1]][0]}${keyMatrix[ctval[i]][1]}`);
  
          ptval += Object.keys(keyMatrix).find(k => keyMatrix[k] === `${keyMatrix[ctval[i]][0]}${keyMatrix[ctval[i+1]][1]}`);  
      }
      
    }
  }else{
    let index1 = {x: keyMatrix[ptval[i]][0],y:keyMatrix[ptval[i]][1]};
    let index2 = {x: keyMatrix[ptval[i+1]][0],y:keyMatrix[ptval[i+1]][1]};

    //console.log(index1,index2);
    if(index1.x === index2.x){
      let targetIndex = pfSameDimensionDec(index1.y,index2.y,"y")

      ctval += Object.keys(keyMatrix).find(k => keyMatrix[k] === `${index1.x}${targetIndex.t1}`);

      ctval += Object.keys(keyMatrix).find(k => keyMatrix[k] === `${index1.x}${targetIndex.t2}`);        

    }else{

      if(index1.y === index2.y){
        let targetIndex = pfSameDimensionDec(index1.x,index2.x,"x")
        //console.log(targetIndex);
        ctval += Object.keys(keyMatrix).find(k => keyMatrix[k] === `${targetIndex.t1}${index1.y}`);

        ctval += Object.keys(keyMatrix).find(k => keyMatrix[k] === `${targetIndex.t2}${index1.y}`);
        }
      else{
        // let index1 = {x: ,y:};
        // let index2 = {x: keyMatrix[ctval[i+1]][0],y:};
        //   }

        ctval += Object.keys(keyMatrix).find(k => keyMatrix[k] === `${keyMatrix[ptval[i+1]][0]}${keyMatrix[ptval[i]][1]}`);

        ctval += Object.keys(keyMatrix).find(k => keyMatrix[k] === `${keyMatrix[ptval[i]][0]}${keyMatrix[ptval[i+1]][1]}`);  
    }
    
  }    
    }
  }
  
  if (btnType === "Encrypt") {
    PT.value = ptval;
  } else {
    CT.value = ctval;
  }
}


function constructMatrix(keyStr){
  let keyMatrix = {};
  let keyval = keyStr.replace(/J/g,"I");
  //console.log(keyval)
  let x =0,y=1;
  for(let i=0; i<keyval.length;i++){
    
    if(checkKey(keyval[i])){
      
      if(Object.values(keyMatrix).length > 25){
        break;
      }
      
      //console.log(keyval[i]);
      if(!Object.keys(keyMatrix).find(keymat => keymat === keyval[i]))
      {
        x += 1
        keyMatrix[keyval[i]] = `${x}${y}` ;        
      }

      if(x % 5 == 0 && x != 0){
        x = 0;
        y +=1;
      } 
    
    }else{
      return false;
    }
  
  }

  for(let i = 65;i<=90;i++){
    let alp="";
    
    if(i === 74){
      alp = "L"
    }else{
      alp = String.fromCharCode(i);
    }
    
    if(!Object.keys(keyMatrix).find(keymat => keymat === alp))
    {
      x += 1

      keyMatrix[alp] = `${x}${y}`;        

    }

    if(x % 5 == 0 && x != 0){
      x = 0;
      y +=1;
    }
  
  }
  return keyMatrix;
}

function checkCT(str){
  for(let i=0;i<str.length;i++){
    if(!checkKey(str[i]))
      return false;
    
    if(str[i] === str[i-1]){
      
      if(str[i] === str[i-1] && str[i] === "X"){
        str = str.slice(0,i) + "K" + str.slice(i,str.length+1);         
      }else{
        str = str.slice(0,i) + "X" + str.slice(i,str.length+1); 
      }
    
    }
  }

  if(str.length % 2 !== 0){
    if(str[str.length-1] != "X"){
      str += "X";
    }else{
      str += "K";
    }
  }
  return str;
}

function pfSameDimension(index1,index2,dim){

  let targetIndex1 = (parseInt(index1) + 1) % 5,targetIndex2 = (parseInt(index2) + 1) % 5;
       
  if(targetIndex1 === 0)
   targetIndex1 = 5; 
 
  if(targetIndex2 === 0)
   targetIndex2 = 5;

  return {t1:targetIndex1,t2:targetIndex2};
  }

  function pfSameDimensionDec(index1,index2,dim){

    let targetIndex1 = (parseInt(index1) - 1) % 5,targetIndex2 = (parseInt(index2) - 1) % 5;
         
    if(targetIndex1 === 0)
     targetIndex1 = 5; 
   
    if(targetIndex2 === 0)
     targetIndex2 = 5;
  

    return {t1:targetIndex1,t2:targetIndex2};
    }

//MYATXTITUDEISFAIRX
//TFFNZQMOXAHLYABG 