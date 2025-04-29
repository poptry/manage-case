import Mock from "mockjs";

let projectList = [
  {
    id: "001",
    project: "Road Project A",
    overtime: true,
    hours: 3.5,
    created_at: "2024-04-10 10:30",
  },
  {
    id: "002",
    project: "Bridge Maintenance B",
    overtime: false,
    hours: 2,
    created_at: "2024-04-09 13:00",
  },
  {
    id: "003",
    project: "Pipeline Fix C",
    overtime: true,
    hours: 4.5,
    created_at: "2024-04-08 08:00",
  },
  {
    id: "004",
    project: "Tunnel Cleaning D",
    overtime: false,
    hours: 3,
    created_at: "2024-04-07 16:45",
  },
];

// 读取接口（POST方式）
Mock.mock("/api/projects/list", "post", () => {
  return {
    code: 200,
    data: projectList,
    message: "Success",
  };
});

// 删除接口（POST方式）
Mock.mock("/api/projects/delete", "post", (options) => {
  const body = JSON.parse(options.body);
  const id = body.id;
  projectList = projectList.filter((item) => item.id !== id);
  return {
    code: 200,
    message: "Deleted successfully",
  };
});
