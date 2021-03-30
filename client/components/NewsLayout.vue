<template>
  <div class="box_shadow" :class="changeNewsLayoutClass()">
    <div class="news_body">
      <div :class="changeNewsWrapContent()">
        <img :class="changeNewsImage()" :src="news.image">
        <div class="news_text_content">
          <p class="news_title" @click="OpenNews()">
            {{ news.title }}
          </p>
          <p class="news_description">
            {{ news.description }}
          </p>
          <a class="news_more">
            Подробнее
          </a>
        </div>
      </div>
    </div>
    <div class="news_footer">
      <div class="footer_content">
        <p class="news_source">
          {{ news.source }}
        </p>
        <p v-if="news.date">
          {{ new Date(news.date).toLocaleDateString() }}
        </p>
        <p v-else>
          no date
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    news: {
      type: Object,
      required: true,
    },
    mode: {
      type: String,
      required: true,
    },
  },
  methods: {
    OpenNews() {
      window.open(this.news.link, '_blank');
    },
    changeNewsLayoutClass() {
      if (this.mode === 'list') {
        return 'layout_list';
      }
      return 'layout_grid';
    },
    changeNewsWrapContent() {
      if (this.mode === 'list') {
        return 'news_wrap_content_list';
      }
      return 'news_wrap_content_grid';
    },
    changeNewsImage() {
      if (this.mode === 'list') {
        return 'news_image_list';
      }
      return 'news_image_grid';
    },
  },
});
</script>
