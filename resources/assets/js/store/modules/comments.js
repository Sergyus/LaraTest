// import axios from 'axios'

const state = {
	all: [],
	endpoint: '/api/v1/comments'
};

const mutations = {
	initComments(state, comments) {  // !!!
		state.all = comments
	},

	addMComment(state, comment) {
		console.log('addMComment');
		//state.all.push(comment)
	},

	// updateTask(state, task) {
	// 	let taskId = task.id;
	// 	state.all.splice(state.all.findIndex(task => task.id === taskId), 1, task)
	// },
  //
	// removeTask(state, task) {
	// 	let taskId = task.id;
	// 	state.all.splice(state.all.findIndex(task => task.id === taskId), 1)
	// },
  //
	// clearTasks(state) {
	// 	state.all = []
	// }
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
					commit('addMComment', data);
					console.log('actions addComment');
					resolve()
				})
				.catch(error => {
					reject(error)
				})
		})
	},

	// updateTask({commit}, {task, form}) {
	// 	return new Promise((resolve, reject) => {
	// 		axios.patch(state.endpoint + task.id, form)
	// 			.then(({data}) => {
	// 				commit('updateTask', data.data);
	// 				resolve(data.data)
	// 			})
	// 			.catch(error => {
	// 				reject(error)
	// 			})
	// 	})
	// },
  //
	// removeTask({commit}, task) {
	// 	return new Promise((resolve, reject) => {
	// 		axios.delete(state.endpoint + task.id)
	// 			.then(response => {
	// 				commit('removeTask', task);
	// 				resolve()
	// 			})
	// 			.catch(error => {
	// 				reject(error)
	// 			})
	// 	})
	// },
  //
	// deleteTasks({commit, getters}) {
	// 	return new Promise((resolve, reject) => {
	// 		axios.delete(state.endpoint)
	// 			.then(response => {
	// 				getters.completedTasks.forEach(task => commit('removeTask', task))
	// 				resolve()
	// 			})
	// 			.catch(error => {
	// 				reject(error)
	// 			})
	// 	})
	// }
};

export default {
	state,
	mutations,
	getters,
	actions
}
