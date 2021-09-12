<template>
  <div
    v-if="showModal"
    class="detail__container"
  >
    <div class="detail__wrapper">
      <div class="detail__wrapper__header">
        <div class="detail__wrapper__title">
          {{ movie.title }}
        </div>
        <div class="detail__wrapper__close">
          <div
            class="detail__close"
            @click="closeModal"
          >
            X
          </div>
        </div>
      </div>
      <div class="detail__wrapper__content">
        <div class="detail__wrapper__item detail__wrapper__image">
          <img
            :src="movie.image"
            alt=""
            class="detail__image"
          >
        </div>
        <div class="detail__wrapper__text">
          <div class="detail__wrapper__item">
            <div class="detail__year">
              <span class="detail__subtitle">Year :</span>  {{ movie.year }}
            </div>
            <div class="detail__type">
              <span class="detail__subtitle">Type :</span> {{ movie.type }}
            </div>
            <div class="detail__rating">
              <span class="detail__subtitle">Rating :</span> {{ movie.rating }}
            </div>
          </div>
          <div class="detail__wrapper__item">
            <div class="detail__description">
              {{ movie.description }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
    }
  },
  computed: {
    ...mapState(['showModal', 'movie'])
  },
  methods: {
    closeModal () {
      this.$store.commit('closeModal')
    }
  }
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Acme&family=Chakra+Petch:ital,wght@0,400;0,500;1,400;1,500&display=swap');
  .detail {
   &__container {
     width: 100%;
     height: 100vh;
     background-color: rgba(0, 0, 0, 0.406);
     display: flex;
     align-items: center;
     position: fixed;
     top: 0;
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
     font-family: 'Acme', sans-serif;
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
     display: flex;
     padding: 20px;
   }
   &__wrapper__item {
     display: flex;
     justify-content: space-around;
     margin: 20px auto;
   }
   &__wrapper__image {
     padding: 20px;
   }
   &__image {
     display: flex;
     justify-content: center;
     width: fit-content;
     height: fit-content;
     box-shadow: 6px 6px 6px #0000002b;
   }
   &__year, &__type, &__rating {
     font-family: 'Chakra Petch', sans-serif;
     font-weight: 500;
     font-size: 1rem;
   }
   &__subtitle {
     font-weight: 700;
     font-size: 1.3rem;
     font-family: 'Acme', sans-serif;
   }
   &__description {
     width: 90%;
     line-height: 1.5rem;
     font-size: 0.9rem;
     color: #868686;
     font-weight: 500;
     font-family: 'Chakra Petch', sans-serif;
   }
  }
</style>
