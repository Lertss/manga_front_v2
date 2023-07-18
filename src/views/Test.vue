<template>
  <div class="tabs paper" :data-tabs-init="{ &quot;line&quot;: true, &quot;history&quot;: true }" :data-tabs-id="tabsId">
    <div class="media-tabs">
      <div class="tabs__wrapper">
        <ul class="tabs__list" :data-tabs-list-id="tabsId">
          <li class="tabs__item" data-key="info">Информация</li>
          <li class="tabs__item" data-key="chapters">Главы</li>
          <li class="tabs__item" data-key="comments">Комментарии</li>
          <li class="tabs__item" :class="{ 'tabs__item_active': activeTab === 'discussion' }" data-key="discussion">Обсуждения</li>
          <div class="tabs__line" :style="lineStyle"></div>
        </ul>
      </div>
    </div>

    <div class="tabs__content">
      <div v-show="activeTab === 'info'" class="media-section media-section_info" itemscope="" itemtype="http://schema.org/CreativeWork">
        <!-- Content for 'Информация' tab -->
      </div>

      <div v-show="activeTab === 'chapters'" class="media-section media-section_teams">
        <!-- Content for 'Главы' tab -->
      </div>

      <div v-show="activeTab === 'comments'" class="media-section media-section_slider" data-slider="similar">
        <!-- Content for 'Комментарии' tab -->
      </div>

      <div v-show="activeTab === 'discussion'" class="media-section media-discussions">
        <!-- Content for 'Обсуждения' tab -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabsId: 'tabs_1',
      activeTab: 'discussion',
      lineStyle: '',
    };
  },
  mounted() {
    this.updateLineStyle();
  },
  methods: {
    updateLineStyle() {
      const tabs = document.querySelector(`[data-tabs-id="${this.tabsId}"] .tabs__list`);
      const activeTab = tabs.querySelector('.tabs__item_active');
      const lineWidth = activeTab.offsetWidth;
      const lineTranslateX = activeTab.offsetLeft;

      this.lineStyle = `width: ${lineWidth}px; transform: translateX(${lineTranslateX}px)`;
    },
  },
};
</script>

<style>
/* Your styles here */
</style>
