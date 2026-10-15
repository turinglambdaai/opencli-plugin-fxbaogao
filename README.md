# OpenCLI Plugin for fxbaogao

An [opencli](https://github.com/jackwener/opencli) plugin for [fxbaogao.com](https://www.fxbaogao.com) (Found Report) — search, browse, and read industry research reports from the command line.

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black) [![License](https://img.shields.io/badge/license-MIT-blue)](LICENSE)

**English** · [中文](README.zh-CN.md)

## Features

- **Trending keywords** — see what's popular on fxbaogao.com
- **Search suggestions** — autocomplete search terms
- **Faceted browsing** — view report counts by industry or organization
- **Full-text search** — ⚠️ blocked since the site's 2026-08 rework added a VIP wall on anonymous search (see below)
- **Industry browsing** — browse the latest reports per industry (anonymous, latest 4 each)
- **Report details** — extract key insights and data from individual reports (requires browser login)

> **⚠️ About the `search` command (verified 2026-10-15)**: after the site
> rework, the anonymous search endpoint (`searchListNoAuth`) rejects
> unauthenticated requests server-side with「非VIP不能使用高级搜索」
> ("advanced search requires VIP") — full browser headers make no
> difference, and the industry archive pages no longer embed the report
> list in their SSR payload either. `search` is therefore dead for now
> (it fails with a clear error message); `industry` has been rewired to
> the anonymous SEO endpoint (latest 4 reports per industry). Keyword
> search now requires a VIP login.

## Requirements

| Dependency | Purpose / Version |
|------------|-------------------|
| [opencli](https://github.com/jackwener/opencli) | >= 1.0.0 |
| Chrome | Active fxbaogao.com login session (for the `report` command) |

## Quick Start

### 1. Clone

```bash
git clone https://github.com/turinglambdaai/opencli-plugin-fxbaogao.git
cd opencli-plugin-fxbaogao
```

### 2. Install

```bash
opencli plugin install github:turinglambdaai/opencli-plugin-fxbaogao
```

## Commands

| Command | Strategy | Browser | Description |
|---------|----------|---------|-------------|
| `fxbaogao trending` | public | No | Trending search keywords |
| `fxbaogao suggest --word AI` | public | No | Search suggestions |
| `fxbaogao facet --type industry` | public | No | Report count by industry/organization |
| `fxbaogao search --keywords "AIGC"` | public | No | Search reports (⚠️ VIP-walled, see above) |
| `fxbaogao industry --name "交运设备"` | public | No | Browse latest reports per industry |
| `fxbaogao report --docId 5364517` | cookie | Yes | Report details (key insights, data) |

## Usage

```bash
# Trending keywords
opencli fxbaogao trending

# Search suggestions
opencli fxbaogao suggest --word "new energy"

# Report distribution by industry
opencli fxbaogao facet --type industry --limit 10

# Search reports (VIP-walled since ~2026-08; fails with a clear error)
opencli fxbaogao search --keywords "low-altitude economy" --limit 10

# Browse latest reports per industry (anonymous)
opencli fxbaogao industry --name "交运设备" --limit 5

# Report details (requires Chrome login to fxbaogao.com)
opencli fxbaogao report --docId 5364517

# JSON output
opencli fxbaogao search --keywords "AIGC" -f json
```

## How It Works

The plugin uses opencli's `cli()` registration API. Each command is defined in a separate file:

- `trending.js` — fetches popular keywords from the public API
- `suggest.js` — provides keyword autocomplete suggestions
- `facet.js` — retrieves report distribution by industry or organization
- `search.js` — full-text search (VIP-walled upstream; kept for the clear error message)
- `industry.js` — calls the anonymous SEO endpoint for per-industry latest reports
- `report.js` — extracts report details using browser cookies (requires login)

Most commands use `Strategy.PUBLIC` and call the fxbaogao.com public API directly. The `report` command uses `Strategy.COOKIE` with a headless browser to access report content behind login.

## Project Structure

```
opencli-plugin-fxbaogao/
├── opencli-plugin.json   # Plugin manifest
├── package.json          # npm package metadata
├── trending.js           # Trending keywords command
├── suggest.js            # Search suggestions command
├── facet.js              # Report distribution by industry/organization
├── search.js             # Full-text search command
├── industry.js           # Browse by industry command
└── report.js             # Report details command (cookie strategy)
```

## License

Licensed under the [MIT License](LICENSE).
