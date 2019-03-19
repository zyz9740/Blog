import React from 'react';
import ReactDOM from 'react-dom';


function getJson(){
   //获取用户填写的信息
    let account = document.getElementById("account").value;
    //利用querySelectorAll找到所有radionuclide，遍历其boolean从而筛选除有效的值。
    let passwd = document.getElementById("passwd").value;

    //这里是封装发送
    let jsoned = JSON.stringify({"account":account,'passwd':passwd});
    console.log("============",jsoned);
    return jsoned;
}

class Login extends React.Component {
  render() {
    return (
       <div>
            <h2>Welcome to MyBlog</h2>
             <form id="myDiv">
                 账号：<input type="text" id="account"/><br />
                 密码：<input type="password" id="passwd"/><br />
                 <button type="button" onClick={this.login}>登陆</button>
                 <button type="button" onClick={this.register}>注册<br /></button>
                 <label id="response"></label>
             </form>
          </div>
    );
  }
  
  login(){
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange=function(){
      if (xmlhttp.readyState ===4 && xmlhttp.status ===200){
        document.getElementById("response").innerHTML = xmlhttp.responseText;
      }
    };
    
    var jsoned = getJson();
    xmlhttp.open("POST","http://127.0.0.1:8000/server/Login/",true);
    xmlhttp.setRequestHeader("Content-type","application/json");
    xmlhttp.send(jsoned);
  }

  register(){
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange=function(){
      if (xmlhttp.readyState ===4 && xmlhttp.status ===200){
        document.getElementById("response").innerHTML = xmlhttp.responseText;
      }
    };
    
    var jsoned = getJson();
    xmlhttp.open("POST","http://127.0.0.1:8000/server/register/",true);
    xmlhttp.setRequestHeader("Content-type","application/json");
    xmlhttp.send(jsoned);
  }

}

//=========================================================
ReactDOM.render(
  <Login />,
  document.getElementById('root')
);