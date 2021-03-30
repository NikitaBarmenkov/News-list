<template>
  <div class="main_container">
    <div class="main_content">
      <div class="head_container font_arial">
        <div class="title_refresh_container">
          <p class="title_text">
            Список новостей
          </p>
          <div class="circle box_shadow">
            <a @click="refresh()">
              <img class="round_button_icon" src="../assets/images/refresh.svg">
            </a>
          </div>
        </div>
        <div class="search_block box_shadow">
          <input
            v-model="options.searchText"
            class="input"
            type="text"
            @input="handleSearchTextChange()"
          >
          <div class="search_icon">
            <a>
              <img src="../assets/images/search.svg">
            </a>
          </div>
        </div>
      </div>
      <div class="control_container">
        <div class="decorate_line" />
        <div class="filters_container font_arial">
          <div class="source_container color_blue text_filters">
            <a @click="setSource('all')">
              Все
            </a>
            <a @click="setSource('lenta')">
              Lenta.ru
            </a>
            <a @click="setSource('mos')">
              Mos.ru
            </a>
          </div>
          <div class="modes_container">
            <input id="radioList" type="radio" name="radioMode" checked>
            <label class="list_mode" for="radioList" @click="setMode('list')" />

            <input id="radioGrid" type="radio" name="radioMode">
            <label class="grid_mode" for="radioGrid" @click="setMode('grid')" />
          </div>
        </div>
      </div>
      <div class="news_container">
        <Layout v-for="n in news" :key="n.title" :news="n" :mode="mode" />
      </div>
      <div class="footer_container">
        <div class="page_navigation_container">
          <p>1...</p>
          <input
            v-model="options.page"
            type="number"
            min="1"
            :max="max"
            @input="handlePageChange()"
          >
          <p>...{{ max }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Layout from '../components/NewsLayout.vue';

export default Vue.extend({
  components: { Layout },
  data() {
    return {
      options: {
        source: 'mos',
        searchText: '',
        page: 1,
        newsPerPage: 3,
      },
      mode: 'list',
      max: 6,
      news: [],
    };
  },
  created() {
    this.serverRequest();
  },
  methods: {
    setSource(source: string) {
      this.options.source = source;
      this.options.page = 1;
      this.serverRequest();
    },
    setMode(value: string) {
      this.mode = value;
      this.options.newsPerPage = value === 'grid' ? 4 : 3;
      this.options.page = 1;
      this.serverRequest();
    },
    handlePageChange() {
      this.serverRequest();
    },
    refresh() {
      this.options.page = 1;
      this.serverRequest();
    },
    handleSearchTextChange() {
      this.options.page = 1;
      this.serverRequest();
    },
    async serverRequest() {
      const response = await this.$axios.$post('https://localhost:3001/api/news', this.options);
      this.news = response.data;
      this.max = response.pages;
    },
  },
});
</script>
