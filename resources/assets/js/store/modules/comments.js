const state = {
	all: [],
	endpoint: '/api/v1/comments/'
};

const mutations = {
	initComments(state, comments) {
		state.all = comments
	},

	add_Comment(state, comment) {
		state.all.push(comment)
	},

	update_Comment(state, comment) {
		let commentId = comment.id;
		state.all.splice(state.all.findIndex(comment => comment.id === commentId), 1, comment)
	},

	remove_Comment(state, comment_id) {
		state.all.splice(state.all.findIndex(comment => comment.id === comment_id), 1)
	},
};

const getters = {
	allComments: state => state.all,
};

const actions = {
	fetchComments({commit}, params) {
		return new Promise((resolve, reject) => {
			axios.get(state.endpoint)
				.then(({data}) => {
					commit('initComments', data);
					resolve()
				})
				.catch(error => {
					reject(error)
				})
		})
	},

	addComment({commit}, form) {
		return new Promise((resolve, reject) => {
			axios.post(state.endpoint, form)
				.then(({data}) => {
					commit('add_Comment', data);
					resolve()
				})
				.catch(error => {
					reject(error)
				})
		})
	},

	updateComment({commit}, form) {
		return new Promise((resolve, reject) => {
			axios.patch(state.endpoint + form.id, form.data)
				.then(({data}) => {
					commit('update_Comment', data);
					resolve(data)
				})
				.catch(error => {
					reject(error)
				})
		})
	},

	removeComment({commit}, comment_id) {
		return new Promise((resolve, reject) => {
			axios.delete(state.endpoint + comment_id)
				.then(response => {
					commit('remove_Comment', comment_id);
					resolve()
				})
				.catch(error => {
					reject(error)
				})
		})
	},
};

export default {
	state,
	mutations,
	getters,
	actions
}
