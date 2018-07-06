<template>
	<div>
		<div class="row">
			<div class="col-lg-6">
				<div class="comments">
					<div class="head">
						<div @click="open = !open" class="arrow">
							<img src="../../assets/arrow.svg" alt="pic">
						</div>
						<div class="text">
							<div class="title">Comments</div>
							<div class="description">Why do you love this Vizy?</div>
						</div>
					</div>
					<div class="body" :class="open ? 'open' : 'close'">
						<div class="info">
							<div class="stars col">
								<img src="../../assets/star.svg" alt="pic">
								<span>120 Stars</span>
							</div>
							<div class="count col">
								<img src="../../assets/add-comment-512.png" alt="pic">
								<span>{{ allComments.length}} Comments</span>
							</div>
						</div>
						<div class="content">
							<ul>
								<li v-for="comment in allComments">
									<img src="../../assets/user_avatar.jpeg" alt="avatar">
									<div class="deteil">
										<div class="name">Jemes Anderson</div>
										<div class="date">{{ comment.updated_at }}</div>
									</div>
									<div class="comment">
										{{comment.comment}}
										<a @click.prevent="_editComment(comment)" href="#">Edit</a>
										<a class="del" @click.prevent="_delComment(comment.id)"href="#">Del</a>
									</div>
								</li>
							</ul>
						</div>
						<form class="form" @submit.prevent="_sendForm()">
							<input type="text" v-model="newComment.comment" ref="btn" required placeholder="Add a comments...">
							<input type="submit" :value="edit.status ? 'Save' : 'Post'">
						</form>
					</div>
				</div>
			</div>

			<div class="col-lg-6">
				<p>Log</p>
				<ul>
					<li v-for="comment in allComments">
						<span>Id: {{comment}} -</span>
						<span>{{comment.comment}}</span>
					</li>
				</ul>
			</div>

		</div>
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
				open: true
			}
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
				this.setFocus();
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
			},
			setFocus() {
				this.$refs.btn.focus();
			},
		}
	}
</script>
