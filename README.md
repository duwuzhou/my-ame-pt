# My Game PT - 小游戏合集

一个基于 Expo React Native 的小游戏合集应用，支持 Web 平台。

## 游戏列表

- **2048** - 经典数字合并游戏，滑动合并相同数字，挑战2048
- **跳跃前进** - 躲避障碍物，跑得更远的跑酷游戏

## 快速开始

1. 安装依赖

   ```bash
   npm install
   ```

2. 启动应用

   ```bash
   npx expo start
   ```

3. 在浏览器中打开 Web 版本，按 `w` 键

## 项目结构

```
my-game-pt/
├── app/                    # 应用页面
│   ├── (tabs)/            # Tab 导航页面
│   │   ├── index.tsx      # 主页 - 游戏卡片列表
│   │   └── explore.tsx    # 关于页面
│   └── games/
│       └── [id].tsx       # 游戏详情页
├── public/
│   └── html/              # 游戏 HTML 文件
│       ├── 2048.html
│       └── tiaoyue.html
└── assets/                # 静态资源
```

## 添加新游戏

1. 将游戏 HTML 文件放入 `public/html/` 目录
2. 在 `app/(tabs)/index.tsx` 的 `GAMES` 数组中添加游戏配置
3. 在 `app/games/[id].tsx` 的 `GAMES` 对象中添加对应配置

## 技术栈

- Expo / React Native
- Expo Router (文件路由)
- TypeScript
