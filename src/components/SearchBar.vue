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
        placeholder="please enter your keyword"
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
import moviesAPI from './../apis/movies'
import { mapState } from 'vuex'

export default {
  name: 'SearchBar',
  components: {
  },
  data () {
    return {
      inputText: '',
      page: ''
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
      this.$store.commit('getType', option.value)
      if (this.typeValue === '') {
        const { data } = await moviesAPI.getMovies({
          keyword: this.inputText
        })
        this.$store.commit('searchingResults', Number(data.totalResults))
        this.$store.commit('getMovies', data.Search)
        this.$router.push({
          name: this.$parent.name || 'Table',
          query: {
            keyword: this.inputText,
            type: this.typeValue,
            page: this.nowPage
          }
        })
      }
      if (this.typeValue !== '') {
        const { data } = await moviesAPI.getMoviesByType({
          keyword: this.inputText,
          type: this.typeValue
        })
        this.$store.commit('searchingResults', Number(data.totalResults))
        this.$store.commit('getMovies', data.Search)
        this.$router.push({
          name: 'Table',
          query: {
            keyword: this.inputText,
            type: this.typeValue,
            page: this.nowPage
          }
        })
      }
      this.$store.commit('getInput', this.inputText)
      this.$store.commit('nowIsLoading')
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
      box-shadow: inset 1px 1px 3px #c5d4e3, inset 2px 2px 6px #c5d4e3;
      @include border-style (1px, solid, #eeeeee, 5px);
      transition: all 0.3s ease-in-out;
      &:focus {
        box-shadow: none;
        background: #fff;
      }
    }
    &__button, &__type__wrapper {
      @include border-style (1px, solid, #e1e1e1, 5px);
      box-shadow: -2px -2px 6px rgba(255, 255, 255, 0.60), 2px 2px 12px #c8d8e7;
      margin-left: 5px;
      font-family: 'Chakra Petch', sans-serif;
      font-size: 0.8rem;
      color: #757575;
      background-color: transparent;
    }
    &__type__wrapper {
      padding-left: 5px;
    }
    &__button:hover {
      box-shadow: inset 1px 1px 3px #c5d4e3, inset 2px 2px 6px #c5d4e3;
      border-color: transparent;
    }
    &__type__wrapper {
      &:hover, &:focus {
        box-shadow: inset 1px 1px 3px #c5d4e3, inset 2px 2px 6px #c5d4e3;
        border-color: transparent;
        cursor: pointer;
      }
    }
  }
@media screen and (min-width: 565px) {
  .search__bar {
    &__button,  &__type__wrapper {
      margin-left: 10px;
      font-size: 1.1rem;
    }
  }
}
</style>
