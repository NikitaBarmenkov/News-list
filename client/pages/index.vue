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
          <input class="input" type="text">
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
            <a @click="setFilter('all')">
              Все
            </a>
            <a @click="setFilter('lenta')">
              Lenta.ru
            </a>
            <a @click="setFilter('mos')">
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
        <Layout v-for="n in news" :key="n.title" :news="n" :mode="options.mode" />
      </div>
      <div class="footer_container">
        <div class="page_navigation_container">
          <p>1...</p>
          <input v-model="options.page_number" type="number" min="1" :max="max" @input="setPage()">
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
        source: 'all',
        mode: 'list',
        page_number: 1,
        searchText: '',
      },
      max: 6,
      news: [
        {
          title: 'Московские хордовые магистрали планируют достроить к 2023 году',
          description: 'В новый транспортный каркас столицы войдут Северо-Западная хорда, Северо-Восточная хорда, Южная рокада и Юго-Восточная хорда.',
          date: new Date('Sun, 28 Mar 2021 10:04:00 +0300'),
          image: 'https://www.mos.ru/upload/newsfeed/pressevents/F_mSFgGnMh7e(1).jpg',
          link: 'https://www.mos.ru/news/item/88506073/',
        },
      ],
    };
  },
  methods: {
    setFilter(filter: string) {
      alert(filter);
    },
    setMode(value: string) {
      this.options.mode = value;
    },
    setPage() {
      alert(this.options.page_number);
    },
    refresh() {
      alert('refresh');
    },
  },
});
</script>
