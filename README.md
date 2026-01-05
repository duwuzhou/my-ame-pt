# My Game PT - 小游戏合集

一个基于 Expo React Native 的小游戏合集应用，支持 Web 平台。通过后端 API 动态加载游戏列表，提供流畅的游戏体验。

## ✨ 特性

- 🎮 **多款经典小游戏** - 收录多款经典休闲小游戏
- 🔍 **游戏搜索** - 支持按游戏名称、描述、关键词搜索
- 🌓 **深色模式** - 自动适配系统主题
- 📱 **响应式设计** - 自适应不同屏幕尺寸
- 🚀 **动态加载** - 通过后端 API 动态获取游戏列表
- 💾 **游戏数据** - 记录游戏播放次数等统计信息

## 🎮 游戏列表

游戏列表通过后端 API 动态加载，包括但不限于：

- 🎮 **2048** - 经典数字合并游戏
- 🦘 **跳跃前进** - 躲避障碍跑酷游戏

更多游戏即将上线...

## 🚀 快速开始

### 环境要求

- Node.js 18+
- npm 或 yarn
- 后端 API 服务（默认运行在 `http://localhost:3000`）

### 安装依赖

```bash
npm install
```

### 配置环境变量

创建 `.env` 文件并配置后端 API 地址：

```env
EXPO_PUBLIC_API_URL=http://localhost:3000
```

### 启动应用

```bash
# 启动开发服务器
npx expo start

# 或者直接启动 Web 版本
npm run web
```

### 访问应用

- **Web**: 按 `w` 键或访问 `http://localhost:8081`
- **iOS**: 按 `i` 键（需要 iOS 模拟器）
- **Android**: 按 `a` 键（需要 Android 模拟器）

## 📁 项目结构

```
my-game-pt/
├── app/                          # 应用页面（Expo Router）
│   ├── _layout.tsx              # 根布局，配置主题和导航
│   ├── (tabs)/                  # Tab 导航页面
│   │   ├── _layout.tsx          # Tab 布局配置
│   │   ├── index.tsx            # 主页 - 游戏列表（带搜索功能）
│   │   └── explore.tsx          # 关于页面
│   └── games/
│       └── [id].tsx             # 游戏详情页（动态路由）
├── components/                   # 可复用组件
│   ├── themed-text.tsx          # 主题化文本组件
│   ├── themed-view.tsx          # 主题化视图组件
│   ├── haptic-tab.tsx           # 带触觉反馈的 Tab
│   ├── external-link.tsx        # 外部链接组件
│   └── ui/                      # UI 组件
│       ├── icon-symbol.tsx      # 图标组件
│       └── icon-symbol.ios.tsx  # iOS 图标组件
├── services/                     # 服务层
│   └── api.ts                   # API 服务（游戏数据接口）
├── hooks/                        # 自定义 Hooks
│   ├── use-color-scheme.ts      # 颜色主题 Hook
│   ├── use-color-scheme.web.ts  # Web 平台颜色主题
│   └── use-theme-color.ts       # 主题颜色 Hook
├── constants/                    # 常量配置
│   └── theme.ts                 # 主题配置
├── assets/                       # 静态资源
│   └── images/                  # 图片资源
├── app.json                      # Expo 配置
├── package.json                  # 项目依赖
└── tsconfig.json                 # TypeScript 配置
```

## 🔌 API 接口

项目通过 RESTful API 与后端通信：

### 获取游戏列表

```
GET /api/games
```

响应格式：
```json
{
  "code": 0,
  "message": "success",
  "data": {
    "list": [
      {
        "id": 1,
        "gameKey": "2048",
        "name": "2048",
        "description": "经典数字合并游戏",
        "icon": "🎮",
        "iconUrl": null,
        "color": "#8b5cf6",
        "htmlUrl": "/games/2048.html",
        "playCount": 0,
        "version": 1
      }
    ],
    "total": 1
  }
}
```

### 获取单个游戏

```
GET /api/games/:gameKey
```

响应格式：
```json
{
  "code": 0,
  "message": "success",
  "data": {
    "id": 1,
    "gameKey": "2048",
    "name": "2048",
    "description": "经典数字合并游戏",
    "icon": "🎮",
    "iconUrl": null,
    "color": "#8b5cf6",
    "htmlUrl": "/games/2048.html",
    "playCount": 0,
    "version": 1
  }
}
```

## 🎨 主要功能

### 游戏列表页面 (`app/(tabs)/index.tsx`)

- 动态加载游戏列表
- 实时搜索过滤
- 响应式网格布局
- 加载状态和错误处理
- 游戏卡片点击跳转

### 游戏详情页面 (`app/games/[id].tsx`)

- 通过 `gameKey` 动态加载游戏
- Web 平台使用 iframe 嵌入游戏
- 移动端提示仅支持 Web 平台

### 关于页面 (`app/(tabs)/explore.tsx`)

- 应用信息展示
- 技术栈说明
- GitHub 仓库链接

## 🛠️ 技术栈

### 核心框架
- **Expo SDK 54** - React Native 开发框架
- **React 19.1.0** - UI 框架
- **React Native 0.81.5** - 移动端框架
- **TypeScript 5.9.2** - 类型安全

### 路由和导航
- **Expo Router 6.0** - 基于文件系统的路由
- **React Navigation 7.1** - 导航库

### UI 和交互
- **React Native Reanimated 4.1** - 动画库
- **React Native Gesture Handler 2.28** - 手势处理
- **Expo Haptics** - 触觉反馈

### 其他功能
- **Expo Web Browser** - 浏览器功能
- **Expo Linking** - 深度链接
- **React Native WebView** - WebView 支持

## 📝 开发指南

### 添加新游戏

1. **后端添加游戏数据**
   - 在后端数据库中添加游戏记录
   - 上传游戏 HTML 文件到服务器

2. **前端自动加载**
   - 游戏列表会自动从 API 获取
   - 无需修改前端代码

### 自定义主题

编辑 `constants/theme.ts` 文件：

```typescript
export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    // ...
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    // ...
  },
};
```

### 构建生产版本

```bash
# Web 版本
npx expo export:web

# iOS 版本
npx expo build:ios

# Android 版本
npx expo build:android
```

## 🔗 相关链接

- [GitHub 仓库](https://github.com/duwuzhou/my-game-pt)
- [Expo 文档](https://docs.expo.dev/)
- [React Native 文档](https://reactnative.dev/)

## 📄 许可证

MIT License

## 👨‍💻 作者

Made with ❤️

---

**注意**: 此应用需要配合后端 API 服务使用，请确保后端服务正常运行。
