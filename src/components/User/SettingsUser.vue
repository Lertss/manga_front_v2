<template>
  <div>
    <button type="button" class="btn btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#exampleModal">
      <i class="bi bi-gear"></i>
    </button>
  </div>


  <!-- Modal -->
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">

          <form @submit.prevent="updateGender" class="m-3">
            <div class="mb-3">
              <label for="genderSelect" class="form-label">Gender</label>
              <select class="form-select" id="genderSelect" v-model="selectedGender">
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Not Specified">Not Specified</option>
              </select>
            </div>
            <button type="submit" class="btn btn-warning float-end">Submit</button>
          </form>

          <form @submit.prevent="updateAdult" class="m-3 mt-5">
            <div class="form-check">
              <input class="form-check-input" type="checkbox" v-model="selectedAdult" id="flexCheckDefault">
              <label class="form-check-label" for="flexCheckDefault">
                Are you of legal age?
              </label>
            </div>
            <button type="submit" class="btn btn-warning float-end">Submit</button>
          </form>

          <div class="m-3 mt-5">
            <label for="avatar" class="form-label">Avatar</label>
            <input class="form-control" id="avatar" required type="file" accept="image/*" @change="onFileChange" />
            <button class="btn btn-warning m-3 float-end" @click="updateAvatar">Update Avatar</button>
          </div>


        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import axios from 'axios';
import {VueCookieNext} from "vue-cookie-next";
import api from "@/components/kt/inter";

export default {
  data() {
    return {
      selectedGender: "Not Specified",
      selectedAdult: false,
      selectedAvatar: null,
    };
  },
  methods: {
    async updateGender() {
      try {

        const accessToken = VueCookieNext.getCookie('accessToken');
        const headers = {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data', // Важливо вказати тип даних
        };
        const response = await axios.put('/auth/user/update/gender/', { 'gender': this.selectedGender },
            { headers });

        console.log("Success", response.data)
        // handle successful form submission
        // e.g. show a success message to the user
      } catch (error) {
        console.log(error)
        // e.g. show an error message to the user
      }
    },
    async updateAdult() {
      try {

        const accessToken = VueCookieNext.getCookie('accessToken');
        const headers = {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data', // Важливо вказати тип даних
        };
        const response = await axios.put('/auth/user/update/adult/', { 'adult': this.selectedAdult },
            { headers });

        console.log("Success", response.data)
        // handle successful form submission
        // e.g. show a success message to the user
      } catch (error) {
        console.log(error)
        // e.g. show an error message to the user
      }
    },
    async updateAvatar(){

      try {

        const accessToken = VueCookieNext.getCookie('accessToken');
        const headers = {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data', // Важливо вказати тип даних
        };
        const response = await api.patch(`/auth/user/update/avatar/`, {'avatar':this.selectedAvatar }, { headers });
        console.log("Server response:", response.data);
      }
      catch (error){
        console.log("Error", error)
      }
    },
    onFileChange(e) {
      this.selectedAvatar = e.target.files[0];
    },
  },
};
</script>
