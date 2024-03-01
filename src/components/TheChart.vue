<script setup lang="ts">
import { defineProps, onMounted, ref } from "vue";
import Chart, { ChartConfiguration, ChartItem } from 'chart.js/auto';

const props = defineProps({
  name: {
    type: String,
    required: true
  },

});

const chartElement = ref<ChartItem | null>(null);

const dataExpense = {
  labels: [
    'Needs',
    'Desire',
    'Savings'
  ],
  datasets: [{
    label: 'My First Dataset',
    data: [300, 50, 100],
    backgroundColor: [
      'rgb(255, 99, 132)',
      'rgb(54, 162, 235)',
      'rgb(255, 205, 86)'
    ],
    hoverOffset: 4
  }]
};

const dataIncome = {
  labels: [
    'Main',
    'Passive',
    'Investment',
    'Gift'
  ],
  datasets: [{
    label: 'My First Dataset',
    data: [300, 50, 100, 60],
    backgroundColor: [
      'rgb(60, 179, 113)',
      'rgb(255, 99, 132)',
      'rgb(54, 162, 235)',
      'rgb(255, 205, 86)'
    ],
    hoverOffset: 4
  }]
}

const config: ChartConfiguration = {
  type: 'doughnut',
  data: props.name === 'income' ? dataIncome : dataExpense,
};

onMounted(() => {
  chartElement.value = document.getElementById(props.name) as ChartItem;
  if (chartElement.value) {
    new Chart(chartElement.value, config);
  } else {
    console.error(`Element with ID '${props.name}' not found.`);
  }
});
</script>


<template>
  <div
    class="w-[22%] p-2 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
    <p class="text-center font-semibold text-lg">{{ props.name }}</p>
    <canvas :id="props.name"></canvas>
  </div>
</template>
