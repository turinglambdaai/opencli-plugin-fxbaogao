# opencli-plugin-fxbaogao

[English](README.md) | [中文](README.zh-CN.md)

An [opencli](https://github.com/jackwener/opencli) plugin for [fxbaogao.com](https://www.fxbaogao.com) (Found Report) -- search, browse, and read industry research reports from the command line.

## Features

- **Trending keywords** -- see what's popular on fxbaogao.com
- **Search suggestions** -- autocomplete search terms
- **Faceted browsing** -- view report counts by industry or organization
- **Full-text search** -- find reports by keywords with sorting options
- **Industry browsing** -- browse reports by industry category
- **Report details** -- extract key insights and data from individual reports (requires browser login)

## Install

```bash
opencli plugin install github:jrtxio/opencli-plugin-fxbaogao
```

## Requirements

- [opencli](https://github.com/jackwener/opencli) >= 1.0.0
- For `report` command: Chrome with an active fxbaogao.com login session

## Commands

| Command | Strategy | Browser | Description |
|---------|----------|---------|-------------|
| `fxbaogao trending` | public | No | Trending search keywords |
| `fxbaogao suggest --word AI` | public | No | Search suggestions |
| `fxbaogao facet --type industry` | public | No | Report count by industry/organization |
| `fxbaogao search --keywords "AIGC"` | public | No | Search reports |
| `fxbaogao industry --name "finance"` | public | No | Browse reports by industry |
| `fxbaogao report --docId 5364517` | cookie | Yes | Report details (key insights, data) |

## Usage

```bash
# Trending keywords
opencli fxbaogao trending

# Search suggestions
opencli fxbaogao suggest --word "new energy"

# Report distribution by industry
opencli fxbaogao facet --type industry --limit 10

# Search reports
opencli fxbaogao search --keywords "low-altitude economy" --limit 10
opencli fxbaogao search --keywords "AI" --order relevant

# Browse by industry
opencli fxbaogao industry --name "pharma" --limit 5

# Report details (requires Chrome login to fxbaogao.com)
opencli fxbaogao report --docId 5364517

# JSON output
opencli fxbaogao search --keywords "AIGC" -f json
```

## How It Works

The plugin uses opencli's `cli()` registration API. Each command is defined in a separate file:

- `trending.js` -- fetches popular keywords from the public API
- `suggest.js` -- provides keyword autocomplete suggestions
- `facet.js` -- retrieves report distribution by industry or organization
- `search.js` -- full-text search with pagination and sorting
- `industry.js` -- filters reports by industry category
- `report.js` -- extracts report details using browser cookies (requires login)

Most commands use `Strategy.PUBLIC` and call the fxbaogao.com public API directly. The `report` command uses `Strategy.COOKIE` with a headless browser to access report content behind login.

## License

This project does not currently include a license file.
