<template>
  <div class="home__container">
    <div class="home__input__wrapper">
      <form
        action=""
        class="home__form"
        @submit.stop.prevent="searching"
      >
        <input
          v-model="inputText"
          type="text"
          class="home__input"
        >
        <button
          type="submit"
          class="home__button"
        >
          Search
        </button>
      </form>
    </div>
    <Table />
  </div>
</template>

<script>
// @ is an alias to /src
import Table from '@/components/Table.vue'

export default {
  name: 'Home',
  components: {
    Table
  },
  data () {
    return {
      inputText: ''
    }
  },
  methods: {
    searching () {
      this.inputText = ''
    }
  }
}
</script>

<style lang="scss" scoped>
  .home {
    &__input__wrapper {
      margin: 2rem 0;
    }
    &__form {
      display: flex;
      justify-content: center;
      width: 90%;
      max-width: 400px;
      margin: 0 auto;
    }
    &__input {
      width: 100%;
      border: none;
      box-shadow: inset 6px 6px 6px #cbced1, inset -6px -6px 6px rgb(255, 255, 255);
      padding-left: 10px;
      height: 2rem;
      border-radius: 10px;
      border: 1px solid transparent;
      letter-spacing: 0.5px;
      &:focus {
        border: 1px solid #118eee;
        // transition: ease-in-out 0.5s;
      }
    }
    &__button {
      color: #118eee;
      border: 1px solid #aecfff;
      border-radius: 5px;
      margin-left: 10px;
      &:hover {
        background-color: #118eee;
        color: #fff;
        border-color: transparent;
      }
    }
  }
</style>
