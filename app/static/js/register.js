window.onload = function() {
	var ps = document.getElementById('password');
	var again = document.getElementById('again');
	var submit = document.querySelectorAll("input[type='submit']")[0];
	submit.addEventListener('click', function(e) {
		if (again.value != ps.value) {
			e.preventDefault();
			ps.style.border = "2px red solid";
			again.style.border = "2px red solid";
			var p = submit.previousSibling;
			p.textContent = "the password should be same."
			again.parentNode.insertBefore(p, submit);
			return false;
		} else {
			e.submit();
		}
	});
};