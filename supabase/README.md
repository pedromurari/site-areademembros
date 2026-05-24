Use estes arquivos no SQL Editor do Supabase, nesta ordem:

1. `001_portal_schema.sql`
2. `002_portal_seed.sql`

Depois disso, o portal passa a ler do Supabase as tabelas:

- `courses`
- `modules`
- `lessons`
- `banners`
- `live_classes`
- `certificates`
- `certificate_rules`

Observacoes:

- `profiles` ja existe no projeto atual, entao o schema so adiciona colunas faltantes.
- enquanto as tabelas nao existirem, o app continua funcionando em modo `fallback`.
- assim que o schema for aplicado, as telas do aluno e do admin trocam automaticamente para leitura real do banco.
