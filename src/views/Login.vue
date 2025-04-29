<template>
  <div class="formBox">
    <a-form :model="formState" name="basic" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }"
      autocomplete="off" @finish="onFinish" @finishFailed="onFinishFailed">
      <a-form-item name="username"
        :rules="[{ required: true, message: 'Please input your username!' }]">
        <a-input placeholder="Username" v-model:value="formState.username" />
      </a-form-item>

      <a-form-item name="password"
        :rules="[{ required: true, message: 'Please input your password!' }]">
        <a-input-password placeholder="passWord" v-model:value="formState.password" />
      </a-form-item>

      <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
        <a-button type="primary" html-type="submit">Login in</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const formState = reactive({
  username: "",
  password: "",
});
// 表单提交成功
const onFinish = (values) => {
  if (values.username === "admin") {
    // 管理员
    localStorage.setItem("userRole", "admin");
    router.push("/manage");
  } else {
    // 普通用户
    localStorage.setItem("userRole", "user");
    router.push("/manage");
  }
};
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};
</script>
<style lang="less" scoped>
.formBox {
  margin: 40px;
  width: 400px;
  padding: 20px;
  border: 1px solid #ccc;
}
</style>