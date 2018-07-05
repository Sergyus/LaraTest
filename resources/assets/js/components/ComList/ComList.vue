<template>
	<div>

		<div class="comments">
			<div class="head">
				<div class="arrow">
					<div class="el">></div>
				</div>
				<div class="text">
					<div class="title">
						Comments
					</div>
					<div class="description">
						Why do you love this Vizy?
					</div>
				</div>
			</div>
		</div>


		<ul>
			<li v-for="comment in allComments">
				<span>Id: {{comment.id}} -</span>
				<span>{{comment.comment}}</span>
				<button @click="_delComment(comment.id)">DEL</button>
				<button @click="_editComment(comment)">EDIT</button>
			</li>
		</ul>
		<form @submit.prevent="_sendForm()">
			<input type="text" v-model="newComment.comment" required>
			<input type="submit" value="Add Comment">
		</form>
	</div>
</template>

<script>
	import {mapActions, mapGetters} from 'vuex';
	import './ComList.scss'
	export default {
		name: "ComList",
		data() {
			return {
				newComment: {
					comment: '',
					users_id: 1,
					reply_id: 1,
					votes: 1,
				},
				edit: {
					status: false,
					id: null
				},
			}
		},
		mounted() {

		},
		computed: {
			...mapGetters([
				'allComments',
			]),
		},
		created() {
			this.initComments()
		},
		methods: {
			...mapActions([
				'fetchComments',
				'addComment',
				'updateComment',
				'removeComment'
			]),
			_sendForm() {
				if(this.edit.status) {
					return this._saveComment()
				}
				return this._addComment()
			},
			initComments() {
				this.fetchComments();
			},
			_addComment() {
				this.addComment(this.newComment)
					.then(() => {
						this.newComment.comment = ''
					});
			},
			_delComment(id) {
				this.removeComment(id);
			},
			_editComment(comment) {
				this.edit.status = true;
				this.edit.id = comment.id;
				this.newComment.comment = comment.comment;
			},
			_saveComment() {
				this.updateComment({
					data: {...this.newComment},
					id: this.edit.id,
				})
					.then(() => {
						this.edit.status = false;
						this.edit.id = null;
						this.newComment.comment = ''
					});
			}
		}
	}
</script>
