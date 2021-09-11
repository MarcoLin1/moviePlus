<template>
  <div class="pagination__container">
    <ul class="pagination__wrapper">
      <li class="pagination__pre">
        <a
          href=""
          @click.stop.prevent="minusPageNum(currentPage - 10)"
        >&lt;</a>
      </li>
      <li class="pagination__numbers">
        <a
          v-for="index in pages"
          :key="index"
          href=""
          class="pagination__number"
          @click.stop.prevent="updatePage(index)"
        >{{ index }}</a>
      </li>
      <li class="pagination__next">
        <a
          href=""
          @click.stop.prevent="addPageNum(currentPage + 10)"
        >&gt;</a>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { apiHelper } from '../utils/helper'
export default {
  data () {
    return {
      currentPage: 1
    }
  },
  computed: {
    ...mapState(['totalMovies', 'input']),
    endPage () {
      if (this.totalMovies > 10 && this.currentPage > 10 && this.currentPage < this.totalMovies) {
        if ((this.currentPage + 9) > this.totalMovies) {
          return this.totalMovies
        }
        return this.currentPage + 9
      }
      return 10
    },
    pages () {
      const range = []
      if ((this.endPage - this.currentPage) <= 10 && this.currentPage <= 10) {
        for (let i = 1; i <= 10; i++) {
          range.push(i)
        }
      } else if ((this.totalMovies - this.currentPage) <= 10) {
        for (let i = this.totalMovies - 10; i <= this.totalMovies; i++) {
          range.push(i)
        }
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
      this.currentPage = pageNum
      this.changePageStyle()
      const { data } = await apiHelper.get(`${this.input}&page=${pageNum}`)
      this.$emit('current-page-movies', data.Search)
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
  .pagination {
    &__container {
      width: 90%;
      max-width: 800px;
      text-align: center;
      margin: 40px auto;
      border: 1px solid #eeeeee;
      border-radius: 10px;
    }
    &__wrapper {
      display: flex;
      justify-content: space-between;
      height: 50px;
      border-radius: 10px;
    }
    &__pre, &__next {
      display: block;
      line-height: 50px;
      padding: 0 10px;
      width: 10%;
      & a {
        font-size: 1.5rem;
        font-weight: bold;
        display: block;
      }
      &:hover {
        background-color: rgb(94, 233, 182);
      }
      &:hover a {
        color: #fff;
      }
    }
    &__pre {
      border-right: 1px solid #eeeeee;
      border-top-left-radius: 10px;
      border-bottom-left-radius: 10px;
    }
    &__next {
      border-left: 1px solid #eeeeee;
      border-top-right-radius: 10px;
      border-bottom-right-radius: 10px;
    }
    &__numbers {
      width: 100%;
      display: flex;
      justify-content: space-around;
      line-height: 50px;
      a {
        width: 100%;
        &:hover {
          background-color: rgb(94, 233, 182);
          color: #fff;
        }
      }
    }
  }
  .active {
    background-color: rgb(94, 233, 182);
    color: #fff;
  }
</style>
