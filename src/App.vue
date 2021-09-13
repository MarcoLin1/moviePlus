<template>
  <div id="app">
    <header class="header__container">
      <router-link to="/">
        <span>Omnichat<span class="header__text">Movie</span></span>
      </router-link>
    </header>
    <main>
      <router-view />
    </main>
  </div>
</template>

<style lang="scss">
@import './assets/SCSS/main.scss';
* {
  box-sizing: border-box;
}

a {
  text-decoration: none;
  color: #000;
}

.header__container {
  display: flex;
  padding: 15px;
  text-align: center;
  justify-content: center;
  align-items: center;
  background-color: $light-blue;
  @extend %box-shadow-style;
  font-family: 'Lobster', cursive;
  span {
    font-size: 2rem;
    font-weight: 700;
    color: #118eee;
  }
  .header__text {
    font-size: 1.5rem;
    font-weight: 600;
    color: $light-green;
  }
}
</style>
