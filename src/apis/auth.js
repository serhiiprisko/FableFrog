
import $ from "jquery";
import { location } from './config';

export const _signInWithGoogle = (user) => {
	return new Promise((resolve, reject) => {
		$.ajax({
			type: "POST",
			url : `${location}/api/auth.php`,
			data : {
				'PROVIDER': "GOOGLE",
				'EMAIL': user.email,
				'ID':  user.uid,
				'FULL-NAME':  user.displayName,
				'DP':  user.photoURL
			},
			success: function(result) {
				resolve(JSON.parse(result));
			},
			error: function(err) {
				reject(JSON.parse(err));
			}
		});
	});
}

export const _signInWithPhone = (user) => {
	return new Promise((resolve, reject) => {
		$.ajax({
			type: "POST",
			url : `${location}/api/auth.php`,
			data : {
				'PROVIDER': "PHONE",
				'PHONE': user.phoneNumber,
				'ID':  user.uid,
			},
			success: function(result) {
				resolve(JSON.parse(result));
			},
			error: function(err) {
				reject(JSON.parse(err));
			}
		});
	});
}

export const _logout = () => {
	return new Promise((resolve, reject) => {
		$.ajax({
			type: "POST",
			url : `${location}/api/auth.php`,
			xhrFields: {
				withCredentials: false
			},
			data : {
				'LOGOUT': "",
			},
			success: function(result) {
				resolve(JSON.parse(result));
			},
			error: function(err) {
				reject(JSON.parse(err));
			}
		});
	});
}

export const _getProfile = (userId, ownerId) => {
	return new Promise((resolve, reject) => {
		$.ajax({
			type: "POST",
			url : `${location}/api/auth.php`,
			data : {
				'WHICH': "PROFILE",
				'ID': userId,
				'USER': ownerId
			},
			success: function(result) {
				resolve(JSON.parse(result));
			},
			error: function(err) {
				reject(JSON.parse(err));
			}
		});
	});
}

export const _updateProfile = (userId, userName, userBio, fbLink, twitterLink, instaLink, linkedinLink) => {
	return new Promise((resolve, reject) => {
		$.ajax({
			type: "POST",
			url : `${location}/api/auth.php`,
			data : {
				'WHICH': "UPDATE-PROFILE",
				'ID': userId,
				'userName': userName,
				'fullName': '',
				'userBio': userBio,
				'fbLink': fbLink,
				'twitterLink': twitterLink,
				'instaLink': instaLink,
				'linkedinLink': linkedinLink,
			},
			success: function(result) {
				resolve(JSON.parse(result));
			},
			error: function(err) {
				reject(JSON.parse(err));
			}
		});
	});
}

export const _uploadProfile = (userId, image) => {
	let formData = new FormData();
	formData.append("WHICH", "UPLOAD-PROFILE");
	formData.append("ID", userId);
	formData.append("ProfileImage", image);

	return new Promise((resolve, reject) => {
		$.ajax({
			type: "POST",
			url : `${location}/api/auth.php`,
			data : formData,
			contentType: false,       // The content type used when sending data to the server.
            cache: false,             // To unable request pages to be cached
            processData: false,
			success: function(result) {
				resolve(JSON.parse(result));
			},
			error: function(err) {
				reject(JSON.parse(err));
			}
		});
	});
}

export const _uploadCover = (userId, image) => {
	let formData = new FormData();
	formData.append("WHICH", "UPLOAD-COVER");
	formData.append("ID", userId);
	formData.append("UserCover", image);

	return new Promise((resolve, reject) => {
		$.ajax({
			type: "POST",
			url : `${location}/api/auth.php`,
			data : formData,
			contentType: false,       // The content type used when sending data to the server.
            cache: false,             // To unable request pages to be cached
            processData: false,
			success: function(result) {
				resolve(JSON.parse(result));
			},
			error: function(err) {
				reject(JSON.parse(err));
			}
		});
	});
}

export const _trackUser = (userId, ownerId) => {
	return new Promise((resolve, reject) => {
		$.ajax({
			type: "POST",
			url : `${location}/api/auth.php`,
			data : {
				'WHICH': "TRACK-USER",
				'ID': ownerId,
				'USER': userId
			},
			success: function(result) {
				resolve(JSON.parse(result));
			},
			error: function(err) {
				reject(JSON.parse(err));
			}
		});
	});
}

export const _subscribeTopic = (userId, topic, isSubTopic) => {
	return new Promise((resolve, reject) => {
		$.ajax({
			type: "POST",
			url : `${location}/api/auth.php`,
			data : {
				'WHICH': "SUBSCRIBE-TOPIC",
				'ID': userId,
				'TOPIC': topic,
				'ISSUBTOPIC': isSubTopic
			},
			success: function(result) {
				resolve(JSON.parse(result));
			},
			error: function(err) {
				reject(JSON.parse(err));
			}
		});
	});
}

export const _getHistory = (userId) => {
    return new Promise((resolve, reject) => {
		$.ajax({
			type: "POST",
			url : `${location}/api/auth.php`,
			data : {
				'WHICH': "HISTORY",
				'ID': userId,
			},
			success: function(result) {
				resolve(JSON.parse(result));
			},
			error: function(err) {
				reject(JSON.parse(err));
			}
		});
	});
}

export const _getUserActivity = (userId) => {
    return new Promise((resolve, reject) => {
		$.ajax({
			type: "POST",
			url : `${location}/api/auth.php`,
			data : {
				'WHICH': "USER-ACTIVITY",
				'ID': userId,
			},
			success: function(result) {
				resolve(JSON.parse(result));
			},
			error: function(err) {
				reject(JSON.parse(err));
			}
		});
	});
}