const BASE = 'https://www.duckbookwriters.com';

type BreadcrumbItem = { name: string; url: string };

export function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${BASE}${item.url}`,
    })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

export function OrganizationJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Duck Book Writers',
    url: BASE,
    logo: `${BASE}/images/duck-logo-final.png`,
    foundingDate: '2018',
    description:
      'Full-service book publishing house offering ghostwriting, editing, cover design, global distribution, and Book-to-Video services for authors worldwide.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Richmond',
      addressRegion: 'TX',
      addressCountry: 'US',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-346-463-7721',
      contactType: 'customer service',
      email: 'contact@duckbookwriters.com',
    },
    sameAs: [
      'https://www.trustpilot.com',
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

export function WebSiteJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Duck Book Writers',
    url: BASE,
    potentialAction: {
      '@type': 'SearchAction',
      target: { '@type': 'EntryPoint', urlTemplate: `${BASE}/books?q={search_term_string}` },
      'query-input': 'required name=search_term_string',
    },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

export function ServiceJsonLd({ name, description, url }: { name: string; description: string; url: string }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    url: `${BASE}${url}`,
    provider: {
      '@type': 'Organization',
      name: 'Duck Book Writers',
      url: BASE,
    },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

type PersonData = { name: string; description: string; genre?: string };

export function PersonJsonLd({ people }: { people: PersonData[] }) {
  const schemas = people.map((p) => ({
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: p.name,
    description: p.description,
    ...(p.genre ? { knowsAbout: p.genre } : {}),
    worksFor: { '@type': 'Organization', name: 'Duck Book Writers', url: BASE },
  }));
  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}
    </>
  );
}
