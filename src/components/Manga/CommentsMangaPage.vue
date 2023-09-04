<template>
  <div style="margin: 5%">
  <div>
    <h1>Comments</h1>
    <div class="form-floating">
      <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea" v-model="comment"></textarea>
      <label for="floatingTextarea">Comments</label>
    </div>
    <button @click="postComment">Post Comment</button>
  </div>
  <div>
    <div class="rounded" v-for="(comm, index) in commentsManga" :key="index">
      <div style="text-align: right;">

        <!-- Button trigger modal -->
        <button type="button" class="btn transparent-button" :data-bs-target="'#updateModal-' + comm.id" data-bs-toggle="modal">
          <i class="bi bi-pencil"/>
        </button>


        <!-- Modal -->
        <div class="modal fade" :id="'updateModal-' + comm.id" tabindex="-1" :aria-labelledby="'updateModalLabel-' + comm.id" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" :id="'updateModalLabel-' + comm.id">Modal title</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <p>{{comm.id}}</p>

                <form class="form-floating">
                  <input type="text" class="form-control" id="floatingInputValue" v-model="comm.content">
                  <label for="floatingInputValue">Comment</label>
                </form>

              </div>
              <div class="modal-footer">
                <button @click="deleteComment(comm.id)" type="button" class="btn btn-danger" data-bs-dismiss="modal"><i class="bi bi-trash3"></i> Delete</button>
                <button type="button" class="btn btn-primary">Save changes</button>
                <button @click="updateComment(comm.id, comm.content)">Update Description</button>

              </div>
            </div>
          </div>
        </div>
      </div>





      <div style="display: flex; align-items: flex-start;">
        <div>
          <div>
          <router-link to="/account/{{comm.user.slug}}">
            <h4 class="text-dark figure-caption " style=" font-weight: bold; margin-top: 10px;">{{comm.user.username}}</h4>
          </router-link>
            <p>
              <em class="text-dark figure-caption" style="margin: 15px ">
                 {{ comm.content }}
              </em>
            </p>
        </div>
      </div>
    </div>
  </div>
</div>
  </div>
</template>

<script>
import api from "@/components/kt/inter";
import { VueCookieNext } from "vue-cookie-next";

import Component1 from "@/components/Manga/RewiewMangaPage.vue";

export default {
  name: 'CommentsMangaPage',
  components: {
    Component1,
  },
  data() {
    return {
      CommID: null,
      comment: '',
      commentUpdate:'',
      commentsManga:[],
    }
  },
  methods: {
      async getComent() {
        const mangaSlug = this.$route.params.slug;
        try {
          const response = await api.get(`/commn/mangas/${mangaSlug}/comments/`)
          this.commentsManga = response.data
          console.log("ComentsManga",this.commentsManga)
        } catch (error) {
          console.log(error)
        }
      },
      async postComment() {
        try {
          const accessToken = VueCookieNext.getCookie('accessToken');
          const headers = {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'  // Corrected content type
          };

          const mangaSlug = this.$route.params.slug;

          const response = await api.post(
              `/api/v1/manga/${mangaSlug}/add_comment_to_manga/`,
              {
                content: this.comment  // Use the actual comment from data
              },
              {headers}
          );
              this.getComent()

          console.log("Server response:", response.data);
        } catch (error) {
          console.log("Error", error);
        }
      },

    async updateComment(commID, commentUpdate) {
      try {
        const accessToken = VueCookieNext.getCookie('accessToken');
        const headers = {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'  // Corrected content type
        };

        console.log("roma", commentUpdate,commID)

        const response = await api.put(
            `/commn/comments/${commID}/`,
            {
              content: commentUpdate  // Use the actual comment from data
            },
            {headers}
        );
        this.getComent()

        console.log("Server response:", response.data);
      } catch (error) {
        console.log("Error", error);
      }
    },
    async deleteComment(commID, commentUpdate) {
      try {
        const accessToken = VueCookieNext.getCookie('accessToken');
        const headers = {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'  // Corrected content type
        };

        console.log("roma", commentUpdate,commID)

        const response = await api.delete(
            `/commn/comments/${commID}/`,
            {headers}
        );
        this.getComent()

        console.log("Server response:", response.data);
      } catch (error) {
        console.log("Error", error);
      }
    },



    },

  created() {
    this.getComent()
  }
}
</script>

<style>

.transparent-button {
  background-color: transparent;
  border-color: transparent;
}

</style>