# Blog analytics — reporting guide

This site uses two analytics layers:

1. **Vercel Web Analytics** — page views, visitors, referrers, countries (Vercel dashboard)
2. **Google Analytics 4** — custom blog events (CTA clicks, scroll depth, PDF downloads)

## Vercel Web Analytics

Enabled via `@vercel/analytics` in [`src/app/layout.js`](../src/app/layout.js).

**View reports:** [Vercel Dashboard](https://vercel.com) → your project → **Analytics**

After deploy, page views appear automatically. No env var required when Analytics is enabled on the project in Vercel.

**Verify locally:** In Network tab, look for a request to `/_vercel/insights/view` when navigating (production/preview deploys; local dev may not send data).

**Cursor misconceptions post:** filter or search for `/blog/cursor-misconceptions` in the Vercel Analytics pages panel.

Vercel covers traffic summaries. It does **not** replace GA4 for custom events (`blog_cta_click`, `blog_pdf_download`, etc.) unless you add [Vercel custom events](https://vercel.com/docs/analytics/custom-events) separately.

---

## Google Analytics 4

Configured via `NEXT_PUBLIC_GA_ID` (Vercel env vars).

## Events fired on every blog post

| Event | When | Key parameters |
| --- | --- | --- |
| `blog_post_view` | Page load | `content_id` (slug), `content_title`, `page_path` |
| `blog_scroll_depth` | Reader hits 25/50/75/90/100% scroll | `scroll_depth`, `content_id` |
| `blog_read_complete` | 75%+ scroll AND 45+ seconds on page | `time_on_page_seconds`, `scroll_depth` |
| `blog_cta_click` | Any `<BlogCTA>` button click | `cta_id`, `cta_label`, `cta_href`, `cta_destination` |
| `blog_pdf_download` | PDF one-pager download click | `cta_id`, `file_name` |

External CTA links include UTM params: `utm_source=mlynn&utm_medium=blog&utm_campaign={slug}&utm_content={cta_id}`.

## GA4: views for this article

1. Open [Google Analytics](https://analytics.google.com) → **Reports** → **Engagement** → **Pages and screens**
2. Filter or search: `/blog/cursor-misconceptions`
3. Metrics: Views, Users, Average engagement time

## GA4: custom events (CTA clicks, read completion)

1. **Explore** → **Blank** (or Free form)
2. Dimensions: `Event name`, `content_id`, `cta_id`, `cta_label`
3. Metrics: `Event count`, `Total users`
4. Filter: `Event name` exactly matches `blog_cta_click` OR `blog_read_complete`

### Suggested explorations

**CTA performance for one post**

- Filter: `content_id` = `cursor-misconceptions`, `Event name` = `blog_cta_click`
- Break down by: `cta_id`
- Answer: which CTA drove the most clicks?

**Estimated “finished reading”**

- Filter: `Event name` = `blog_read_complete`, `content_id` = `cursor-misconceptions`
- Compare `blog_read_complete` users vs `blog_post_view` users → rough completion rate

**Scroll funnel**

- Filter: `Event name` = `blog_scroll_depth`, `content_id` = `cursor-misconceptions`
- Break down by: `scroll_depth` (25 → 100)
- Answer: where do readers drop off?

## Register custom dimensions (one-time GA4 setup)

In GA4 → **Admin** → **Custom definitions** → **Create custom dimensions**:

| Dimension name | Event parameter |
| --- | --- |
| Content ID | `content_id` |
| CTA ID | `cta_id` |
| Scroll depth | `scroll_depth` |

Without this step, parameters still appear in **Realtime** and **Explorations** but may be limited in standard reports.

## Realtime check after deploy

1. GA4 → **Reports** → **Realtime**
2. Open `https://mlynn.org/blog/cursor-misconceptions` in a private window
3. Confirm `blog_post_view` appears
4. Scroll and click a CTA — confirm `blog_scroll_depth` and `blog_cta_click`

## Optional: Vercel Analytics vs GA4

| Question | Use Vercel Analytics | Use GA4 |
| --- | --- | --- |
| How many people visited the post? | Yes | Yes |
| Where did traffic come from? | Yes | Yes |
| Which CTA button was clicked? | No (unless custom events added) | Yes |
| Scroll depth / read completion? | No | Yes |
| PDF download count? | No | Yes |

Both run in parallel — no conflict.
