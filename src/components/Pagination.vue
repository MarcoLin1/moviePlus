<template>
  <div
    class="pagination__container"
  >
    <ul class="pagination__wrapper">
      <div class="pagination__pre__group">
        <li class="pagination__pre">
          <a
            href=""
            class="pagination__pre__icon"
            @click.stop.prevent="updatePage(nowPage - 1)"
          >&lt;</a>
        </li>
      </div>
      <li class="pagination__numbers">
        <a
          v-for="index in pages"
          :key="index"
          :class="nowPage === index ? 'active':''"
          href=""
          class="pagination__number"
          @click.stop.prevent="updatePage(index)"
        >{{ index }}</a>
      </li>
      <div class="pagination__next__group">
        <li class="pagination__next pagination__next__update">
          <a
            href=""
            class="pagination__next__icon"
            @click.stop.prevent="updatePage(nowPage + 1)"
          >&gt;</a>
        </li>
      </div>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['totalMovies', 'input', 'nowPage']),
    endPage () {
      if (this.totalMovies > 10 && this.nowPage > 10 && this.nowPage < this.totalMovies) {
        if ((this.nowPage + 10) > this.totalMovies) {
          return this.totalMovies
        }
        return this.nowPage + 9
      } else if (this.totalMovies < 10) {
        return this.totalMovies
      }
      return 10
    },
    pages () {
      const range = []
      // 總筆數少於10筆
      if ((this.endPage - this.nowPage) <= 10 && this.nowPage <= 10 && this.totalMovies <= 10) {
        for (let i = 1; i <= this.totalMovies; i++) {
          range.push(i)
        }
      // 總筆數超過10筆，第一頁
      } else if ((this.endPage - this.nowPage) <= 10 && this.nowPage <= 10) {
        for (let i = 1; i <= 10; i++) {
          range.push(i)
        }
      // 最後一頁
      } else if ((this.totalMovies - this.nowPage) < 10) {
        for (let i = this.totalMovies - 9; i <= this.totalMovies; i++) {
          range.push(i)
        }
      // 其他換頁
      } else if ((this.endPage - this.nowPage) <= 10 && this.nowPage > 10) {
        for (let i = this.nowPage - 1; i <= this.endPage - 1; i++) {
          range.push(i)
        }
      }
      return range
    }
  },
  methods: {
    updatePage (pageNum) {
      if (this.endPage < this.nowPage) {
        return
      }
      if (pageNum === 0) {
        return
      }
      this.$store.commit('nowIsLoading')
      this.$store.commit('getPageNum', pageNum)
      this.changePageStyle()
    },
    changePageStyle () {
      const allPageNum = document.querySelectorAll('.pagination__number')
      const activePage = document.querySelectorAll('.active')
      allPageNum.forEach(page => {
        if (Number(page.textContent) === this.nowPage) {
          page.classList.add('active')
        }
      })
      activePage.forEach(page => {
        if (Number(page.textContent) !== this.nowPage) {
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
