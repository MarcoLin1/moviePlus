<template>
  <header class="header__container">
    <router-link to="/">
      <span>Movie<span class="header__text">Plus+</span></span>
    </router-link>
  </header>
</template>

<style lang="scss" scoped>
@import '../assets/SCSS/main.scss';
  .header__container {
    display: flex;
    padding: 15px;
    align-items: center;
    font-family: 'Lobster', cursive;
    span {
      font-size: 3rem;
      font-weight: 700;
      color: #118eee;
    }
    .header__text {
      font-size: 2.5rem;
      font-weight: 600;
      color: #3f886d;
    }
  }
</style>
