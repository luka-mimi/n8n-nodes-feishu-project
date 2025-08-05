# Feishu Project N8N Integration Plugin

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![N8N](https://img.shields.io/badge/platform-N8N-brightgreen.svg)
![TypeScript](https://img.shields.io/badge/language-TypeScript-blue.svg)
![Node.js](https://img.shields.io/badge/node-%3E%3D20.15-green.svg)

A comprehensive N8N custom node for integrating with Feishu Project API, supporting work item management, space management, user management, attachment handling, and other full-featured functionalities.

## 🚀 Features

- ✅ **16 functional modules** covering major Feishu Project API capabilities
- ✅ **73 operations** supporting complete workflow automation
- ✅ **Secure authentication** with automatic plugin token and user authentication management
- ✅ **File upload** supporting multiple formats for attachment management
- ✅ **Unified parameters** with consistent JSON format parameter design
- ✅ **Error handling** with comprehensive exception handling and user notifications
- ✅ **TypeScript support** with complete type definitions and intelligent suggestions

## 📦 Installation

### Method 1: NPM Installation (Recommended)

```bash
npm install @luka-cat-mimi/n8n-nodes-feishu-project
```

### Method 2: Manual Installation

1. Download the project locally
2. Compile the project

```bash
npm install
npm run build
```

3. Copy the compiled files to N8N's `custom` directory

## ⚙️ Configuration

### 1. Create Credentials

Create a new "Feishu Project API" credential in N8N and fill in the following information:

| Field | Description | Example |
|-------|-------------|---------|
| **Feishu Project Host** | Base host address of Feishu Project | `project.feishu.cn` |
| **Plugin ID** | Feishu Project plugin ID | `MII_0000000000000000` |
| **Plugin Secret** | Feishu Project plugin secret | `AB92E56666CT8D60704743BF69C92C16` |
| **User ID** | User's unique ID for X-USER-KEY header | `7568516887894324252` |

### 2. Obtaining Credential Information

#### Plugin ID and Plugin Secret

1. Log in to Feishu Project management backend
2. Go to plugin management page
3. View or create a plugin to get plugin ID and secret

#### User ID

1. Open browser developer tools
2. Log in to Feishu Project
3. Check the `X-USER-KEY` header information in network requests

## 📊 Functional Modules

### Core Functions

| Module | Operations | Main Features |
|--------|-----------|---------------|
| 🔐 **Plugin Related** | 1 | Get plugin_token |
| 👥 **User Management** | 4 | User query, search, user group management |
| 🏢 **Space Management** | 5 | Space list, details, business lines, team members |
| 📎 **Attachment Management** | 4 | File upload, download, attachment add/remove |

### Work Item Functions

| Module | Operations | Main Features |
|--------|-----------|---------------|
| 🔍 **Work Item Instance Search** | 5 | Single space, cross-space, complex search, global search |
| 📝 **Work Item Instance R/W** | 16 | CRUD operations, batch updates, status management, review management |
| ⚙️ **Work Item Configuration** | 9 | Basic info, field configuration, relation configuration |
| 🔗 **Space Relations** | 4 | Relation rules, work item binding/unbinding |

### Process Management

| Module | Operations | Main Features |
|--------|-----------|---------------|
| 🔄 **Process & Nodes** | 5 | Process details, node updates, status changes |
| 📋 **Process Configuration** | 5 | Process template management, configuration updates |
| 👤 **Role & Personnel Config** | 1 | Process role management |

### Collaboration Functions

| Module | Operations | Main Features |
|--------|-----------|---------------|
| 📌 **Subtasks** | 6 | Subtask lifecycle management |
| 👁️ **Views** | 8 | View configuration, work item display |
| 💬 **Comments** | 4 | Comment CRUD operations |
| 👥 **Groups** | 1 | Bot join chat |
| 📈 **Metrics** | 1 | Chart details |

## 🛠️ Usage Examples

### Basic Usage

1. **Add Feishu Project node** to your workflow
2. **Select resource type** (e.g., "User Management")
3. **Select specific operation** (e.g., "Search users in tenant")
4. **Configure parameters**:
   - Path parameters: Direct input (e.g., project KEY)
   - Request body parameters: JSON format with default values

### User Query Example

```json
{
  "user_keys": ["7568516887894324252"],
  "out_ids": [],
  "emails": ["user@example.com"],
  "tenant_key": "your_tenant_key"
}
```

### Work Item Search Example

```json
{
  "work_item_name": "Requirement",
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

### File Upload Example

1. Use "Read Binary File" node to read file
2. Connect to "Feishu Project" node
3. Select "Attachment Management" > "File Upload"
4. Set `binaryPropertyName` to "data" (default value)
5. Fill in project KEY and other path parameters

## 🔧 Development

### Project Structure

```text
n8n-nodes-feishu-project/
├── credentials/                 # Credential definitions
│   └── FeishuProjectApi.credentials.ts
├── nodes/                      # Node definitions
│   └── FeishuProject/
│       ├── FeishuProject.node.ts
│       └── resource/           # Resource modules
│           ├── user/           # User management
│           ├── space/          # Space management
│           ├── attachment/     # Attachment management
│           └── ...            # Other modules
└── package.json
```

### Build Commands

```bash
# Development mode
npm run dev

# Build
npm run build

# Code checking
npm run lint

# Format code
npm run format
```

### Adding New Features

1. Create new module folder under `nodes/FeishuProject/resource/`
2. Create resource definition file `ModuleResource.ts`
3. Create operation files `OperateFile.ts` in the module folder
4. Use unified parameter pattern: path parameters + JSON request body

## 🤝 Contributing

Issues and Pull Requests are welcome!

### Contribution Guidelines

1. Fork the project
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE.md) file for details.

## 🆘 Support

- 📧 Email: **luka.cat.mimi@gmail.com**
- 🐛 Issue Feedback: [GitHub Issues](https://github.com/luka-mimi/n8n-nodes-feishu-project/issues)
- 📖 Feishu Project API Documentation: [Official Documentation](https://project.feishu.cn/b/helpcenter/1p8d7djs/4bsmoql6)

## ⭐ Acknowledgments

Thanks to [N8N](https://n8n.io/) for providing the powerful automation platform, and to the Feishu Project team for providing comprehensive API interfaces.

---

If this project helps you, please give it a ⭐️!
