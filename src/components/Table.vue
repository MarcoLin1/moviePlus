<template>
  <div
    v-if="showData"
    class="table__container"
  >
    <div class="table">
      <div class="table__header">
        <div class="table__header__item">
          Name
        </div>
        <div class="table__header__item">
          Type
        </div>
        <div class="table__header__item">
          Year
        </div>
        <div class="table__header__item">
          Content
        </div>
      </div>
      <div
        v-for="movie in searchingMovies"
        :key="movie.imdbID"
        class="table__content"
      >
        <div class="table__row">
          <div class="table__data">
            {{ movie.Title }}
          </div>
          <div class="table__data">
            {{ movie.Type }}
          </div>
          <div class="table__data">
            {{ movie.Year }}
          </div>
          <div class="table__data">
            <button
              :id="movie.imdbID"
              class="table__data__button"
              @click.stop.prevent="showDetail(movie.imdbID)"
            >
              Detail
            </button>
          </div>
        </div>
      </div>
    </div>
    <Detail />
  </div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'
import Detail from './Detail.vue'
export default {
  components: {
    Detail
  },
  props: {
    searchingMovies: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      arr: [],
      currentSort: 'name',
      currentSortDir: 'asc'
    }
  },
  computed: {
    ...mapState(['showData', 'isLoading'])
  },
  methods: {
    showDetail (id) {
      this.$store.commit('nowIsLoading')
      axios.get(`http://www.omdbapi.com/?apikey=752b08a&i=${id}&plot=full`)
        .then(response => {
          const { data } = response
          this.$store.commit('getMovieDetailed', data)
          this.$store.commit('openModal')
          this.$store.commit('nowIsLoading')
        })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/SCSS/main.scss';
  .table {
    width: 100%;
    border-radius: 5px;
    box-shadow: 6px 6px 6px #0000002b;
    &__container {
      display: flex;
      justify-content: center;
      text-align: center;
      flex-direction: column;
      width: 90%;
      max-width: 800px;
      margin: 0 auto;
    }
    &__header {
      display: flex;
      width: 100%;
      padding: 1rem 0;
      background-color: rgba(64, 144, 255, 0.783);
      font-family: 'Chakra Petch', sans-serif;
      @include text-style(1.2rem, 700, #000);
      border-top-right-radius: 5px;
      border-top-left-radius: 5px;
    }
    &__header__item {
      flex: 1 1 20%;
      text-align: center;
    }
    &__content {
      font-family: 'Chakra Petch', sans-serif;
      &:nth-child(even) {
        background-color: rgba(198, 198, 198, 0.3);
      }
      &:hover {
        background-color: $light-blue;
      }
    }
    &__row {
      display: flex;
      padding: 0.5rem 0;
    }
    &__data {
      flex: 1 1 20%;
      text-align: center;
      padding: 0.5rem;
      align-self: center;
    }
    &__data__button {
      background-color: rgba(64,143,255,.5);
      padding: 0.5rem;
      border-radius: 5px;
      font-size: 1rem;
      font-family: 'Chakra Petch', sans-serif;
      color: #fff;
      &:hover {
        background-color: rgba(64,143,255,.7);
        color: #000;
      }
    }
  }
  @media screen and (max-width: 600px) {
    .table {
      min-width: 300px;
      &__header {
        display: none;
      }
      &__row {
        display: block;
      }
      &__data {
        text-align: left;
        display: flex;
        width: 100%;
        padding: auto 10px;
        &::before {
          width: 100%;
          max-width: 35%;
          align-self: center;
          @include text-style(1.1rem, 700, #000);
        }
        &:nth-child(1)::before {
          content: 'Name';
        }
        &:nth-child(2)::before {
          content: 'Type';
        }
        &:nth-child(3)::before {
          content: 'Year';
        }
        &:nth-child(4)::before {
          content: 'Content';
        }
      }
      &__data__button {
        padding: 0 5px;
        height: 30px;
      }
    }
  }

</style>
