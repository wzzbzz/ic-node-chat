(function(w, d){

	var c = {

		init: function(){

			var chatFrame = d.createElement("iframe"),
				chatAnchor = d.getElementById("ic-chat");

			chatFrame.setAttribute("id", "ic-chat")
			chatFrame.setAttribute("name", "ic-chat");
			chatFrame.setAttribute("allowTransparency", "true");
			chatFrame.setAttribute("frameBorder", "0");
			chatFrame.setAttribute("scrolling", "no");
			chatFrame.setAttribute("role", "chat-window");
			chatFrame.setAttribute("title", "Chat");
			chatFrame.setAttribute("src", "http://chat.insertculture.com:8080/?=" + chatName);
			chatFrame.setAttribute("style", "min-width: 300px; min-height: 300px;");

			chatAnchor.appendChild(chatFrame);

		}

	}; c.init();

})(window, document);