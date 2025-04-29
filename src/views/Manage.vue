<template>
  <div class="container">
    <div class="tableBox">
      <h1>Tasks</h1>
      <!-- 表格 -->
      <a-table :columns="columns" :data-source="data" row-key="id" bordered>
        <!-- 自定义操作列 -->
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'actions' && isAdmin">
            <a-popconfirm title="确定要删除吗？" @confirm="() => handleDelete(record.id)">
              <a-button type="link" danger>删除</a-button>
            </a-popconfirm>
          </template>
          <template v-else-if="column.key === 'overtime'">
            <span>{{ record.overtime ? '是' : '否' }}</span>
          </template>
        </template>
      </a-table>
    </div>
    <div class="graphBox">
      <div style="width: 100%; height: 400px;" ref="barChart"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getProjectList, deleteProjectById } from "@/api";
import * as echarts from "echarts";
const data = ref([]);
// 判断是否为管理员
const role = localStorage.getItem("userRole");
const isAdmin = role === "admin"; // 你可以改成严格判断
// 表格列定义
const columns = [
  { title: "id", dataIndex: "id", key: "id" },
  { title: "project", dataIndex: "project", key: "project" },
  { title: "overtime", dataIndex: "overtime", key: "overtime" },
  { title: "hours", dataIndex: "hours", key: "hours" },
  { title: "created_at", dataIndex: "created_at", key: "created_at" },
];
// 如果是管理员，则添加操作列
if (isAdmin) {
  columns.push({ title: "actions", key: "actions" });
}
// 创建柱状图
const barChart = ref(null);
const initChart = () => {
  const chartInstance = echarts.init(barChart.value);
  console.log(data.value);

  const xData = data.value.map((item) => item.project); // X轴数据
  const yData = data.value.map((item) => item.hours); // Y轴数据
  console.log(xData, yData);
  const option = {
    title: {
      text: "Project Hours Distribution",
    },
    tooltip: {},
    xAxis: {
      type: "category",
      data: xData, // X轴数据
      axisLabel: {
        rotate: 45, // 标签旋转45度
        interval: 0, // 强制显示所有标签
      },
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: yData, // Y轴数据
        type: "bar",
        itemStyle: {
          color: "#4fa3f7",
        },
      },
    ],
  };
  chartInstance.setOption(option);
};
// 模拟请求数据
const fetchData = async () => {
  await getProjectList().then((res) => {
    data.value = res.data.data;
    initChart();
  });
};
// 删除处理
const handleDelete = (id) => {
  deleteProjectById(id).then(() => {
    // 删除成功后重新获取数据
    fetchData();
  });
};
// 页面加载时取数据
onMounted(() => {
  fetchData();
});
</script>
<style lang="less" scoped>
.container {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 20px;
  margin: 20px;
  .tableBox {
    width: 60%;
  }
  .graphBox {
    width: 40%;
    margin-left: 20px;
  }
}
</style>