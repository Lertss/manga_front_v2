<template>
  <div>
    <button @click="showComponent(1)">Кнопка 1</button>
    <button @click="showComponent(2)">Кнопка 2</button>
    <button @click="showComponent(3)">Кнопка 3</button>

    <div>
      <component :is="currentComponent"></component>
    </div>
  </div>
</template>

<script>
import Component1 from '@/components/one.vue';
import Component2 from '@/components/two.vue';
import Component3 from '@/components/three.vue';

export default {
  components: {
    Component1,
    Component2,
    Component3,
  },
  data() {
    return {
      currentComponent: 'Component1', // По замовчуванню відображаємо Component1

    };
  },
  methods: {
    showComponent(componentNumber) {
      if (componentNumber === 1) {
        this.currentComponent = 'Component1';
      } else if (componentNumber === 2) {
        this.currentComponent = 'Component2';
      } else if (componentNumber === 3) {
        this.currentComponent = 'Component3';
      }
    },
  },
};
</script>
