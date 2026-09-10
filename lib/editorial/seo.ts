import { editorialMedia, type EditorialArticle } from './catalog.ts';

export function editorialStructuredData(article: EditorialArticle, origin: string) {
  const url = `${origin}/oeil-vegetal/${article.slug}`;
  const image = editorialMedia(article);
  return {
    '@context': 'https://schema.org', '@graph': [
      { '@type': 'Article', '@id': `${url}#article`, url, headline: article.title,
        description: article.seo.description, inLanguage: 'fr-FR', articleSection: article.category,
        datePublished: article.publishedAt, dateModified: article.updatedAt,
        mainEntityOfPage: { '@type': 'WebPage', '@id': url },
        author: { '@type': 'Organization', name: article.author, url: origin },
        publisher: { '@type': 'Organization', name: 'TIBALDO Jungle', url: origin },
        ...(image ? { image: { '@type': 'ImageObject', url: `${origin}${image.src}`, width: image.width, height: image.height, caption: article.heroMedia.context, creditText: `Photo : ${image.license?.creator}` } } : {}),
        citation: article.sources.map(s => s.url),
        about: [{ '@type': 'Thing', name: 'Panachure' }, { '@type': 'Thing', name: 'Monstera deliciosa' }],
      },
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Jungle', item: origin },
        { '@type': 'ListItem', position: 2, name: 'L’Œil végétal', item: `${origin}/oeil-vegetal` },
        { '@type': 'ListItem', position: 3, name: article.title, item: url },
      ] },
    ],
  };
}
