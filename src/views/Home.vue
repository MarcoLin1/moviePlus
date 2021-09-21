<template>
  <div class="home__container">
    <div class="navbar__wrapper">
      <Navbar />
    </div>
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
    ...mapState(['isLoading'])
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
      background: #dde2ea;
      width: 100%;
      height: 100%;
      min-height: 100vh;
    }
  }
  .navbar {
    &__wrapper {
      display: flex;
      justify-content: center;
      position: relative;
      top: 100px;
    }
  }
  .searching {
    &__wrapper {
      padding-top: 120px;
    }
  }
</style>
