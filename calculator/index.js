function checkInvalid(str) {
  if (isNaN(str)) {
    return "Invalid Expression!"
  }
  return str;
}
function evo(str) {
  var temp = str;var tempo;var operator=[];var operands=[];
  try{
    //var result=eval(str);
    //op.value=result;
    for(i=0;i<str.length;i++) {
      if (isNaN(str[i]) && (str[i]!=".")) {
        operator.push(str[i]);
        switch(str[i]) {
          case "+":
            temp=temp.replace("+"," ");
            break;
           case "-":
            temp=temp.replace("-"," ");
            break;
           case "*":
            temp=temp.replace("*"," ");
            break;
           case "/":
            temp=temp.replace("/"," ");
            break;
           default:
            console.log("notfound");
            break;
        }
      }
    }
    //console.log(temp);
    operands=temp.split(" ");
    if(operands.length==1) {
      return checkInvalid(operands[0]);
    }
    //console.log(operator,operands);
    var prevent = 0;
    while(operator[0]!=null) {prevent++;if (prevent>100){break;};
      for(i=0;i<operator.length;i++){
        while(operator.indexOf("/")!=-1){console.log("divide");prevent++;if (prevent>100){break;};
          var index=operator.indexOf("/");
          operands[index]=parseFloat(operands[index])/parseFloat(operands[index+1]);
          console.log(operands[index],index);
          operator.splice(index,1);
          operands.splice(index+1,1);
        }//console.log(operands);
        while(operator.indexOf("*")!=-1){console.log("into");prevent++;if (prevent>100){break;};
          var index=operator.indexOf("*");
          operands[index]=parseFloat(operands[index])*parseFloat(operands[index+1]);
          console.log(operands[index],index);
          operator.splice(index,1);
          operands.splice(index+1,1);
        }//console.log(operands);
        while(operator.indexOf("+")!=-1){console.log("plus");prevent++;if (prevent>100){break;};
          var index=operator.indexOf("+");
          operands[index]=parseFloat(operands[index])+parseFloat(operands[index+1]);
          console.log(operands[index],index);
          operator.splice(index,1);
          operands.splice(index+1,1);
        }//console.log(operands);
        while(operator.indexOf("-")!=-1){console.log("minus");prevent++;if (prevent>100){break;};
          var index=operator.indexOf("-");
          operands[index]=parseFloat(operands[index])-parseFloat(operands[index+1]);
          console.log(operands[index],index);
          operator.splice(index,1);
          operands.splice(index+1,1);
        }//console.log(operands);
      }
    }//op.value=checkInvalid(operands[0]);
    return checkInvalid(operands[0]);
  }
  catch(e) {
    op.value=e.message;
  }
}
function calc(mainStr) {
  mainStr = "("+mainStr+")";
  var result = [""];
  try{
    let preventmain=0;
    /*console.log("hohooh",mainStr.lastIndexOf('('),mainStr.indexOf(')',mainStr.lastIndexOf('(')));
    console.log(evo(mainStr.slice(mainStr.lastIndexOf('(')+1,mainStr.indexOf(')',mainStr.lastIndexOf('(')))));*/
    while(mainStr.lastIndexOf('(')!=-1){preventmain++;
      if (preventmain>20) {
        break;
      }
      if(!isNaN(mainStr[mainStr.lastIndexOf('(')-1]) && (mainStr.lastIndexOf('(')!=0)) {
        mainStr = mainStr.slice(0,mainStr.lastIndexOf('('))+"*"+mainStr.slice(mainStr.lastIndexOf('('),mainStr.length);
      }
      if(!isNaN(mainStr[mainStr.indexOf(')',mainStr.lastIndexOf('('))+1]) && (mainStr[mainStr.indexOf(')',mainStr.lastIndexOf('('))+1]!=undefined)) {
        mainStr = mainStr.slice(0,mainStr.indexOf(')',mainStr.lastIndexOf('('))+1)+"*"+mainStr.slice(mainStr.indexOf(')',mainStr.lastIndexOf('('))+1,mainStr.length);
      }
     console.log(mainStr);
      mainStr=mainStr.replace(mainStr.slice(mainStr.lastIndexOf('('),mainStr.indexOf(')',mainStr.lastIndexOf('('))+1),evo(mainStr.slice(mainStr.lastIndexOf('(')+1,mainStr.indexOf(')',mainStr.lastIndexOf('(')))));
    }
    op.value=checkInvalid(mainStr);
  }
  catch(e){
    op.value=e.message;
  }
}