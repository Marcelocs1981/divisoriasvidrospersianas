// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

// https://astro.build/config
export default defineConfig({
  site: 'https://divisoriasvidrospersianas.com.br',
  output: 'static',

  // MELHORIA SEO 1: Força o ecossistema estático a manter o padrão de barras inclinadas (Trailing Slash)
  trailingSlash: 'always',

  // 1. DESATIVAR O AUTO OTIMIZADOR DE IMAGENS DO ASTRO (Mantém seu TinyPNG perfeito)
  image: {
    service: {
      entrypoint: 'astro/assets/services/noop'
    }
  },

  // 2. Configurações de sitemap
  integrations: [
    sitemap({
      // 1. Filtra as páginas e pasta de teste cores que você não quer no sitemap
      filter: (page) => !page.includes('/cores/'),

      // 2. ADICIONA A FUNÇÃO LASTMOD PARA ATUALIZAR A DATA DE MODIFICAÇÃO
      serialize(item) {
        try {
          // Converte rota em caminho de arquivo plausível
          const route = item.url ? new URL(item.url).pathname : '/';
          const clean = route.replace(/^\/+|\/+$/g, '');
          const candidates = [];
          if (!clean) {
            candidates.push(path.join('src', 'pages', 'index.astro'));
          } else {
            candidates.push(path.join('src', 'pages', `${clean}.astro`));
            candidates.push(path.join('src', 'pages', clean, 'index.astro'));
          }

          let lastmod = null;
          for (const candidate of candidates) {
            if (fs.existsSync(candidate)) {
              const stat = fs.statSync(candidate);
              const mtime = stat.mtime.toISOString();
              // try git date
              try {
                const gitOut = execSync(`git log -1 --format=%cI -- "${candidate}"`, { stdio: ['ignore', 'pipe', 'ignore'] });
                const gitDate = gitOut.toString().trim();
                lastmod = gitDate || mtime;
                break;
              } catch {
                lastmod = mtime;
                break;
              }
            }
          }

          item.lastmod = lastmod || new Date().toISOString();
        } catch (e) {
          item.lastmod = new Date().toISOString();
        }

        return item;
      },
    })
  ],

  build: {
    inlineStylesheets: 'always', // Garante CSS inline
    concurrency: 4,
    // MELHORIA SEO 2: Garante a criação física da estrutura de pastas/index.html para bater com o trailingSlash
    format: 'directory'
  }
});