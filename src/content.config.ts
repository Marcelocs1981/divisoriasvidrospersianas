// src/content.config.ts
import { defineCollection } from 'astro:content';
import { z } from 'zod';
import { glob } from 'astro/loaders';

export const collections = {
    'desenhos': defineCollection({
        loader: glob({ pattern: '**/*.json', base: './src/content/desenhos' }),
        schema: z.union([z.array(z.any()), z.record(z.any())]).transform((valores, ctx) => {
            // Se for um objeto aninhado (como o novo animais.json), retornamos ele diretamente
            if (!Array.isArray(valores)) {
                return valores;
            }

            // 1. FILTRO: Ignora comentários (`_info`) e itens sem "id"
            const apenasDesenhosReais = valores.filter(item => item && ('id' in item) && !('_info' in item));

            // 2. SCHEMA RÍGIDO (Atualizado para subcategorias como array)
            const desenhoSchema = z.object({
                id: z.string(),
                titulo: z.string(),
                seoTitle: z.string().optional(),
                categoria: z.string(),
                // CORREÇÃO: Agora é um array de strings
                subcategorias: z.array(z.string()),
                nicho: z.string(),
                imagemPreview: z.string()
            });

            // 3. Validação
            const resultado = z.array(desenhoSchema).safeParse(apenasDesenhosReais);

            if (!resultado.success) {
                resultado.error.issues.forEach((issue) => {
                    ctx.addIssue({
                        code: 'custom',
                        message: `Erro no JSON em ${issue.path.join('.')}: ${issue.message}`,
                        path: issue.path
                    });
                });
                return z.NEVER;
            }

            return resultado.data;
        })
    })
};