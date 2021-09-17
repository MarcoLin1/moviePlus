<template>
  <div class="search__container">
    <div class="search__navbar__wrapper">
      <Navbar />
      <div class="search__bar__inner__wrapper">
        <SearchBar />
      </div>
    </div>
    <div class="search__keyword__wrapper">
      <span class="search__keyword">
        Movies with keyword "{{ input }} "
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
              :src="movie.Poster"
              alt=""
              class="search__content__image"
            >
          </div>
        </div>
        <div class="search__content__title__wrapper">
          <div class="search__content__title">
            {{ movie.Title }}
          </div>
        </div>
        <div class="search__content__text__group">
          <div class="search__content__text__item">
            Year:
            <span class="search__content__rating">{{ movie.Year }}</span>
          </div>
          <div class="search__content__text__item">
            Type:
            <span class="search__content__type">{{ movie.Type }}</span>
          </div>
        </div>
      </div>
    </div>
    <Detail />
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import SearchBar from '../components/SearchBar.vue'
import Detail from '../components/Detail.vue'
import movies from './../apis/movies'
import { mapState } from 'vuex'
export default {
  components: {
    Navbar,
    SearchBar,
    Detail
  },
  computed: {
    ...mapState(['movies', 'input'])
  },
  methods: {
    async showDetail (id) {
      const { data } = await movies.getMovieDetail({ id })
      console.log(data)
      this.$store.commit('getMovieDetailed', data)
      this.$store.commit('nowIsLoading')
      this.$store.commit('openModal')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/SCSS/main.scss';
  .search {
    &__container {
      background-color: #dde3e3;
    }
    &__navbar__wrapper {
      @extend %box-shadow-style;
      display: flex;
      align-items: center;
      padding-bottom: 10px;
    }
    &__bar__inner__wrapper {
      width: 40%;
    }
    &__keyword__wrapper {
      padding: 15px;
    }
    &__keyword {
      @include text-style (1.1rem, 500, rgb(120, 120, 120));
      font-family: 'Chakra Petch', sans-serif;
    }
  }
  .search__content__wrapper {
    padding: 15px;
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    justify-content: center;
    grid-gap: 1rem
  }
  .search__content {
    box-shadow: 6px 6px 6px 7px #0000002b;
    min-width: 300px;
    max-width: 500px;
    &__image__wrapper {
      display: flex;
      justify-content: center;
      padding: 10px 0px;
    }
    &__image {
      width: fit-content;
      height: fit-content;
      transition: 0.4s ease-in;
      border-radius: 5px;
      padding: 15px 0;
      &:hover {
        transform: scale(103%);
        cursor: pointer;
      }
    }
    &__title__wrapper {
      text-align: center;
    }
    &__title {
      @include text-style (1.3rem, 600, #143156);
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

@media screen and (min-width: 650px) {
  .search__content__wrapper {
    grid-template-columns: repeat(2, 1fr);
  }
  .search__content__image {
    width: 85%;
    height: 80%;
    max-width: 350px;
    max-height: 500px;
  }
}

@media screen and (min-width: 960px) {
  .search__content__wrapper {
    grid-template-columns: repeat(3, minmax(300px, 450px));

  }
}
</style>
