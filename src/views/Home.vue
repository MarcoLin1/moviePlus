<template>
  <div class="home__container">
    <Detail />
    <div class="home__input__wrapper">
      <form
        action=""
        class="home__form"
        @submit.stop.prevent="searching"
      >
        <input
          v-model="inputText"
          type="text"
          class="home__input"
        >
        <button
          type="submit"
          class="home__button"
        >
          Search
        </button>
      </form>
    </div>
    <Table
      :searching-movies="movies"
    />

    <Pagination
      @current-page-movies="getCurrentMovies"
    />
  </div>
</template>

<script>
// @ is an alias to /src
import Table from '@/components/Table.vue'
import Pagination from '@/components/Pagination.vue'
import Detail from '@/components/Detail.vue'
import { apiHelper } from '../utils/helper'

export default {
  name: 'Home',
  components: {
    Table,
    Pagination,
    Detail
  },
  data () {
    return {
      inputText: '',
      page: '',
      movies: []
    }
  },
  methods: {
    async searching () {
      const { data } = await apiHelper.get(`${this.inputText}`)
      this.movies = data.Search
      this.$store.commit('searchingResults', Number(data.totalResults))
      this.$store.commit('getInput', this.inputText)
      this.inputText = ''
    },
    getCurrentMovies (movies) {
      this.movies = movies
    }
  }
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Chakra+Petch:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap');
  .home {
    &__input__wrapper {
      margin: 2rem 0;
    }
    &__form {
      display: flex;
      justify-content: center;
      width: 90%;
      max-width: 400px;
      margin: 0 auto;
    }
    &__input {
      width: 100%;
      box-shadow: 6px 6px 5px 2px #00000038;
      padding-left: 10px;
      height: 40px;
      border-radius: 5px;
      border: 1px solid #eeeeee;
      letter-spacing: 0.5px;
      font-family: 'Chakra Petch', sans-serif;
      &:focus {
        border: 1px solid #aecfff;
        box-shadow: none;
      }
    }
    &__button {
      color: #118eee;
      border: 1px solid #aecfff;
      border-radius: 5px;
      margin-left: 15px;
      font-family: 'Chakra Petch', sans-serif;
      font-size: 1.1rem;
      &:hover {
        background-color: #118eee;
        color: #fff;
        border-color: transparent;
      }
    }
  }
</style>
