<template>
  <div class="tableBox">
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
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getProjectList, deleteProjectById } from "@/api";
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
// 模拟请求数据
const fetchData = () => {
  getProjectList().then((res) => {
    data.value = res.data.data;
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
.tableBox {
  width: 50%;
  margin: 20px;
  padding: 20px;
  border: 1px solid #ccc;
}
</style>