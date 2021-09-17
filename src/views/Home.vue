<template>
  <div class="home__container">
    <Navbar />
    <div class="searching__wrapper">
      <SearchBar />
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
import Navbar from '@/components/Navbar.vue'
import SearchBar from '@/components/SearchBar.vue'
// import movies from './../apis/movies'
import { mapState } from 'vuex'

export default {
  name: 'Home',
  components: {
    Table,
    Pagination,
    Spinner,
    Navbar,
    SearchBar
  },
  data () {
    return {
      inputText: '',
      page: '',
      movies: []
    }
  },
  // watch: {
  //   nowPage (newValue) {
  //     if (newValue) {
  //       movies.getMoviesByPage({
  //         keyword: this.inputText,
  //         page: newValue,
  //         type: this.typeValue
  //       })
  //         .then(response => {
  //           this.movies = response.data.Search
  //           this.$store.commit('nowIsLoading')
  //         })
  //     }
  //   }
  // },
  computed: {
    ...mapState(['isLoading', 'nowPage', 'typeValue'])
  },
  methods: {
    getCurrentMovies (movies) {
      this.movies = movies
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/SCSS/main.scss';
  .home {
    &__container {
      background: url('../assets/hollywood.jpg');
      background-size: cover;
      background-position: center;
      width: 100%;
      height: 100%;
      min-height: 100vh;
    }
  }
  .searching {
    &__wrapper {
      padding-top: 120px;
    }
  }
</style>
