# OpenCLI Plugin for fxbaogao

[opencli](https://github.com/jackwener/opencli) 插件，用于 [发现报告](https://www.fxbaogao.com)（fxbaogao.com）—— 在命令行搜索、浏览和阅读行业研究报告。

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black) [![License](https://img.shields.io/badge/license-MIT-blue)](LICENSE)

[English](README.md) · **中文**

## 功能特性

- **热门关键词** — 查看 fxbaogao.com 上的热门搜索
- **搜索建议** — 关键词自动补全
- **分类浏览** — 按行业或机构查看报告数量分布
- **全文搜索** — ⚠️ 站点 2026-08 起对匿名搜索加 VIP 墙，当前不可用（见下）
- **行业浏览** — 按行业浏览最新研报（免登录，每行业最新 4 条）
- **报告详情** — 提取报告的核心观点和关键数据（需要浏览器登录）

> **⚠️ 关于 `search` 命令（2026-10-15 实测）**：fxbaogao.com 站点改版后，
> 匿名搜索接口（`searchListNoAuth`）服务端直接返回「非VIP不能使用高级
> 搜索」，带完整浏览器请求头同样被拒；行业列表页的 SSR 数据也不再包含
> 报告列表。本插件的 `search` 命令因此暂时失效（会给出明确报错），
> `industry` 命令已改走免登录的 SEO 接口（每行业最新 4 条）。若需要
> 关键词搜索，需 VIP 登录态。

## 环境要求

| 依赖 | 用途 / 版本 |
|------|-------------|
| [opencli](https://github.com/jackwener/opencli) | >= 1.0.0 |
| Chrome | 已登录 fxbaogao.com 的会话（用于 `report` 命令） |

## 快速开始

### 1. 克隆

```bash
git clone https://github.com/turinglambdaai/opencli-plugin-fxbaogao.git
cd opencli-plugin-fxbaogao
```

### 2. 安装

```bash
opencli plugin install github:turinglambdaai/opencli-plugin-fxbaogao
```

## 命令一览

| 命令 | 策略 | 浏览器 | 说明 |
|------|------|--------|------|
| `fxbaogao trending` | public | 否 | 热门搜索关键词 |
| `fxbaogao suggest --word AI` | public | 否 | 搜索建议 |
| `fxbaogao facet --type industry` | public | 否 | 行业/机构报告数量分布 |
| `fxbaogao search --keywords "AIGC"` | public | 否 | 搜索报告（⚠️ VIP 墙，见上） |
| `fxbaogao industry --name "交运设备"` | public | 否 | 按行业浏览最新研报 |
| `fxbaogao report --docId 5364517` | cookie | 是 | 报告详情（核心观点、关键数据） |

## 使用示例

```bash
# 热门关键词
opencli fxbaogao trending

# 搜索建议
opencli fxbaogao suggest --word "新能源"

# 行业报告分布
opencli fxbaogao facet --type industry --limit 10

# 搜索报告（2026-08 起被 VIP 墙拦截，会报错提示）
opencli fxbaogao search --keywords "低空经济" --limit 10

# 按行业浏览最新研报（免登录）
opencli fxbaogao industry --name "交运设备" --limit 5

# 报告详情（需在 Chrome 登录 fxbaogao.com）
opencli fxbaogao report --docId 5364517

# JSON 输出
opencli fxbaogao search --keywords "AIGC" -f json
```

## 工作原理

插件使用 opencli 的 `cli()` 注册 API，每个命令定义在独立的文件中：

- `trending.js` —— 从公开 API 获取热门关键词
- `suggest.js` —— 提供关键词自动补全建议
- `facet.js` —— 获取按行业或机构的报告数量分布
- `search.js` —— 全文搜索（站点已加 VIP 墙，命令保留但会报明确错误）
- `industry.js` —— 调免登录 SEO 接口，按行业返回最新研报
- `report.js` —— 通过浏览器 Cookie 提取报告详情（需要登录）

大部分命令使用 `Strategy.PUBLIC`，直接调用 fxbaogao.com 的公开 API。`report` 命令使用 `Strategy.COOKIE` 配合无头浏览器访问登录后的报告内容。

## 项目结构

```
opencli-plugin-fxbaogao/
├── opencli-plugin.json   # 插件清单
├── package.json          # npm 包元信息
├── trending.js           # 热门关键词命令
├── suggest.js            # 搜索建议命令
├── facet.js              # 按行业/机构的报告分布
├── search.js             # 全文搜索命令
├── industry.js           # 按行业浏览命令
└── report.js             # 报告详情命令（cookie 策略）
```

## 许可证

基于 [MIT 许可证](LICENSE) 授权。
