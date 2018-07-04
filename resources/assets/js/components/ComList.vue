<template>
	<div>
		<ul>
			<li v-for="comment in allComments">
				<span>Id: {{comment.id}} -</span>
				<span>{{comment.comment}}</span>
			</li>
		</ul>
		<form @submit.prevent="_addComment()">
			<input type="text" v-model="newComment.comment">
			<input type="submit" value="Add">
		</form>
	</div>
</template>

<script>
	import {mapActions, mapGetters} from 'vuex';
	export default {
		name: "ComList",
		data() {
			return {
				newComment: {
					users_id: 1,
					reply_id: 1,
					votes: 1,
				}
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
				'addComment'
			]),
			initComments() {
				this.fetchComments();
			},
			_addComment() {
				this.addComment(this.newComment);
				console.log('click');
			},
		}
	}
</script>

<style lang="scss">
    .comments {
        .head {
            background-color: #000;
        }
    }
</style>
