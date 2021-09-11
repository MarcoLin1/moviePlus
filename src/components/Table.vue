<template>
  <div class="table__container">
    <div class="table">
      <div class="table__header">
        <div class="table__header__item">
          名稱
        </div>
        <div class="table__header__item">
          類型
        </div>
        <div class="table__header__item">
          年份
        </div>
        <div class="table__header__item">
          內容
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
            <button class="table__data__button">
              詳細資料
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
  },
  props: {
    searchingMovies: {
      type: Array
    }
  },
  data () {
    return {
      movies: this.searchingMovies
    }
  }
}
</script>

<style lang="scss" scoped>
  .table {
    width: 100%;
    border: 1px solid #eeeeee;
    border-radius: 5px;
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
      background-color: rgba(64,143,255,.5);
    }
    &__header__item {
      flex: 1 1 20%;
      text-align: center;
    }
    &__row {
      display: flex;
      padding: 0.5rem 0;
      &:nth-of-type(even) {
        background-color: rgba(64,143,255,.2);
      }
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
      &:hover {
        background-color: rgba(64,143,255,.7);
      }
    }
  }
</style>
