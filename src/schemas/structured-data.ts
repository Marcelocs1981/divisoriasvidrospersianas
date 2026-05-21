export function getStructuredData(url: string) {
  const baseUrl = "https://www.divisoriasvidrospersianas.com.br";

  const organization = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
    "@id": `${baseUrl}/#organization`,
    "name": "Divisórias de Vidros com Persianas",
    "url": baseUrl,
    "logo": {
      "@type": "ImageObject",
      "url": `${baseUrl}/divisorias-vidros-persianas-logo.png`,
      "width": 200,
      "height": 60
    },
    "image": `${baseUrl}/logo.webp`,
    "description": "Fabricação, montagem e instalação de divisórias de vidros com persianas embutidas para escritório, sala comercial, prédios, indústria e empresas.",
    "telephone": "+55-11-4810-5912",
    "email": "contato@divisoriasvidrospersianas.com.br",
    "foundingDate": "2003",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Rua Vitória Pena Giorgi, 65",
      "addressLocality": "Santo André",
      "addressRegion": "SP",
      "postalCode": "09112-000",
      "addressCountry": "BR",
      "addressArea": "Parque Marajoara"
    },
    "geo": {
     "@type": "GeoCoordinates",
     "latitude": -23.6676641,
     "longitude": -46.4951985
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday"
        ],
        "opens": "08:00",
        "closes": "18:00"
      }
    ],
    "sameAs": [
      // "https://www.instagram.com/XXXX",
      // "https://www.facebook.com/XXXX",
      // "https://wa.me/55119XXXXXXXX"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
       "ratingValue": "5",
       "reviewCount": "587",
       "bestRating": "5"
    },
    "hasOfferCatalog": {
  "@type": "OfferCatalog",
  "name": "Divisórias de Vidro com Persiana",
  "itemListElement": [
    {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": "Divisória de vidro duplo com persiana embutida do piso até o teto",
        "description": "Controle preciso por cordão interno entre os vidros. Robusto, silencioso e atemporal."
      }
    },
    {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": "Divisória de vidro junta seca com persiana embutida",
        "description": "Menos alumínio e mais elegância com vidros em juntas postas."
      }
    },
    {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": "Divisória de vidro acústico com persiana embutida",
        "description": "Divisórias privativas para reuniões sigilosas."
      }
    },
    {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": "Divisória industrial de vidro com persiana embutida",
        "description": "Pensada e desenvolvida especialmente para divisão de ambiente industrial."
      }
    },
    {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": "Divisória de vidro com persiana automatizada",
        "description": "Botão é coisa do passado, crie vários cenários e tenha o controle total das persianas integradas automáticas por comando de voz ou em seu smartphone."
      }
    },
    {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": "Divisória em vidro com alumínio e persiana embutida",
        "description": "Estética moderna com estrutura marcante."
      }
    }
  ]
}
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${baseUrl}/#website`,
    "url": baseUrl,
    "name": "Divisórias de Vidros com Persianas",
    "publisher": {
      "@id": `${baseUrl}/#organization`
    }
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": baseUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Empresa",
        "item": `${baseUrl}/empresa`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Produtos",
        "item": `${baseUrl}/produtos`
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": "Contato",
        "item": `${baseUrl}/contato`
      }
    ]
  };

  return [organization, website, breadcrumb];
}