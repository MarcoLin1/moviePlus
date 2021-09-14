<template>
  <div
    v-if="showData"
    class="table__container"
  >
    <div class="table">
      <div class="table__header">
        <div
          class="table__header__item"
        >
          <div class="header__name">
            Name
          </div>
          <div class="header__icon__group">
            <i
              class="fas fa-sort-up header__icon__up"
              @click="sorting('Title', 'up')"
            />
            <i
              class="fas fa-sort-down header__icon__down"
              @click="sorting('Title', 'down')"
            />
          </div>
        </div>
        <div
          class="table__header__item"
        >
          <div class="header__type">
            Type
          </div>
          <div class="header__icon__group">
            <i
              class="fas fa-sort-up header__icon__up"
              @click="sorting('Type', 'up')"
            />
            <i
              class="fas fa-sort-down header__icon__down"
              @click="sorting('Type', 'dowm')"
            />
          </div>
        </div>
        <div
          class="table__header__item"
        >
          <div class="header__year">
            Year
          </div>
          <div class="header__icon__group">
            <i
              class="fas fa-sort-up header__icon__up"
              @click="sorting('Year', 'up')"
            />
            <i
              class="fas fa-sort-down header__icon__down"
              @click="sorting('Year', 'down')"
            />
          </div>
        </div>
        <div class="table__header__item">
          Content
        </div>
      </div>
      <div
        v-for="movie in sortedMovie"
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
      searchingResults: [],
      currentSort: 'Year',
      currentSortDir: 'desc',
      sortStatus: 'down'
    }
  },
  computed: {
    ...mapState(['showData', 'isLoading']),
    sortedMovie: function () {
      const copyArr = this.searchingResults.slice(0, 10)
      // asc排序
      if (this.currentSortDir === 'asc' && this.sortStatus === 'up') {
        return copyArr.sort((a, b) => {
          // number排序
          if (this.currentSort === 'Year') {
            return Number(a[this.currentSort]) - Number(b[this.currentSort])
          } else {
          // string排序
            if (a[this.currentSort] < b[this.currentSort]) {
              return -1
            }
          }
        })
      // desc排序
      } else if (this.currentSortDir === 'desc' && this.sortStatus === 'down') {
        return copyArr.sort((a, b) => {
          // number排序
          if (this.currentSort === 'Year') {
            return Number(b[this.currentSort]) - Number(a[this.currentSort])
          } else {
            // string排序
            if (a[this.currentSort] > b[this.currentSort]) {
              return -1
            }
          }
        })
      } else {
        return 0
      }
    }
  },
  watch: {
    searchingMovies (newValue) {
      this.searchingResults = [
        ...newValue
      ]
    }
  },
  methods: {
    showDetail (id) {
      this.$store.commit('nowIsLoading')
      axios.get(`https://www.omdbapi.com/?apikey=752b08a&i=${id}&plot=full`)
        .then(response => {
          const { data } = response
          this.$store.commit('getMovieDetailed', data)
          this.$store.commit('nowIsLoading')
          this.$store.commit('openModal')
        })
    },
    sorting (sort, status) {
      this.currentSort = sort
      if (status === 'down') {
        this.sortStatus = status
        this.currentSortDir = 'desc'
      } else if (status === 'up') {
        this.sortStatus = status
        this.currentSortDir = 'asc'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/SCSS/main.scss';
  .table {
    width: 100%;
    border-radius: 5px;
    @extend %box-shadow-style;
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
      background-color: #143156;
      font-family: 'Chakra Petch', sans-serif;
      @include text-style(1.2rem, 700, #fff);
      border-top-right-radius: 5px;
      border-top-left-radius: 5px;
    }
    &__header__item {
      flex: 1 1 20%;
      text-align: center;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
    }
    &__content {
      font-family: 'Chakra Petch', sans-serif;
      &:nth-child(even) {
        background-color: rgba(198, 198, 198, 0.3);
      }
      &:hover {
        background-color: #cccccc9c;
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
      background-color: #143156;
      padding: 0.5rem;
      border-radius: 5px;
      @include text-style(1rem, 400, #fff);
      font-family: 'Chakra Petch', sans-serif;
      &:hover {
        background-color: #1431565b;
        color: #000;
      }
    }
  }
  .header {
    &__icon__up, &__icon__down {
      cursor: pointer;
      font-size: 2rem;
      position: relative;
      &:hover {
        color: $light-green;
      }
    }
    &__icon__up {
      top: 7px;
    }
    &__icon__down {
      bottom: 7px;
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
