function tokenizer(expression){
    let tokens=[];
    let num="";
    for(let ch of expression){
        if (ch === '.') {
            if (num.includes('.')) {
              throw new Error("Invalid decimal");
            }
        }
        if(ch>='0' && ch<='9' || ch === '.'){
            num+=ch;
        }
        else{
            if(num!=""){
                tokens.push(num);
                num="";
            }
            tokens.push(ch);
        }
    }
    if (num !== "") {
     tokens.push(num);
    }
    return tokens;
}
function getPriority(char){
    if(char=='+' || char=='-'){
        return 1;
    }
    if(char=='*' || char=='/' || char=='%'){
        return 2;
    }
    return -1;
}
function infixToPostfix(expression){
    const token=tokenizer(expression);
    let i=0;
    let stack=[];
    let ans=[];
    while(i<token.length){
        let ch=token[i];
        if(!isNaN(ch)){
          ans.push(ch);
        }
        else if(ch=='('){
            stack.push(ch);
        }
        else if(ch==')'){
            while(stack.length>0 && stack[stack.length-1]!='('){
              let removed=stack.pop();
              ans.push(removed);
            }
            stack.pop();
        }
        else{
            while(stack.length>0 && getPriority(stack[stack.length-1])>=getPriority(ch)){
              let removed=stack.pop();
              ans.push(removed);
            }
            stack.push(ch);
        }
        i++;
    }
    while(stack.length>0){
        ans.push(stack[stack.length-1]);
        stack.pop();
    }
    return ans;
}

function evalute(ans){
    let stack=[];
    let i=0;
    while(i<ans.length){
        let token=ans[i];
        if(!isNaN(token)){
           stack.push(Number(token));
        }
        else{
            let second=stack.pop();
            let first=stack.pop();
            switch(token){
                case "+": 
                    stack.push(first+second);
                    break;
                case "-": 
                    stack.push(first-second);
                    break;
                case "*": 
                    stack.push(first*second);
                    break;
                case "/": 
                    if (second === 0) {
                      return "Error";
                    }
                    stack.push(first/second);
                    break;
                case "%":
                    stack.push(first%second);
            }
        }
        i++;
    }
    let final=stack.pop();
    return final;
}

let ioscreen=document.querySelector(".display");
let buttons=document.querySelectorAll("button");
let equalTo=document.querySelector(".equals");
let clr=document.querySelector("#Clear");
let del=document.querySelector("#delbutton");


buttons.forEach(
    function(button){
        button.addEventListener("click",()=>{
            const text = button.innerText;
            if (text !== "=" && text !== "DEL" && text !== "AC") {
                ioscreen.value += text;
            }
        })
    }
)

equalTo.addEventListener("click",()=>{
    try{
      const expression = ioscreen.value;
      const ans=evalute(infixToPostfix(expression));
      ioscreen.value=ans;
    }
    catch{
        ioscreen.value="Error";
    }
})

clr.addEventListener("click",()=>{
    ioscreen.value="";
})

del.addEventListener("click",function(){
    let ans=ioscreen.value.slice(0,ioscreen.value.length-1);
    ioscreen.value=ans;
})

