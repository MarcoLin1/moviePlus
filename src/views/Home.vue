<template>
  <div class="home__container">
    <Navbar />
    <div class="searching__wrapper">
      <SearchBar />
    </div>
    <Spinner v-if="isLoading" />
  </div>
</template>

<script>
// @ is an alias to /src
import Spinner from '@/components/Spinner.vue'
import Navbar from '@/components/Navbar.vue'
import SearchBar from '@/components/SearchBar.vue'
import { mapState } from 'vuex'

export default {
  name: 'Home',
  components: {
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
