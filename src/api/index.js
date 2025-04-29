import request from "@/utils/request";

// 获取项目列表
export function getProjectList() {
  return request({
    url: "/projects/list",
    method: "post",
  });
}

// 根据 id 删除项目
export function deleteProjectById(id) {
  return request({
    url: "/projects/delete",
    method: "post",
    data: { id },
  });
}
