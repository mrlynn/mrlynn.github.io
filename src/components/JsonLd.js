/**
 * Renders a JSON-LD graph into the page.
 *
 * Server component on purpose — this is markup for crawlers, so it has to be in
 * the HTML the server sends, not injected after hydration.
 *
 * The `<` escape is what keeps a post body containing `</script>` from closing
 * this tag early and turning the rest of the payload into live markup. The
 * previous inline JSON-LD in BlogLayout stringified straight into
 * dangerouslySetInnerHTML without it.
 */
export default function JsonLd({ data }) {
  if (!data) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, '\\u003c'),
      }}
    />
  );
}
