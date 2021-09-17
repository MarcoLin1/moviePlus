<template>
  <div class="search__bar__input__wrapper">
    <form
      action=""
      class="search__bar__form"
      @submit.stop.prevent="searching"
    >
      <input
        v-model="inputText"
        type="text"
        class="search__bar__input"
        placeholder="enter movie name or keyword"
      >
      <button
        type="submit"
        class="search__bar__button"
      >
        Search
      </button>
      <select
        id=""
        name="checkbox"
        class="search__bar__type__wrapper"
      >
        <option
          value=""
          disabled
          selected
        >
          Type
        </option>
        <option value="movie">
          Movie
        </option>
        <option value="game">
          Game
        </option>
        <option value="series">
          Series
        </option>
      </select>
    </form>
  </div>
</template>

<script>
// @ is an alias to /src
import movies from './../apis/movies'
import { mapState } from 'vuex'

export default {
  name: 'SearchBar',
  components: {
  },
  data () {
    return {
      inputText: '',
      page: '',
      movies: []
    }
  },
  watch: {
    nowPage (newValue) {
      if (newValue) {
        movies.getMoviesByPage({
          keyword: this.inputText,
          page: newValue,
          type: this.typeValue
        })
          .then(response => {
            this.movies = response.data.Search
            this.$store.commit('nowIsLoading')
          })
      }
    }
  },
  computed: {
    ...mapState(['isLoading', 'nowPage', 'typeValue'])
  },
  methods: {
    async searching () {
      this.$store.commit('nowIsLoading')
      const select = document.querySelector('.search__bar__type__wrapper')
      const option = select.options[select.selectedIndex]
      const typeValue = option.value
      if (typeValue === '') {
        const { data } = await movies.getMovies({ keyword: this.inputText })
        this.movies = data.Search
        this.$store.commit('searchingResults', Number(data.totalResults))
        this.$store.commit('getMovies', this.movies)
        this.$router.push({ name: 'Search', query: { keyword: this.inputText } })
      }
      if (typeValue !== '') {
        const { data } = await movies.getMoviesByType({ keyword: this.inputText, type: typeValue })
        this.movies = data.Search
        this.$store.commit('searchingResults', Number(data.totalResults))
        this.$store.commit('getMovies', this.movies)
        this.$router.push({ name: 'Search', query: { keyword: this.inputText, type: typeValue } })
      }
      this.$store.commit('getInput', this.inputText)
      this.$store.commit('nowIsLoading')
    },
    getCurrentMovies (movies) {
      this.movies = movies
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/SCSS/main.scss';
  .search__bar {
    &__input__wrapper {
      display: flex;
    }
    &__form {
      display: flex;
      justify-content: center;
      width: 90%;
      max-width: 700px;
      margin: 0 auto;
    }
    &__input {
      width: 100%;
      min-width: 100px;
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
      margin-left: 5px;
      font-family: 'Chakra Petch', sans-serif;
      font-size: 0.8rem;
      &:hover {
        background-color: $header-text-blue;
        color: #fff;
        border-color: transparent;
      }
    }
    &__type__wrapper {
      border: none;
      background-color: #133156;
      color: #fff;
      border-radius: 5px;
      margin-left: 5px;
      padding-left: 5px;
      font-family: 'Chakra Petch', sans-serif;
      font-size: 0.8rem;
    }
  }
@media screen and (min-width: 565px) {
  .search__bar {
    &__input {
      font-size: 1rem;
    }
    &__button,  &__type__wrapper {
      margin-left: 10px;
      font-size: 1.1rem;
    }
  }
}
</style>
