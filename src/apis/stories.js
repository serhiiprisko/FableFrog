
import $ from "jquery";
import { location } from './config';

export const _contactUs = (name, email, message) => {
	return new Promise((resolve, reject) => {
		$.ajax({
			type: "POST",
			url : `${location}/api/stories.php`,
			data : {
				'Name': name,
				'Email': email,
				'Message': message
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

export const _getUserStories = (type, value, ownerId, skip) => {
	return new Promise((resolve, reject) => {
		$.ajax({
			type: "POST",
			url : `${location}/api/stories.php`,
			data : {
				'WHAT': "GET-USER-STORIES",
                'TYPE': type,
				'VALUE': value,
                'ID': ownerId,
                'SKIP': skip
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

export const _getTrending = (userId) => {
	return new Promise((resolve, reject) => {
		$.ajax({
			type: "POST",
			url : `${location}/api/stories.php`,
			data : {
				'WHAT': "GET-TRENDING",
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

export const _getTopics = () => {
	return new Promise((resolve, reject) => {
		$.ajax({
			type: "POST",
			url : `${location}/api/stories.php`,
			data : {
				'WHAT': "GET-TOPICS",
				'ID': null
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

export const _getSubTopics = (topic) => {
	return new Promise((resolve, reject) => {
		$.ajax({
			type: "POST",
			url : `${location}/api/stories.php`,
			data : {
				'WHAT': "GET-SUBTOPICS",
				'TOPIC': topic,
				'ID': null
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

export const _getSingleSubTopic = (userId, topic) => {
	return new Promise((resolve, reject) => {
		$.ajax({
			type: "POST",
			url : `${location}/api/stories.php`,
			data : {
				'WHAT': "GET-SINGLE-SUBTOPIC",
				'TOPIC': topic,
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

export const _getSuggestions = () => {
	return new Promise((resolve, reject) => {
		$.ajax({
			type: "POST",
			url : `${location}/api/stories.php`,
			data : {
				'WHAT': "GET-SUGGESTIONS",
				'ID': null
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

export const _postFable = (userId, title, voice, audio, subTopics, image, url, isUrl) => {
	const topics = [], topicIds = [];
	subTopics.map((item, i) => {
		topics.push(item.title);
		topicIds.push(item.id);
	})
	const audioFile = new File([audio], 'recording.wav', {
		type: "audio/wav"
	})

	let formData = new FormData();
	formData.append("WHAT", "STORE-STORY");
	formData.append("ID", userId);
	formData.append("FableTitle", title);
	formData.append("VOICE", voice);
	formData.append("AUDIO", audioFile);
	formData.append("TOPICS", topics);
	formData.append("TOPICS-IDS", topicIds);
	if (isUrl) {
		formData.append("CoverImage", null);
		formData.append("COVER-IMAGE-URL", url);
	}
	else {
		formData.append("CoverImage", image);
		formData.append("COVER-IMAGE-URL", "");
	}

	return new Promise((resolve, reject) => {
		$.ajax({
			type: "POST",
			url : `${location}/api/stories.php`,
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

export const _deleteFable = (userId, fableId) => {
	return new Promise((resolve, reject) => {
		$.ajax({
			type: "POST",
			url : `${location}/api/stories.php`,
			data : {
				'WHAT': "DELETE-FABLE",
				'ID': userId,
				'STORY': fableId
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

export const _playFable = (fableId) => {
	return new Promise((resolve, reject) => {
		$.ajax({
			type: "POST",
			url : `${location}/api/stories.php`,
			data : {
				'WHAT': "STORE-PLAY-COUNT",
				'ID': null,
				'STORY': fableId
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

export const _getSingleStory = (userId, fableId) => {
	return new Promise((resolve, reject) => {
		$.ajax({
			type: "POST",
			url : `${location}/api/stories.php`,
			data : {
				'WHAT': "GET-SINGLE-STORY",
				'ID': userId,
				'STORY': fableId
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

export const _like = (userId, fableId) => {
	return new Promise((resolve, reject) => {
		$.ajax({
			type: "POST",
			url : `${location}/api/stories.php`,
			data : {
				'WHAT': "LIKE",
				'ID': userId,
				'STORY': fableId
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

export const _report = (userId, fableId) => {
	return new Promise((resolve, reject) => {
		$.ajax({
			type: "POST",
			url : `${location}/api/stories.php`,
			data : {
				'WHAT': "REPORT-FABLE",
				'ID': userId,
				'STORY': fableId
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

export const _postVoice = (userId, audio) => {
	const audioFile = new File([audio], 'recording.wav', {
		type: "audio/wav"
	})

	let formData = new FormData();
	formData.append("WHAT", "POST-VOICE");
	formData.append("ID", userId);
	formData.append("AUDIO", audioFile);

	return new Promise((resolve, reject) => {
		$.ajax({
			type: "POST",
			url : `${location}/api/stories.php`,
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

export const _search = (userId, query) => {
	return new Promise((resolve, reject) => {
		$.ajax({
			type: "POST",
			url : `${location}/api/stories.php`,
			data : {
				'WHAT': "SEARCH",
				'ID': userId,
				'QUERY': query
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

export const _getComments = (userId, story) => {
	return new Promise((resolve, reject) => {
		$.ajax({
			type: "POST",
			url : `${location}/api/stories.php`,
			data : {
				'WHAT': "GET-COMMENTS",
				'ID': userId,
				'STORY': story
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

export const _postComment = (userId, fableId, audio, voice) => {
	const audioFile = new File([audio], 'recording.wav', {
		type: "audio/wav"
	})

	let formData = new FormData();
	formData.append("WHAT", "POST-COMMENT");
	formData.append("ID", userId);
	formData.append("FABLE-ID", fableId);
	formData.append("AUDIO", audioFile);
	formData.append("VOICE", voice);

	return new Promise((resolve, reject) => {
		$.ajax({
			type: "POST",
			url : `${location}/api/stories.php`,
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