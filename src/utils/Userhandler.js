function userHandler(username) {
	console.log(username);
	var userName = username;
	console.log(userName);
	return userName;
}

export default class Helper {
	static userHandler() {
		userHandler();
	}
}
