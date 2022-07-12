/*
	Callback function that is called immediately after JivoChat is loaded
*/
function jivo_onLoadCallback() {
  // Create a DIV element for the label
  window.jivoHelpButton = document.createElement("div");
  jivoHelpButton.setAttribute("id", "jivo_custom_widget");

  // set icon
  const img = document.createElement("img");
  img.setAttribute("src", "/jivosite/images/help.svg");
  img.setAttribute("width", "50");
  img.setAttribute("height", "50");
  jivoHelpButton.appendChild(img);

  // menu

  let menu_xml = `<div id="jivo_menu">
	<div class="jivo_menu_body">
		<li>
			<a href="">
				<img src="/jivosite/images/hart.png" alt="Affiliate program" width="22" height="22">
				Affiliate program
			</a>
		</li>
		<li>
			<a href="">
				<img src="/jivosite/images/knowledge.png" alt="Knowledge base" width="22" height="22">
				Knowledge base
			</a>
		</li>
		<li>
			<div id="jivo_message_button">
				<img src="/jivosite/images/message.png" alt="Message us" width="22" height="22">
				Message us
			</div>
		</li>
	</div>
</div>`;
  let doc = new DOMParser().parseFromString(menu_xml, "text/html");

  const jivoMenu = doc.body.querySelector("#jivo_menu");

  jivoMenu.style.display = "none";

  window.jivoUnreadContent = document.createElement("div");
  jivoUnreadContent.setAttribute("id", "jivo_badge_unread_wrapper");
  window.jivoUnreadBadge = document.createElement("span");
  jivoUnreadBadge.setAttribute("id", "jivo_badge_unread");
  jivoUnreadBadge.textContent = "";

  jivoUnreadContent.style.display = "none";

  jivoUnreadContent.appendChild(jivoUnreadBadge);
  jivoHelpButton.appendChild(jivoMenu);
  jivoHelpButton.appendChild(jivoUnreadContent);
  document.body.appendChild(jivoHelpButton);

  const JivoMessageButton = document.body.querySelector("#jivo_message_button");

  // Adds handlers click on the icon - to maximize the window when clicked
  JivoMessageButton.onclick = function () {
    jivo_api.open();
  };
}

/*
	Callback function jivo_onOpen and jivo_onClose called whenever the chat window JivoChat is expanded or collapsed by the user or by the proactive invitations rule.
*/
function jivo_onOpen() {
  // If chat is deployed - hide shortcut
  if (jivoHelpButton) {
    jivoHelpButton.style.display = "none";
    localStorage.setItem("jivo_unread", 0);
    jivoUnreadContent.style.display = "none";
  }
}
function jivo_onClose() {
  // If chat is minimized - show label
  if (jivoHelpButton) {
    jivoHelpButton.style.display = "flex";
    localStorage.setItem("jivo_unread", 0);
    jivoUnreadContent.style.display = "none";
  }
}
function jivo_onMessageReceived(event) {
  let current_unread = Number(localStorage.getItem("jivo_unread") ?? 0);
  current_unread++;
  localStorage.setItem("jivo_unread", current_unread);
  jivoUnreadBadge.textContent = `${current_unread}`;
  jivoUnreadContent.style.display = "flex";
}
