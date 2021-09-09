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
@import url('https://fonts.googleapis.com/css2?family=Lobster&display=swap');
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
  background-color: #71aaff95;
  box-shadow: 6px 6px 6px rgba(0, 0, 0, 0.1);
  font-family: 'Lobster', cursive;
  span {
    font-size: 2rem;
    font-weight: 700;
    color: #118eee;
  }
  .header__text {
    font-size: 1.5rem;
    font-weight: 600;
    color: #53f2b7;
  }
}
</style>
