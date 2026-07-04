// src/schemas/GlobalSchema.ts

// Interface estrita para validação dos dados de SEO que entram no Schema
interface PageSeoData {
  title: string;
  description: string;
  datePublished: string;
  dateModified: string;
  image?: string; // Opcional: imagem específica da página se houver
}

// Interface que define o retorno exato do Grafo unificado
export interface GlobalGraphSchema {
  "@context": "https://schema.org";
  "@graph": Record<string, any>[];
}

// Função auxiliar para transformar a URL em texto amigável (ex: "quem-somos" vira "Quem Somos")
function formatBreadcrumbName(slug: string): string {
  // Dicionário para palavras específicas mapeadas manualmente
  const customNames: Record<string, string> = {
    "contato": "Contato",
    "trabalhe-conosco": "Trabalhe Conosco",
    "quem-somos": "Quem Somos",
    "produtos": "Produtos",
    "cidades": "Cidades",
    "empresa": "Empresa",
    "orcamento": "Orçamento",
    "politica-de-privacidade": "Política de Privacidade",
    "termos-de-uso": "Termos de Uso"
  };

  if (customNames[slug.toLowerCase()]) {
    return customNames[slug.toLowerCase()];
  }

  // Fallback: substitui hífens por espaços e coloca a primeira letra em maiúscula
  return slug
    .replace(/-/g, ' ')
    .replace(/(^\w|\s\w)/g, m => m.toUpperCase());
}

// Função que gera o array de breadcrumbs automaticamente quebrando a URL atual
function generateAutomaticBreadcrumbs(currentUrl: string): { name: string; url: string }[] {
  const baseUrl = "https://divisoriasvidrospersianas.com.br";
  const breadcrumbs = [{ name: "Home", url: `${baseUrl}/` }];

  try {
    const urlObj = new URL(currentUrl);
    const pathSegments = urlObj.pathname.split('/').filter(segment => segment.length > 0);

    let accumulatedPath = "";

    pathSegments.forEach((segment) => {
      accumulatedPath += `/${segment}`;
      breadcrumbs.push({
        name: formatBreadcrumbName(segment),
        url: `${baseUrl}${accumulatedPath}/` // Garante a consistência da barra no final
      });
    });
  } catch (e) {
    // Se falhar por algum motivo de parse, retorna apenas a Home para não travar o build
  }

  return breadcrumbs;
}

// FUNÇÃO PRINCIPAL TOTALMENTE TIPADA
export function getGlobalSchema(
  currentUrl: string,
  seo: PageSeoData,
  manualBreadcrumbs?: { name: string; url: string }[]
): GlobalGraphSchema {
  const baseUrl = "https://divisoriasvidrospersianas.com.br";
  const logoUrl = `${baseUrl}/divisorias-vidros-persianas-logo.png`;
  const defaultShareImage = `${baseUrl}/divisorias-de-vidros-com-persianas.jpg`;

  // Nós que farão parte do grafo do Schema (Tipagem estrita contra erros)
  const graph: Record<string, any>[] = [
    // 1. Organização / Negócio Local
    {
      "@type": "HomeAndConstructionBusiness",
      "@id": `${baseUrl}/#organization`,
      "name": "imprimiprinter",
      "alternateName": "imprimiprinter",
      "url": baseUrl,
      "logo": {
        "@type": "ImageObject",
        "@id": `${baseUrl}/#logo`,
        "url": logoUrl,
        "width": 121,
        "height": 64
      },
      "image": defaultShareImage,
      "description": "Fabricação, montagem e instalação de divisórias de vidros com persianas embutidas para escritório, sala comercial, prédios, indústria e empresas.",
      "telephone": "+55-11-4810-5912",
      "email": "contato@divisoriasvidrospersianas.com.br",
      "foundingDate": "2003",
      "priceRange": "$$$",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Rua Vitória Pena Giorgi, 65 - Parque Marajoara",
        "addressLocality": "Santo André",
        "addressRegion": "SP",
        "postalCode": "09112-000",
        "addressCountry": "BR"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": -23.6676641,
        "longitude": -46.4951985
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          "opens": "08:00",
          "closes": "18:00"
        }
      ],
      "areaServed": {
        "@type": "AdministrativeArea",
        "name": "Estado de São Paulo"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "5",
        "reviewCount": "97",
        "bestRating": "5",
        "worstRating": "1"
      },
      "hasMerchantReturnPolicy": {
        "@type": "MerchantReturnPolicy",
        "applicableCountry": "BR",
        "returnPolicyCategory": "https://schema.org/MerchantReturnCustom",
        "merchantReturnDays": 7,
        "returnMethod": "https://schema.org/ReturnByMail",
        "returnFees": "https://schema.org/ReturnFeesCustomerResponsibility"
      }
    },

    // 2. O Site (Corrigido para forçar o Site Name na SERP)
    {
      "@type": "WebSite",
      "@id": `${baseUrl}/#website`,
      "url": baseUrl,
      "name": "imprimiprinter",
      "alternateName": ["imprimiprinter"],
      "publisher": {
        "@id": `${baseUrl}/#organization`
      }
    },

    // 3. A Página Atual
    {
      "@type": "WebPage",
      "@id": `${currentUrl.endsWith('/') ? currentUrl.slice(0, -1) : currentUrl}/#webpage`,
      "url": currentUrl,
      "name": seo.title,
      "description": seo.description,
      "inLanguage": "pt-BR",
      "datePublished": seo.datePublished,
      "dateModified": seo.dateModified,
      "image": seo.image ? seo.image : defaultShareImage,
      "isPartOf": {
        "@id": `${baseUrl}/#website`
      },
      "about": {
        "@id": `${baseUrl}/#organization`
      }
    }
  ];

  // 4. Injeção condicional dos Breadcrumbs dentro do Grafo
  const isHome = currentUrl === `${baseUrl}/` || currentUrl === baseUrl;

  if (!isHome) {
    const finalBreadcrumbs = (manualBreadcrumbs && manualBreadcrumbs.length > 0)
      ? manualBreadcrumbs
      : generateAutomaticBreadcrumbs(currentUrl);

    if (finalBreadcrumbs.length > 1) {
      const breadcrumbList = {
        "@type": "BreadcrumbList",
        "itemListElement": finalBreadcrumbs.map((item, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "name": item.name,
          "item": item.url
        }))
      };
      graph.push(breadcrumbList);
    }
  }

  // Retorna a estrutura final unificada sob o mesmo contexto
  return {
    "@context": "https://schema.org",
    "@graph": graph
  };
}