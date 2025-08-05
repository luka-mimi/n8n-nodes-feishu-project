# 飞书项目 N8N 集成插件

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![N8N](https://img.shields.io/badge/platform-N8N-brightgreen.svg)
![TypeScript](https://img.shields.io/badge/language-TypeScript-blue.svg)
![Node.js](https://img.shields.io/badge/node-%3E%3D20.15-green.svg)

一个功能完整的 N8N 自定义节点，用于集成飞书项目 (Feishu Project) API，支持工作项管理、空间管理、用户管理、附件处理等全方位功能。

## 🚀 特性

- ✅ **16个功能模块**，覆盖飞书项目的主要API功能
- ✅ **73个操作**，支持完整的工作流自动化
- ✅ **安全认证**，自动管理插件Token和用户认证
- ✅ **文件上传**，支持多种格式的附件管理
- ✅ **统一参数**，采用JSON格式的一致性参数设计
- ✅ **错误处理**，完善的异常处理和用户提示
- ✅ **TypeScript支持**，完整的类型定义和智能提示

## 📦 安装

### 方式一：NPM 安装 (推荐)

```bash
npm install @luka-cat-mimi/n8n-nodes-feishu-project
```

### 方式二：手动安装

1. 下载项目到本地
2. 编译项目

```bash
npm install
npm run build
```

1. 将编译后的文件复制到 N8N 的 `custom` 目录

## ⚙️ 配置

### 1. 创建凭据

在 N8N 中创建新的 "飞书项目 API" 凭据，填入以下信息：

| 字段 | 说明 | 示例 |
|------|------|------|
| **飞书项目host** | 飞书项目的基础host地址 | `project.feishu.cn` |
| **插件ID** | 飞书项目插件的ID | `MII_0000000000000000` |
| **插件密钥** | 飞书项目插件的密钥 | `AB92E56666CT8D60704743BF69C92C16` |
| **用户ID** | 用户的唯一ID，用于X-USER-KEY头部 | `7568516887894324252` |

### 2. 获取凭据信息

#### 插件ID和插件密钥

1. 登录飞书项目管理后台
2. 进入插件管理页面
3. 查看或创建插件，获取插件ID和密钥

#### 用户ID

1. 打开浏览器开发者工具
2. 登录飞书项目
3. 在网络请求中查看 `X-USER-KEY` 头部信息

## 📊 功能模块

### 核心功能

| 模块 | 操作数 | 主要功能 |
|------|--------|----------|
| 🔐 **插件相关** | 1 | 获取plugin_token |
| 👥 **用户管理** | 4 | 用户查询、搜索、用户组管理 |
| 🏢 **空间管理** | 5 | 空间列表、详情、业务线、团队成员 |
| 📎 **附件管理** | 4 | 文件上传、下载、附件添加删除 |

### 工作项功能

| 模块 | 操作数 | 主要功能 |
|------|--------|----------|
| 🔍 **工作项实例搜索** | 5 | 单空间、跨空间、复杂搜索、全局搜索 |
| 📝 **工作项实例读写** | 16 | CRUD操作、批量更新、状态管理、评审管理 |
| ⚙️ **工作项配置** | 9 | 基础信息、字段配置、关联配置 |
| 🔗 **空间关联** | 4 | 关联规则、工作项绑定解绑 |

### 流程管理

| 模块 | 操作数 | 主要功能 |
|------|--------|----------|
| 🔄 **流程与节点** | 5 | 流程详情、节点更新、状态变更 |
| 📋 **流程配置** | 5 | 流程模板管理、配置更新 |
| 👤 **角色与人员配置** | 1 | 流程角色管理 |

### 协作功能

| 模块 | 操作数 | 主要功能 |
|------|--------|----------|
| 📌 **子任务** | 6 | 子任务生命周期管理 |
| 👁️ **视图** | 8 | 视图配置、工作项展示 |
| 💬 **评论** | 4 | 评论CRUD操作 |
| 👥 **群组** | 1 | 机器人加入聊天 |
| 📈 **度量** | 1 | 图表详情 |

## 🛠️ 使用示例

### 基础用法

1. **添加飞书项目节点**到工作流
2. **选择资源类型**（如"用户管理"）
3. **选择具体操作**（如"搜索租户内的用户列表"）
4. **配置参数**：
   - 路径参数：直接填入（如项目KEY）
   - 请求体参数：JSON格式，有默认值

### 用户查询示例

```json
{
  "user_keys": ["7568516887894324252"],
  "out_ids": [],
  "emails": ["user@example.com"],
  "tenant_key": "your_tenant_key"
}
```

### 工作项搜索示例

```json
{
  "work_item_name": "需求",
  "user_keys": ["7568516887894324252"],
  "work_item_type_keys": ["story"],
  "page_num": 1,
  "page_size": 10,
  "expand": {
    "need_workflow": true,
    "need_user_detail": true
  }
}
```

### 文件上传示例

1. 使用 "Read Binary File" 节点读取文件
2. 连接到 "飞书项目" 节点
3. 选择 "附件管理" > "文件上传"
4. 设置 `binaryPropertyName` 为 "data"（默认值）
5. 填入项目KEY等路径参数

## 🔧 开发

### 项目结构

```text
n8n-nodes-feishu-project/
├── credentials/                 # 凭据定义
│   └── FeishuProjectApi.credentials.ts
├── nodes/                      # 节点定义
│   └── FeishuProject/
│       ├── FeishuProject.node.ts
│       └── resource/           # 资源模块
│           ├── user/           # 用户管理
│           ├── space/          # 空间管理
│           ├── attachment/     # 附件管理
│           └── ...            # 其他模块
└── package.json
```

### 构建命令

```bash
# 开发模式
npm run dev

# 构建
npm run build

# 代码检查
npm run lint

# 格式化代码
npm run format
```

### 添加新功能

1. 在 `nodes/FeishuProject/resource/` 下创建新模块文件夹
2. 创建资源定义文件 `ModuleResource.ts`
3. 在模块文件夹下创建操作文件 `OperateFile.ts`
4. 使用统一的参数模式：路径参数 + JSON请求体

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

### 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 📝 许可证

本项目采用 MIT 许可证。详情请参见 [LICENSE](LICENSE.md) 文件。

## 🆘 支持

- 📧 邮箱：**luka.cat.mimi@gmail.com**
- 🐛 问题反馈：[GitHub Issues](https://github.com/luka-mimi/n8n-nodes-feishu-project/issues)
- 📖 飞书项目API文档：[官方文档](https://project.feishu.cn/b/helpcenter/1p8d7djs/4bsmoql6)

## ⭐ 致谢

感谢 [N8N](https://n8n.io/) 提供的强大自动化平台，以及飞书项目团队提供的完善API接口。

---

如果这个项目对你有帮助，请给它一个 ⭐️！
