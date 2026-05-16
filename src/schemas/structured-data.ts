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
      "url": `${baseUrl}/divisorias-vidros-persianas-logo.png`, // substitua pelo caminho real
      "width": 200,
      "height": 60
    },
    "image": `${baseUrl}/logo.webp`,
    "description": "Fabricação, montagem e instalação de divisórias de vidros com persianas embutidas para escritório, sala comercial, prédios, indústria e empresas.",
    "telephone": "+55-11-XXXX-XXXX", // preencha
    "email": "contato@divisoriasvidrospersianas.com.br", // preencha
    "foundingDate": "2003", // baseado nos +21 anos do Hero
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
      "latitude": -23.6441, // confirme no Google Maps
      "longitude": -46.5284
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
      // preencha com dados reais do Google
      // "@type": "AggregateRating",
      // "ratingValue": "5",
      // "reviewCount": "187",
      // "bestRating": "5"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Divisórias de Vidro com Persiana",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Divisória de vidro duplo com persiana embutida piso teto",
            "description": "Divisória de vidro duplo com persiana embutida do piso ao teto para escritórios e salas comerciais."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Divisória de vidro junta seca com persiana embutida",
            "description": "Divisória de vidro junta seca com persiana embutida para ambientes corporativos."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Divisória de vidro acústico com persiana embutida",
            "description": "Divisória de vidro acústico com persiana embutida para isolamento sonoro em escritórios."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Divisória industrial de vidro com persiana embutida",
            "description": "Divisória industrial de vidro com persiana embutida para indústrias e galpões."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Divisória de vidro duplo com persiana automatizada",
            "description": "Divisória de vidro duplo com persiana automatizada controlada por smartphone."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Divisória de vidro com alumínio e persiana embutida",
            "description": "Divisória de vidro com perfil de alumínio e persiana embutida para projetos corporativos."
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