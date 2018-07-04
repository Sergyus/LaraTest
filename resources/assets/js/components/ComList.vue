<template>
    <div>

        <div class="comments">
            <div class="head">
                <div class="arrow"><</div>

                <div class="title"></div>
            </div>
            <div class="info">
                <div class="votes">★ 120 Stars</div>
                <div class="count">5151 Comments</div>
            </div>
        </div>


        <ul>
            <li v-for="comment in comments">
                <!--<div>{{comment}}</div>-->
                <div>{{comment.comment}}</div>
            </li>
        </ul>
        <form @submit.prevent="send()" method="POST">
            <input type="text" v-model="newcomments.text">
            <input type="submit" value="Add">
        </form>
    </div>
</template>

<script>
    export default {
        name: "ComList",
        data() {
            return {
                comments: [],
                newcomments: {
                    text: ''
                }
            }
        },
        mounted() {
            var app = this;
            axios.get('/api/v1/comments')
                .then(function (resp) {
                    app.comments = resp.data;
                })
                .catch(function (resp) {
                    console.log(resp);
                    alert("Could not load comments");
                });
        },
        methods: {
            send() {
                let app = this;

                //https://stackoverflow.com/questions/49328956/file-upload-with-vue-and-laravel

                let Data = new FormData();
                Data.append("comment", 'Mes');
                Data.append('_method', 'PATCH');

                //console.log(app.comments);
                axios.post('/api/v1/comments', Data)
                    .then((resp) => {
                        console.log(resp);
                    })
                    .catch(function (resp) {
                        alert(resp);
                    });
            }
        }
        // methods: {
        //     deleteEntry(id, index) {
        //         if (confirm("Do you really want to delete it?")) {
        //             var app = this;
        //             axios.delete('/api/v1/companies/' + id)
        //                 .then(function (resp) {
        //                     app.companies.splice(index, 1);
        //                 })
        //                 .catch(function (resp) {
        //                     alert("Could not delete company");
        //                 });
        //         }
        //     }
        // }
    }
</script>

<style lang="scss">
    .comments {
        .head {
            background-color: #000;
        }
    }
</style>
