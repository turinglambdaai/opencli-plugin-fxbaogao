# opencli-plugin-fxbaogao

[English](README.md) | [中文](README.zh-CN.md)

[opencli](https://github.com/jackwener/opencli) 插件，用于 [发现报告](https://www.fxbaogao.com)（fxbaogao.com）-- 在命令行搜索、浏览和阅读行业研究报告。

## 功能特点

- **热门关键词** -- 查看 fxbaogao.com 上的热门搜索
- **搜索建议** -- 关键词自动补全
- **分类浏览** -- 按行业或机构查看报告数量分布
- **全文搜索** -- 按关键词搜索报告，支持排序
- **行业浏览** -- 按行业分类浏览报告
- **报告详情** -- 提取报告的核心观点和关键数据（需要浏览器登录）

## 安装

```bash
opencli plugin install github:jrtxio/opencli-plugin-fxbaogao
```

## 环境要求

- [opencli](https://github.com/jackwener/opencli) >= 1.0.0
- 使用 `report` 命令需要 Chrome 浏览器并已登录 fxbaogao.com

## 命令一览

| 命令 | 策略 | 浏览器 | 说明 |
|------|------|--------|------|
| `fxbaogao trending` | public | 否 | 热门搜索关键词 |
| `fxbaogao suggest --word AI` | public | 否 | 搜索建议 |
| `fxbaogao facet --type industry` | public | 否 | 行业/机构报告数量分布 |
| `fxbaogao search --keywords "AIGC"` | public | 否 | 搜索报告 |
| `fxbaogao industry --name "金融"` | public | 否 | 按行业浏览报告 |
| `fxbaogao report --docId 5364517` | cookie | 是 | 报告详情（核心观点、关键数据） |

## 使用示例

```bash
# 热门关键词
opencli fxbaogao trending

# 搜索建议
opencli fxbaogao suggest --word "新能源"

# 行业报告分布
opencli fxbaogao facet --type industry --limit 10

# 搜索报告
opencli fxbaogao search --keywords "低空经济" --limit 10
opencli fxbaogao search --keywords "AI" --order relevant

# 按行业浏览
opencli fxbaogao industry --name "医药生物" --limit 5

# 报告详情（需在 Chrome 登录 fxbaogao.com）
opencli fxbaogao report --docId 5364517

# JSON 输出
opencli fxbaogao search --keywords "AIGC" -f json
```

## 工作原理

插件使用 opencli 的 `cli()` 注册 API，每个命令定义在独立的文件中：

- `trending.js` -- 从公开 API 获取热门关键词
- `suggest.js` -- 提供关键词自动补全建议
- `facet.js` -- 获取按行业或机构的报告数量分布
- `search.js` -- 全文搜索，支持分页和排序
- `industry.js` -- 按行业分类筛选报告
- `report.js` -- 通过浏览器 Cookie 提取报告详情（需要登录）

大部分命令使用 `Strategy.PUBLIC`，直接调用 fxbaogao.com 的公开 API。`report` 命令使用 `Strategy.COOKIE` 配合无头浏览器访问登录后的报告内容。

## 许可证

本项目目前未包含许可证文件。
