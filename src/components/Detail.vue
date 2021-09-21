<template>
  <div
    class="detail__container"
  >
    <div
      class="detail__wrapper"
    >
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
            :src="movie.image | emptyImage"
            alt=""
            class="detail__image"
          >
        </div>
        <div class="detail__wrapper__text">
          <div class="detail__wrapper__item detail__wrapper__information">
            <div class="detail__year">
              <span class="detail__subtitle">Year :</span>  {{ movie.year }}
            </div>
            <div class="detail__type">
              <span class="detail__subtitle">Type :</span> {{ movie.type }}
            </div>
            <div class="detail__rating">
              <span class="detail__subtitle">Rating :</span> {{ movie.rating === 'N/A' ? '--': movie.rating }}
            </div>
          </div>
          <div class="detail__wrapper__item detail__wraaper__director">
            <div class="detail__director">
              <span class="detail__subtitle">Director :</span> {{ movie.director }}
            </div>
          </div>
          <div class="detail__wrapper__item detail__wrapper__actor">
            <div class="detail__actor">
              <span class="detail__subtitle">Actors :</span> {{ movie.actors }}
            </div>
          </div>
          <div class="detail__wrapper__item">
            <div class="detail__description">
              {{ movie.description | emptyText }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { emptyFilter } from '../utils/mixins'
export default {
  mixins: [emptyFilter],
  props: {
    initialIsLoading: {
      type: Boolean
    }
  },
  data () {
    return {
    }
  },
  watch: {
    showModal (newValue, oldValue) {
      const wrapper = document.querySelector('.detail__wrapper')
      const container = document.querySelector('.detail__container')
      if (newValue === true) {
        wrapper.classList.add('fade__in')
        container.classList.add('fade__in')
      } else {
        wrapper.classList.remove('fade__in')
        container.classList.remove('fade__in')
      }
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
@import '../assets/SCSS/main.scss';
  .detail {
   &__container {
     width: 100%;
     height: 100vh;
     background-color: rgba(0, 0, 0, 0.40);
     display: flex;
     align-items: center;
     position: fixed;
     top: 0;
     left: 0;
     transition: 0.8s ease-in;
     visibility: hidden;
   }
   &__wrapper {
     position: relative;
     background-color: #fff;
     width: 85%;
     max-width: 800px;
     max-height: 735px;
     margin: 0 auto;
     box-shadow: 0 12px 15px 0 rgba(0, 0, 0, 0.25);
     transition: 0.8s ease-in;
     visibility: hidden;
     transform: translateY(-200%);
   }
   &__wrapper__header {
     position: relative;
     top: 10px;
     display: flex;
     justify-content: space-between;
     width: 95%;
     margin: 0 20px;
   }
   &__wrapper__title, &__wrapper__close {
     line-height: 50px;
   }
   &__wrapper__title {
     @include text-style(1.6rem, 700, #000);
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
     position: absolute;
     top: -50%;
     right: -6%;
     cursor: pointer;
     &:hover {
       background: linear-gradient(to bottom right,#408fff,rgb(7, 77, 176));
     }
   }
   &__wrapper__content {
     height: 100%;
     position: relative;
     display: flex;
     padding: 0 20px 20px 20px;
   }
   &__wrapper__item {
     display: flex;
     justify-content: space-between;
     margin: 20px auto;
     text-align: left;
   }
   &__wrapper__image {
     padding-right: 20px;
     align-items: center;
   }
   &__wrapper__text {
     width: 100%;
   }
   &__image {
     display: flex;
     justify-content: center;
     width: fit-content;
     height: fit-content;
     @extend %box-shadow-style;
   }
   &__year, &__type, &__rating {
     @include text-style (1rem, 500, #000);
     font-family: 'Chakra Petch', sans-serif;
   }
   &__subtitle {
     @include text-style (1.3rem, 700, #000);
     font-family: 'Acme', sans-serif;
   }
   &__description {
     height: auto;
     max-height: 400px;
     padding: 5px 10px 5px 10px;
     outline: 1px solid #eeeeee;
     overflow-y: auto;
     line-height: 1.5rem;
     @include text-style(1rem, 500, #868686);
     font-family: 'Chakra Petch', sans-serif;
     text-align: left;
   }
   &__wrapper__actor {
     line-height: 1.5rem;
   }
  }
  .fade__in {
    transition: 0.8s ease-in-out;
    visibility: visible;
    transform: translateY(0);
  }
@media screen and (max-width: 700px) {
  .detail {
    &__wrapper {
      min-width: 380px;
    }
    &__wrapper__header {
      padding-left: 0;
    }
    &__wrapper__title {
      font-size: 1.2rem;
    }
    &__wrapper__image {
      display: none;
    }
    &__wrapper__content {
      padding: 0;
    }
    &__wrapper__information {
      width: 95%;
      justify-content: space-between;
    }
    &__wrapper__item {
      width: 95%;
      margin: 20px auto;
    }
    &__actor {
      text-align: left;
    }
    &__description {
      outline: none;
      padding: 0;
      width: 95%;
    }
  }
}
</style>
