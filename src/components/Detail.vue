<template>
  <div class="detail__container">
    <div class="detail__wrapper">
      <div class="detail__wrapper__header">
        <div class="detail__wrapper__title">
          Beta Test
        </div>
        <div class="detail__wrapper__close">
          <div class="detail__close">
            X
          </div>
        </div>
      </div>
      <div class="detail__wrapper__content">
        <div class="detail__wrapper__item detail__wrapper__image">
          <img
            src="https://m.media-amazon.com/images/M/MV5BMzA0YWMwMTUtMTVhNC00NjRkLWE2ZTgtOWEzNjJhYzNiMTlkXkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_SX300.jpg"
            alt=""
            class="detail__image"
          >
        </div>
        <div class="detail__wrapper__item">
          <div class="detail__year">
            <span class="detail__subtitle">Year :</span>  2016
          </div>
          <div class="detail__type">
            <span class="detail__subtitle">Type :</span> game
          </div>
          <div class="detail__rating">
            <span class="detail__subtitle">Rating :</span> 8.1
          </div>
        </div>
        <div class="detail__wrapper__item">
          <div class="detail__description">
            Just before the destruction of the planet Krypton, scientist Jor-El sends his infant son Kal-El on a spaceship to Earth. Raised by kindly farmers Jonathan and Martha Kent, young Clark discovers the source of his superhuman powers and moves to Metropolis to fight evil. As Superman, he battles the villainous Lex Luthor, while, as novice reporter Clark Kent, he attempts to woo co-worker Lois Lane
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .detail {
   &__container {
     width: 100%;
     height: 100vh;
     background-color: rgba(0, 0, 0, 0.406);
     display: flex;
     align-items: center;
   }
   &__wrapper {
     background-color: #fff;
     width: 85%;
     max-width: 800px;
     margin: 0 auto;
     box-shadow: 0 12px 15px 0 rgba(0, 0, 0, 0.25);
   }
   &__wrapper__header {
     display: flex;
     justify-content: space-between;
     width: 90%;
     height: 50px;
     margin: 0 auto;
   }
   &__wrapper__title, &__wrapper__close {
     line-height: 50px;
   }
   &__wrapper__title {
     font-size: 2rem;
     font-weight: 700;
     padding-top: 10px;
   }
   &__wrapper__close {
     width: 50px;
     height: 50px;
     border-radius: 50%;
     text-align: center;
     background: linear-gradient(to bottom right,#408fff,rgb(64, 144, 255));
     color: #fff;
     position: relative;
     top: -50%;
     right: -9%;
     cursor: pointer;
     &:hover {
       background: linear-gradient(to bottom right,#408fff,rgb(7, 77, 176));
     }
   }
   &__wrapper__content {
     height: 100%;
     position: relative;
   }
   &__wrapper__item {
     display: flex;
     justify-content: space-around;
     margin: 20px auto;
   }
   &__image {
     display: flex;
     justify-content: center;
   }
   &__subtitle {
     font-weight: 700;
     font-size: 1.2rem;
   }
   &__description {
     width: 90%;
     line-height: 1.5rem;
     font-size: 0.9rem;
     color: #868686;
   }
  }
</style>
