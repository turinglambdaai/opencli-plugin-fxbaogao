import { cli, Strategy } from '@jackwener/opencli/registry';
import { CliError } from '@jackwener/opencli/errors';

cli({
  site: 'fxbaogao',
  name: 'industry',
  description: '按行业浏览发现报告（各行业最新 4 条，免登录）',
  domain: 'api.fxbaogao.com',
  strategy: Strategy.PUBLIC,
  browser: false,
  args: [
    { name: 'name', type: 'string', default: '信息技术', help: '行业名称（如 信息技术、金融、交运设备）' },
    { name: 'limit', type: 'int', default: 10, help: '返回数量 (max 20)' },
  ],
  columns: ['docId', 'title', 'orgName', 'industryName', 'pubDate'],
  func: async (_page, args) => {
    const industry = String(args.name ?? '信息技术').trim();
    if (!industry) throw new CliError('INVALID_ARGUMENT', 'name (industry) is required');
    const limit = Math.max(1, Math.min(Number(args.limit) || 10, 20));

    // 2026-08 site rework: the /archives/industry SSR payload no longer
    // carries the report list (dataList empty, list loads client-side
    // behind the VIP search wall).  The anonymous SEO endpoint is the
    // one remaining public per-industry list — latest 4 reports each.
    const url = `https://api.fxbaogao.com/mofoun/seo/seoApiV3/listHomeIndustryReports?industry=${encodeURIComponent(industry)}`;

    const resp = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    if (!resp.ok) throw new CliError('HTTP_ERROR', `industry failed: HTTP ${resp.status}`);
    const json = await resp.json();
    if (json.code !== 0) throw new CliError('API_ERROR', `industry API error: ${json.msg}`);

    const reports = Array.isArray(json.data) ? json.data : [];
    if (reports.length === 0) throw new CliError('NO_DATA', `No reports found for industry "${industry}"`);

    return reports.slice(0, limit).map((r) => ({
      docId: r.docId,
      title: r.title,
      orgName: r.orgName ?? '',
      industryName: industry,
      pubDate: r.pubTimeStr?.replace(/\/+$/, '') ?? '',
    }));
  },
});
