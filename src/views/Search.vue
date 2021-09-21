<template>
  <div class="search__container">
    <div class="search__navbar__wrapper">
      <Navbar />
      <div class="search__bar__inner__wrapper">
        <SearchBar />
      </div>
      <div class="search__icons__wrapper">
        <div class="search__icon__list">
          <i
            class="fas fa-list fa-2x search__icon"
            @click.stop.prevent="changeView('table')"
          />
        </div>
        <div class="search__icon__table">
          <i
            class="fa fa-th fa-2x search__icon"
            aria-hidden="true"
            @click.stop.prevent="changeView('card')"
          />
        </div>
      </div>
    </div>
    <div class="search__keyword__wrapper">
      <span class="search__keyword">
        Movies with keyword " {{ input }} "
      </span>
    </div>
    <div class="search__content__wrapper">
      <div
        v-for="movie in movies"
        :key="movie.imdbID"
        class="search__content"
      >
        <div class="search__content__image__container">
          <div
            class="search__content__image__wrapper"
            @click.stop.prevent="showDetail(movie.imdbID)"
          >
            <img
              :src="movie.Poster | emptyImage"
              alt=""
              class="search__content__image"
            >
          </div>
        </div>
        <div class="search__content__image__inner">
          <div class="search__content__inner__title">
            {{ movie.Title }}
          </div>
          <div class="search__content__inner__text__group">
            <div class="search__content__inner__year">
              {{ movie.Year }}
            </div>
            <div class="search__content__inner__type">
              {{ movie.Type }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <Pagination />
    <Detail />
    <Spinner v-if="isLoading" />
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import SearchBar from '../components/SearchBar.vue'
import Detail from '../components/Detail.vue'
import Pagination from '../components/Pagination.vue'
import Spinner from '../components/Spinner.vue'
import moviesAPI from './../apis/movies'
import { emptyFilter } from '../utils/mixins'
import { mapState } from 'vuex'
export default {
  name: 'Search',
  components: {
    Navbar,
    SearchBar,
    Detail,
    Pagination,
    Spinner
  },
  mixins: [emptyFilter],
  data () {
    return {
      name: 'Search'
    }
  },
  computed: {
    ...mapState(['movies', 'input', 'nowPage', 'typeValue', 'isLoading'])
  },
  watch: {
    nowPage (newValue) {
      if (newValue) {
        moviesAPI.getMoviesByPage({
          keyword: this.input,
          page: newValue,
          type: this.typeValue
        })
          .then(response => {
            this.$store.commit('getMovies', response.data.Search)
            this.$router.push({
              name: 'Search',
              query: {
                keyword: this.input,
                type: this.typeValue,
                page: this.nowPage
              }
            })
            this.$store.commit('nowIsLoading')
          })
      }
    }
  },
  methods: {
    async showDetail (id) {
      this.$store.commit('nowIsLoading')
      const { data } = await moviesAPI.getMovieDetail({ id })
      this.$store.commit('getMovieDetailed', data)
      this.$store.commit('openModal')
      this.$store.commit('nowIsLoading')
    },
    changeView (status) {
      if (status === 'table') {
        this.$store.commit('showTable')
        this.$router.push({
          name: 'Table',
          query: {
            keyword: this.input,
            type: this.typeValue,
            page: this.nowPage
          }
        })
      } else if (status === 'card') {
        this.$store.commit('closeTable')
        this.$router.push({
          name: 'Search',
          query: {
            keyword: this.input,
            type: this.typeValue,
            page: this.nowPage
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/SCSS/main.scss';
  .search {
    &__navbar__wrapper {
      @extend %box-shadow-style;
      display: flex;
      align-items: center;
      justify-content: space-around;
      margin-bottom: 20px;
    }
    &__bar__inner__wrapper {
      display: none;
    }
    &__keyword__wrapper {
      padding: 15px;
      display: flex;
      justify-content: space-between;
    }
    &__keyword {
      @include text-style (1.1rem, 500, rgb(120, 120, 120));
      font-family: 'Chakra Petch', sans-serif;
    }
    &__icons__wrapper {
      display: flex;
      width: 10%;
      grid-gap: 10px;
      margin-right: 10px;
      color: #dde2ea;
    }
    &__icon {
      &:hover {
        color: #118eee;
        cursor: pointer;
      }
    }
  }
  .search__content__wrapper {
    padding: 15px;
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    justify-content: center;
    grid-gap: 1.5rem
  }
  .search__content {
    position: relative;
    min-width: 350px;
    min-height: 500px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    box-shadow: 6px 6px 6px 6px #0000002b;
    &__image__wrapper {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    &__image {
      width: 90%;
      transition: 0.4s ease-in;
      @include border-style(1px, solid, #eeeeee, 5px);
    }
    &__image__inner {
      width: 100%;
      height: auto;
      padding: 10px 0;
      background: rgba(0, 0, 0, 0.85);
      position: absolute;
      bottom: 0;
      color: #fff;
      font-family: 'Chakra Petch', sans-serif;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      opacity: 0;
      visibility: hidden;
      transform: translateY(150%);
      transition: 0.4s ease-in;
      border-bottom-right-radius: 5px;
      border-bottom-left-radius: 5px;
    }
    &__inner__title {
      font-size: 1.2rem;
      text-align: center;
      padding: 0 10px;
    }
    &__inner__text__group {
      display: flex;
      justify-content: space-evenly;
      margin-top: 30px;
      width: 85%;
      font-size: 1.1rem;
    }
    &__image:hover {
      opacity: 0.4;
      cursor: pointer;
    }
    &__image__container:hover ~ &__image__inner {
      opacity: 1;
      visibility: visible;
      transform: translateY(0%);
    }
    &__title__wrapper {
      text-align: center;
      padding: 0 10px;
    }
    &__title {
      @include text-style (1.2rem, 600, #143156);
    }
    &__text__group {
      padding: 15px;
      display: flex;
      justify-content: space-around;
    }
    &__text__item {
      padding: 5px 0;
      @include text-style (1.1rem, 600, #143156);
    }
    &__rating, &__type {
      color: rgb(50, 191, 137);
      font-weight: 500;
    }
  }

@media screen and (min-width: 600px) {
  .search {
    &__navbar__wrapper {
      justify-content: space-between;
    }
    &__bar__inner__wrapper {
      display: block;
      width: 90%;
      max-width: 700px;
      margin: 0 auto;
    }
    &__icons__wrapper {
      font-size: 1rem;
    }
  }
}

@media screen and (min-width: 720px) {
  .search__content__wrapper {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(5, 500px);
  }
}

@media screen and (min-width: 1080px) {
  .search__content__wrapper {
    grid-template-columns: repeat(3, 300px);
    grid-template-rows: repeat(4, 500px);
  }
  .search__content {
    min-width: 300px;
  }
}
</style>
