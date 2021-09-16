<template>
  <div
    v-if="showData"
    class="pagination__container"
  >
    <ul class="pagination__wrapper">
      <div class="pagination__pre__group">
        <li class="pagination__pre">
          <a
            href=""
            @click.stop.prevent="minusPageNum(currentPage - 10)"
          >&lt;&lt;</a>
        </li>
        <li class="pagination__pre">
          <a
            href=""
            @click.stop.prevent="updatePage(currentPage - 1)"
          >&lt;</a>
        </li>
      </div>
      <li class="pagination__numbers">
        <a
          v-for="index in pages"
          :key="index"
          href=""
          class="pagination__number"
          @click.stop.prevent="updatePage(index)"
        >{{ index }}</a>
      </li>
      <div class="pagination__next__group">
        <li class="pagination__next pagination__next__update">
          <a
            href=""
            @click.stop.prevent="updatePage(currentPage + 1)"
          >&gt;</a>
        </li>
        <li class="pagination__next">
          <a
            href=""
            @click.stop.prevent="addPageNum(currentPage + 10)"
          >&gt;&gt;</a>
        </li>
      </div>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import movies from './../apis/movies'
export default {
  data () {
    return {
      currentPage: 1
    }
  },
  computed: {
    ...mapState(['totalMovies', 'input', 'showData']),
    endPage () {
      if (this.totalMovies > 10 && this.currentPage > 10 && this.currentPage < this.totalMovies) {
        if ((this.currentPage + 10) > this.totalMovies) {
          return this.totalMovies
        }
        return this.currentPage + 9
      } else if (this.totalMovies < 10) {
        return this.totalMovies
      }
      return 10
    },
    pages () {
      const range = []
      // 總筆數少於10筆
      if ((this.endPage - this.currentPage) <= 10 && this.currentPage <= 10 && this.totalMovies <= 10) {
        for (let i = 1; i <= this.totalMovies; i++) {
          range.push(i)
        }
      // 總筆數超過10筆，第一頁
      } else if ((this.endPage - this.currentPage) <= 10 && this.currentPage <= 10) {
        for (let i = 1; i <= 10; i++) {
          range.push(i)
        }
      // 最後一頁
      } else if ((this.totalMovies - this.currentPage) < 10) {
        for (let i = this.totalMovies - 9; i <= this.totalMovies; i++) {
          range.push(i)
        }
      // 其他換頁
      } else if ((this.endPage - this.currentPage) <= 10 && this.currentPage > 10) {
        for (let i = this.currentPage; i <= this.endPage; i++) {
          range.push(i)
        }
      }
      return range
    }
  },
  methods: {
    async updatePage (pageNum) {
      this.$store.commit('nowIsLoading')
      this.currentPage = pageNum
      this.changePageStyle()
      const { data } = await movies.getMoviesByPage({ keyword: this.input, page: pageNum })
      this.$emit('current-page-movies', data.Search)
      this.$store.commit('nowIsLoading')
    },
    addPageNum (pageNum) {
      if (this.endPage < this.currentPage) {
        return
      }
      this.currentPage = pageNum
    },
    minusPageNum (pageNum) {
      if (this.currentPage <= 10) {
        return
      }
      this.currentPage = pageNum
    },
    changePageStyle () {
      const allPageNum = document.querySelectorAll('.pagination__number')
      const activePage = document.querySelectorAll('.active')
      allPageNum.forEach(page => {
        if (Number(page.textContent) === this.currentPage) {
          page.classList.add('active')
        }
      })
      activePage.forEach(page => {
        if (Number(page.textContent) !== this.currentPage) {
          page.classList.remove('active')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/SCSS/main.scss';
  .pagination {
    &__container {
      width: 90%;
      max-width: 800px;
      text-align: center;
      margin: 40px auto;
      border-radius: 10px;
    }
    &__wrapper {
      display: flex;
      justify-content: space-between;
      height: 50px;
      border-radius: 10px;
      font-family: 'Chakra Petch', sans-serif;
    }
    &__pre, &__next {
      display: block;
      line-height: 50px;
      padding: 0 10px;
      width: 10%;
      height: 52px;
      @extend %box-shadow-style;
      & a {
        font-size: 1.5rem;
        font-weight: bold;
        display: block;
      }
      &:hover {
        background-color: $light-green;
        border: none;
        box-shadow: none;
      }
      &:hover a {
        color: #fff;
      }
    }
    &__pre__group {
      display: flex;
    }
    &__pre {
      border-top-left-radius: 10px;
      border-bottom-left-radius: 10px;
      margin-right: 5px;
      width: 50px;
    }
    &__next__group {
      display: flex;
    }
    &__next {
      border-top-right-radius: 10px;
      border-bottom-right-radius: 10px;
      margin-left: 5px;
      width: 50px;
    }
    &__next__update {
      width: 50px;
    }
    &__numbers {
      width: 100%;
      display: flex;
      grid-gap: 5px;
      line-height: 50px;
      a {
        width: 100%;
        &:hover {
          background-color: $light-green;
          color: #fff;
        }
      }
    }
    &__number {
      @extend %box-shadow-style;
      &:hover {
        box-shadow: none;
        margin: 0 5px;
      }
    }
  }
  .active {
    background-color: $light-green;
    color: #fff;
    box-shadow: none;
    margin: 0 5px;
  }
  @media screen and (max-width: 550px) {
    .pagination {
      &__wrapper {
        display: block;
        min-width: 270px;
      }
      &__pre {
        min-width: 50px;
        margin-bottom: 10px;
      }
      &__next__group {
        justify-content: flex-end;
      }
      &__next {
        min-width: 50px;
        margin: 10px 0 10px 0;
      }
      &__next__update {
        margin-right: 5px;
      }
      &__numbers {
        min-width: 300px;
      }
    }
  }
</style>
