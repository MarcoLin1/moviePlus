<template>
  <div class="home__container">
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
          placeholder="please enter your keyword"
        >
        <button
          type="submit"
          class="home__button"
        >
          Search
        </button>
      </form>
      <div class="home__checkbox__wrapper">
        <div class="home__checkbox__item">
          <input
            id="home__checkbox__movie"
            type="radio"
            name="home__checkbox"
            class="home__checkbox"
            value="movie"
          >
          <label
            for="home__checkbox__movie"
            class="home__label"
          >
            Movie
            <span class="home__inline__checkbox" />
          </label>
        </div>
        <div class="home__checkbox__item">
          <input
            id="home__checkbox__game"
            type="radio"
            name="home__checkbox"
            class="home__checkbox"
            value="game"
          >
          <label
            for="home__checkbox__game"
            class="home__label"
          >
            Game
            <span class="home__inline__checkbox" />
          </label>
        </div>
        <div class="home__checkbox__item">
          <input
            id="home__checkbox__series"
            type="radio"
            name="home__checkbox"
            class="home__checkbox"
            value="series"
          >
          <label
            for="home__checkbox__series"
            class="home__label"
          >
            Series
            <span class="home__inline__checkbox" />
          </label>
        </div>
      </div>
    </div>
    <Spinner v-if="isLoading" />
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
import Spinner from '@/components/Spinner.vue'
import { apiHelper } from '../utils/helper'
import { mapState } from 'vuex'

export default {
  name: 'Home',
  components: {
    Table,
    Pagination,
    Spinner
  },
  data () {
    return {
      inputText: '',
      page: '',
      movies: []
    }
  },
  computed: {
    ...mapState(['isLoading'])
  },
  methods: {
    async searching () {
      this.$store.commit('nowIsLoading')
      const checkboxs = document.querySelectorAll('.home__checkbox')
      let typeValue = ''
      checkboxs.forEach(checkbox => {
        if (checkbox.checked) {
          typeValue = checkbox.value
        }
      })
      if (typeValue === '') {
        const { data } = await apiHelper.get(`${this.inputText}`)
        this.movies = data.Search
        this.$store.commit('searchingResults', Number(data.totalResults))
      }
      if (typeValue !== '') {
        const { data } = await apiHelper.get(`${this.inputText}&type=${typeValue}`)
        this.movies = data.Search
        this.$store.commit('searchingResults', Number(data.totalResults))
      }
      this.$store.commit('getInput', this.inputText)
      this.$store.commit('nowIsLoading')
      this.inputText = ''
    },
    getCurrentMovies (movies) {
      this.movies = movies
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/SCSS/main.scss';
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
      height: 40px;
      padding-left: 10px;
      letter-spacing: 0.5px;
      font-family: 'Chakra Petch', sans-serif;
      @extend %box-shadow-style;
      @include border-style (1px, solid, #eeeeee, 5px);
      &:focus {
        border: 1px solid #133156;
        box-shadow: none;
      }
    }
    &__button {
      color: #fff;
      background-color: #133156;
      @include border-style (1px, solid, #133156, 5px);
      margin-left: 15px;
      font-family: 'Chakra Petch', sans-serif;
      font-size: 1.1rem;
      &:hover {
        background-color: $header-text-blue;
        color: #fff;
        border-color: transparent;
      }
    }
    &__checkbox__wrapper {
      width: 90%;
      max-width: 400px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 20px;
    }
    &__checlbox__item {
      position: relative;
    }
    &__label {
      @include text-style (1rem, 500, #133156);
      font-family: 'Chakra Petch', sans-serif;
      cursor: pointer;
      &:hover {
        color: $header-text-blue;
      }
    }
    &__checkbox {
      display: none;
    }
    &__inline__checkbox {
      @include checkbox-style (18px, 18px, 50%, relative, inline-block);
      border: 1px solid #133156;
      top: 4px;
      &::after {
        content: '';
        @include checkbox-style (12px, 12px, 50%, relative, block);
        background-color: #133156;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        opacity: 0;
        transition: 0.6s ease-in;
      }
    }
    &__checkbox:checked ~ &__label {
      color: $header-text-blue;
    }
    &__checkbox:checked ~ &__label &__inline__checkbox::after {
      opacity: 1;
    }
  }
</style>
