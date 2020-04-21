// JavaScript Document
var account = "";
var password = "";
var statu = 0;

function toPassword() {
	var heading = document.getElementsByClassName("heading")[0];
	var div = document.getElementsByClassName("return-account")[0];
	var user_account = document.getElementsByClassName("user-account")[0];
	var text_account = document.getElementsByName("account")[0];
	var text_password = document.getElementsByName("password")[0];
	var text_error = document.getElementsByClassName("alert-error")[0];
	var login_button = document.getElementsByClassName("next")[0];
	var to_rotate = document.getElementById("to-rotate");
	var set_tips = document.getElementsByClassName("tips")[0];
	account = document.getElementsByName("account")[0].value;
	password = document.getElementsByName("password")[0].value;
	if (statu == 0) {
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function () {
			
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				if (arr['data']!=1) {
					text_error.innerHTML = "该账户不存在。请输入其它账户!";
				} else {
					to_rotate.classList.add("run-slide");
					statu = 1;
					user_account.innerHTML = account;
					heading.innerHTML = "输入密码";
					text_account.style.display = "none";
					text_password.style.display = "block";
					div.style.display = "inline-block";
					text_error.innerHTML = "";
					login_button.value = "登录";
					set_tips.innerHTML="忘记密码?&nbsp;<a href='/register/repassword.html'>立即找回!</a>";
					
				}
			}
		}
		xmlhttp.open("GET", "http://39.106.64.208/tp5.1/public/index.php/index/user/search_user?username="+account, true);
		xmlhttp.send();
	} else if (statu == 1) {
		xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function () {
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				var arr = JSON.parse(xmlhttp.responseText);
				if (arr['code']!=1) {
					text_error.innerHTML = "你的账号或者密码错误。如果你不记得你的密码，\n请立即进行重置。";
				} else {
                    sessionStorage.setItem("username",account);
					window.location.href = "main?username="+account+"&type="+arr['data'];
				}
			}
		}
		xmlhttp.open("POST", "http://39.109.117.147/tp5.1/public/index.php/index/log/login?", true);
		xmlhttp.send("username=" + account + "&password=" + password);
	}

}

function toAccount() {
	account = document.getElementsByName("account")[0].value;
	statu = 0;

	var heading = document.getElementsByClassName("heading")[0];
	var div = document.getElementsByClassName("return-account")[0];
	var text_account = document.getElementsByName("account")[0];
	var text_password = document.getElementsByName("password")[0];
	var text_error = document.getElementsByClassName("alert-error")[0];
	var login_button = document.getElementsByClassName("next")[0];
	var to_rotate = document.getElementById("to-rotate");
	var set_tips = document.getElementsByClassName("tips")[0];

	to_rotate.classList.add("run-rslide");
	heading.innerHTML = "登录";
	div.style.display = "none";
	text_error.value = "";
	text_account.style.display = "block";
	text_password.value = "";
	text_password.style.display = "none";
	text_error.innerHTML = "";
	login_button.value = "下一步";
	set_tips.innerHTML="没有账户?&nbsp;<a href='register'>创建一个!</a></a>";
}
