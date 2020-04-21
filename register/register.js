// JavaScript Document
var valcode = -1;
var wait=60;

function RegisterTel(){
	var text_account=document.getElementsByName("account")[0].value;
	var text_telcode=document.getElementsByName("telcode")[0].value;
	var text_password=document.getElementsByName("password")[0].value;
	var text_error=document.getElementsByClassName("alert-error")[0];
	
	if(text_telcode!=valcode){
		text_error.innerHTML="验证码错误";
		text_error.display="block";
		return;
	}
	
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange=function(){
		if(xmlhttp.readyState==4 && xmlhttp.status == 200){
			var arr = JSON.parse(xmlhttp.responseText);
			if(arr['data']){
				alert("注册成功\n为您跳转到登录页面。");
				window.location.href="../";
			}
			else{
				text_error.innerHTML=arr["msg"];
				text_error.display="block";
			}
		}
		
	}
	xmlhttp.open("POST","http://39.109.117.147/tp5.1/public/index.php/index/log/register?",true);
	xmlhttp.send("username="+text_account+"&password="+text_password);
}

function Register(){
	var text_account=document.getElementsByName("account")[0].value;
	var text_password=document.getElementsByName("password")[0].value;
	var text_repassword=document.getElementsByName("repassword")[0].value;
	var text_error=document.getElementsByClassName("alert-error")[0];
	
	if(text_password!=text_repassword){
		text_error.innerHTML="您两次输入的密码不一致";
		text_error.display="block";
		return;
	}
	
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange=function(){
		if(xmlhttp.readyState==4 && xmlhttp.status == 200){
			var arr = JSON.parse(xmlhttp.responseText);
			if(arr['data']){
				alert("注册成功\n为您跳转到登录页面。");
				window.location.href="../";
			}
			else{
				text_error.innerHTML=arr["msg"];
				text_error.display="block";
			}
		}
		
	}
	xmlhttp.open("POST","http://39.109.117.147/tp5.1/public/index.php/index/log/register?",true);
	xmlhttp.send("username="+text_account+"&password="+text_password);

}

function pass_eye(){
	var pass = document.getElementsByName("password")[0];
	var eye = document.getElementsByName("eye1")[0];
	
	if(pass.type=="password"){
		eye.src="resource/eye/opened_eye.svg";
		pass.type="text";
	}
	else{
		eye.src="resource/eye/closed_eye.svg";
		pass.type="password";
	}
}

function time(o) {
	if (wait == 0) {
		o.removeAttribute("disabled");
		o.value = "发送验证码";
		o.style.opacity = "1.0";
		wait = 60;
	} else {
		o.setAttribute("disabled", true);
		o.value = "重新发送(" + wait + ")";
		wait--;
		setTimeout(function () {time(o)},1000)
	}
}

function sendMessage(val){
	valcode=0;
	while(valcode<100000||valcode>=1000000){
		valcode=Math.random()*1000000;
		valcode=Math.round(valcode);
	}
	var text_account=document.getElementsByName("account")[0].value;
	var text_error=document.getElementsByClassName("alert-error")[0];
	
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange=function(){
		if(xmlhttp.readyState==4 && xmlhttp.status == 200){
			var arr = JSON.parse(xmlhttp.responseText);
			if(arr['code']==1){
				time(val);
				val.style.opacity="0.5";
			}
			else{
				text_error.innerHTML=arr["msg"];
				text_error.display="block";
			}
		}
		
	}
	xmlhttp.open("POST","http://39.109.117.147/tp5.1/public/index.php/index/log/get_code?",true);
	xmlhttp.send("tel="+text_account+"&valcode="+valcode);
}

function Repassword(){
	var text_account=document.getElementsByName("account")[0].value;
	var text_telcode=document.getElementsByName("telcode")[0].value;
	var text_password=document.getElementsByName("password")[0].value;
	var text_error=document.getElementsByClassName("alert-error")[0];
	if(text_telcode!=valcode){
		text_error.innerHTML="验证码错误";
		text_error.display="block";
		return;
	}
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange=function(){
		if(xmlhttp.readyState==4 && xmlhttp.status == 200){
			var arr = JSON.parse(xmlhttp.responseText);
			if(arr['data']){
				alert("重置成功\n为您跳转到登录页面。");
				window.location.href="../";
			}
			else{
				text_error.innerHTML=arr["msg"];
				text_error.display="block";
			}
		}
	}
	xmlhttp.open("POST","http://39.109.117.147/tp5.1/public/index.php/index/log/update_password?",true);
	xmlhttp.send("username="+text_account+"&password="+text_password);
}

