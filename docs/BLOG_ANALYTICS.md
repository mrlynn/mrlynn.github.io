# Blog analytics — reporting guide

This site sends blog engagement data to **Google Analytics 4** via `NEXT_PUBLIC_GA_ID` (configured in Vercel env vars).

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

## Optional: Vercel Analytics

If `@vercel/analytics` is added later, it complements GA4 with Web Vitals but does not replace CTA/read-depth events unless separately instrumented.
