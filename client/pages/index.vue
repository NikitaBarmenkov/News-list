<template>
  <div class="main_container">
    <div class="main_content">
      <div class="head_container">
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
            class="search_input"
            type="text"
            @input="handleSearchTextChange()"
          >
          <div class="search_icon">
            <img src="../assets/images/search.svg">
          </div>
        </div>
      </div>
      <div class="control_container">
        <div class="decorate_line" />
        <div class="filters_container">
          <div class="source_container">
            <a :class="filterColors[0]" @click="setSource('all')">
              Все
            </a>
            <a :class="filterColors[1]" @click="setSource('lenta')">
              Lenta.ru
            </a>
            <a :class="filterColors[2]" @click="setSource('mos')">
              Mos.ru
            </a>
          </div>
          <div class="modes_container">
            <input id="radioList" type="radio" name="radioMode">
            <label class="list_mode" for="radioList" @click="setMode('list')" />

            <input id="radioGrid" type="radio" name="radioMode" checked>
            <label class="grid_mode" for="radioGrid" @click="setMode('grid')" />
          </div>
        </div>
      </div>
      <div class="news_container">
        <Layout v-for="n in news" :key="n.title" :news="n" :mode="mode" />
      </div>
      <div class="footer_container">
        <div class="page_navigation_container">
          <a @click="navigateLeft()">
            <img src="../assets/images/arrow_left.svg">
          </a>
          <div>
            {{ options.page }}
          </div>
          <a @click="navigateRight()">
            <img src="../assets/images/arrow_right.svg">
          </a>
          <p>...</p>
          <p>{{ max }}</p>
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
        source: 'all',
        searchText: '',
        page: 1,
        newsPerPage: 4,
      },
      mode: 'grid',
      filterColors: ['active_source', 'inactive_source', 'inactive_source'],
      max: 1,
      news: [],
    };
  },
  created() {
    this.serverRequest();
  },
  methods: {
    navigateLeft() {
      if (this.options.page - 1 < 1) {
        this.options.page = 1;
        return;
      }
      this.options.page -= 1;
      this.serverRequest();
    },
    navigateRight() {
      if (this.options.page + 1 > this.max) {
        this.options.page = this.max;
        return;
      }
      this.options.page += 1;
      this.serverRequest();
    },
    setSource(source: string) {
      if (source === 'all') this.filterColors = ['active_source', 'inactive_source', 'inactive_source'];
      else if (source === 'lenta') this.filterColors = ['inactive_source', 'active_source', 'inactive_source'];
      else this.filterColors = ['inactive_source', 'inactive_source', 'active_source'];
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
    refresh() {
      this.options.page = 1;
      this.serverRequest();
    },
    handleSearchTextChange() {
      this.options.page = 1;
      this.serverRequest();
    },
    async serverRequest() {
      const response = await this.$axios.$post('/api/news', this.options);
      this.news = response.data;
      this.max = response.pages;
    },
  },
});
</script>
