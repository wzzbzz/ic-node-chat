// todo
// encrypt text
// push to server

var global = (function($){

	var g = {

		socket: io(),
		chatName: window.location.search.replace("?=", ""),
		loginForm: $("#chat-login-form"),
		chatAvatars: $("#ic-chat-avatars"),
		chatFormContainer: $("#ic-chat"),
		chatForm: $("#chat-message-form"),
		chatUsername: $("#chat-username"),
		chatMessage: $("#chat-message"),
		chatMessageLog: $("#chat-message-log"),
		username: null,
		running: false,
		avatar: false,
		room: null,
		init: function(){
			
			g.loginForm.submit(function(e){

				e.preventDefault();

				g.socket.emit("join",  g.chatUsername.val(), g.chatName);

				return false;

			});

			g.socket.on('joined', function(username){
				
				g.username = username;

				g.loginForm.fadeOut();

				g.socket.emit("get avatars");

			});

			g.socket.on('avatar list', function(files){

				g.appendAvatars(files);

			});

			g.socket.on('set avatar', function(fileName){

				g.avatar = fileName;

				g.chatAvatars.fadeOut();

				g.initChat();

			});	

		},
		appendChat: function(type, text, room){

			var html = "",
				mediaDiv = document.createElement("div"),
				mediaDivObj = $(mediaDiv),
				currentDate = new Date(), 
				currentHour = g.timeParse("hours", currentDate.getHours());

			mediaDivObj.addClass("media");

			html += '<div class="media-left">';

			if(type == "message"){
				html += '<img class="media-object ic-chat-icon" src="/img/avatars/' + text[0] + '">';
			}
			
			html += '</div>';
			html += '<div class="media-body">';

			if(type == "username"){
				html += text + " has joined " + room + " chat.";
			} else {
				html += '<h4 class="media-heading">' 
						+ text[1] 
						+ ' <small>' 
						+ (currentDate.getMonth() + 1)
						+ "/" 
						+ currentDate.getDate()
						+ "/" 
						+ currentDate.getFullYear() 
						+ " @ " 
						+ currentHour[0]
						+ ":" 
						+ currentDate.getMinutes() 
						+ " " + currentHour[1]
						+ '</small></h4>' 
						+ text[2];
			}
			
			html += '</div>';

			mediaDivObj.append(html);

			g.chatMessageLog.append(mediaDivObj);

			var isScrolledToBottom = g.chatMessageLog[0].scrollHeight - g.chatMessageLog[0].clientHeight >= g.chatMessageLog[0].scrollTop + 1;

			if(isScrolledToBottom){
				g.chatMessageLog[0].scrollTop = g.chatMessageLog[0].scrollHeight - g.chatMessageLog[0].clientHeight;
			}

		},
		appendAvatars: function(files){

			var avatarList = "";

			for(var i = 1; i < files.length; i++){

				avatarList += '<div class="col-xs-6 col-md-3">';
				avatarList += '<a href="#" class="thumbnail" data-avatar-file="' + files[i] + '">';
				avatarList += '<img src="/img/avatars/' + files[i] + '">';
				avatarList += '</a>';
				avatarList += '</div>';

			}

			g.chatAvatars.find(".row").append(avatarList);

			g.chatAvatars.fadeIn();

			$(document).on("click", ".thumbnail", function(){

				console.log("click");

				g.socket.emit("avatar selected", $(this).attr("data-avatar-file"));

			});

		},
		initChat: function(){

			g.running = true;

			g.chatFormContainer.fadeIn();

			g.socket.emit("enter chat");

			g.socket.on("entered chat", function(username, room){
				g.appendChat("username", username, room);
			})

			g.chatForm.submit(function(e){

				e.preventDefault();

				if(g.chatMessage.val() == ""){
					return;
				}

				g.socket.emit('chat message', g.chatMessage.val());
				g.chatMessage.val('');

				return false;
			
			});

			g.socket.on('chat message', function(msg){
				g.appendChat("message", msg);
			});

		},
		timeParse: function(type, val){

			switch(type){

				case "hours":

					if(val > 12){

						return [(val - 12), "PM"];
					
					} else if(val < 12) {

						if(val == 12){
							return ["12", "AM"];
						} else {
							return [val, "AM"];
						}

					} else {

						return [val, "PM"];
					
					}

					break;

			}

		}

	}; g.init();

	return g;

}(jQuery));