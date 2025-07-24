import Head from "next/head"

export default function SEOHead({ title, description, image, url, article = null, schema = null }) {
  const siteUrl = "https://webitya.com"
  const fullUrl = url ? `${siteUrl}${url}` : siteUrl
  const fullImageUrl = image
    ? `${siteUrl}${image}`
    : `${siteUrl}/placeholder.svg?height=630&width=1200&text=Webitya+Blog`

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content={article ? "article" : "website"} />
      <meta property="og:site_name" content="Webitya Blog" />

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />
      <meta name="twitter:site" content="@webitya" />

      {/* Article-specific meta tags */}
      {article && (
        <>
          <meta property="article:published_time" content={article.publishDate} />
          <meta property="article:modified_time" content={article.updatedDate} />
          <meta property="article:author" content={article.author} />
          <meta property="article:section" content={article.category} />
          {article.tags.map((tag) => (
            <meta key={tag} property="article:tag" content={tag} />
          ))}
        </>
      )}

      {/* Schema.org JSON-LD */}
      {schema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />}

      {/* Additional SEO tags */}
      <meta name="robots" content="index, follow" />
      <meta name="author" content="Webitya" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
    </Head>
  )
}
