let mode = "text";
let userImage = "";

/* AUTH */
function showSignup() {
  document.getElementById("signupForm").classList.remove("hidden");
}

function showLogin() {
  document.getElementById("loginForm").classList.remove("hidden");
}

function signup() {
  let name = document.getElementById("name").value;
  localStorage.setItem("user", name);

  let img = document.getElementById("image").files[0];
  if (img) {
    userImage = URL.createObjectURL(img);
  }

  enterChat();
}

function enterChat() {
  let user = localStorage.getItem("user");
  if (!user) {
    alert("Login first!");
    return;
  }

  document.getElementById("auth").classList.add("hidden");
  document.getElementById("chatUI").classList.remove("hidden");
}

/* MODE */
function setMode(m) {
  mode = m;
}

/* VOICE */
function speak(text) {
  let speech = new SpeechSynthesisUtterance(text);
  speech.lang = "en-US";
  window.speechSynthesis.speak(speech);
}

/* CARTOON EFFECT */
function cartoonEffect(img) {
  img.style.filter = "contrast(200%) saturate(150%)";
}

/* SEND MESSAGE */
async function sendMsg() {
  let msg = document.getElementById("msg").value;
  let chatBox = document.getElementById("chatBox");

  let userMsg = document.createElement("p");
  userMsg.innerText = "You: " + msg;
  chatBox.appendChild(userMsg);

  let res = await fetch("/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ message: msg })
  });

  let data = await res.json();

  let botMsg = document.createElement("p");

  if (mode === "text") {
    botMsg.innerText = "Quans: " + data.reply;
  } else {
    botMsg.innerHTML = `
      <img src="${userImage}" width="120" onload="cartoonEffect(this)">
      <p>${data.reply}</p>
    `;
  }

  speak(data.reply);
  chatBox.appendChild(botMsg);
}