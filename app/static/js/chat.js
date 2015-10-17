window.onload = function() {
	var send = document.getElementById('send');
	var input = document.getElementById('input');
	var messages_list = document.querySelectorAll('.messages_list')[0];
	var users_list = document.querySelectorAll('.users_list')[0];
	var account = document.getElementById('account').textContent;
	socket = io();
	socket.emit('declare', account);
	socket.on('message', function(msg) {
		var data = JSON.parse(msg);
		var tem = document.createElement('li');
		tem.textContent = data.account + " : " + data.message;
		messages_list.appendChild(tem);
	});
	socket.on('online', function(msg) {
		users_list.innerHTML = "";
		var data = JSON.parse(msg);
		var frag = document.createDocumentFragment();
		for (var i in data) {
			var tem = document.createElement('li');
			tem.textContent = data[i]; 
			frag.appendChild(tem);
		}
		users_list.appendChild(frag);
	});
	send.addEventListener('click', function(e) {
		if (input.value == '') {
			e.preventDefault();
			return false;
		} else {
			e.preventDefault();
			var tem = document.createElement('li');
			tem.textContent = account + " : " + input.value;
			messages_list.appendChild(tem);
			var data = {'account': account, 'message': input.value};
			socket.emit('message', JSON.stringify(data));
			return false;
		}
	});
};