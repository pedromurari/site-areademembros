insert into public.courses (
  slug,
  title,
  progress,
  meta_label,
  summary,
  badge,
  hero_eyebrow,
  hero_title,
  hero_description,
  certificate_slug,
  sort_order
)
values
  (
    'formacao-psicanalise-clinica-integrativa',
    'Formacao em Psicanalise Clinica Integrativa',
    0,
    'Alunos ativos',
    'Acesso a aulas gravadas, biblioteca digital, materiais e trilhas avancadas.',
    'Principal',
    'Formacao completa do IDM',
    'Portal do Aluno',
    'Acompanhe suas aulas, materiais, certificados e proximos encontros em um so lugar.',
    null,
    1
  ),
  (
    'psicanalise-integrativa-gratuita-36',
    'Psicanalise Integrativa Gratuita #36',
    100,
    'Campanha gratuita',
    'Jornada de 3 dias com bonus do fundador e retirada de certificado dentro do portal.',
    'Turma #36',
    'Curso gratuito de 3 dias',
    'Psicanalise Integrativa #36',
    'Assista as 3 aulas da jornada gratuita, desbloqueie o bonus do fundador e retire seu certificado.',
    'psicanalise-integrativa-gratuita-36',
    2
  )
on conflict (slug) do update
set
  title = excluded.title,
  progress = excluded.progress,
  meta_label = excluded.meta_label,
  summary = excluded.summary,
  badge = excluded.badge,
  hero_eyebrow = excluded.hero_eyebrow,
  hero_title = excluded.hero_title,
  hero_description = excluded.hero_description,
  certificate_slug = excluded.certificate_slug,
  sort_order = excluded.sort_order;

with course_refs as (
  select id, slug from public.courses
)
insert into public.modules (course_id, slug, title, sort_order)
values
  ((select id from course_refs where slug = 'formacao-psicanalise-clinica-integrativa'), 'modulo-1', 'Modulo 1 - Introducao a Psicanalise Clinica Integrativa', 1),
  ((select id from course_refs where slug = 'formacao-psicanalise-clinica-integrativa'), 'modulo-2', 'Modulo 2 - Teorias do Aparelho Psiquico', 2),
  ((select id from course_refs where slug = 'formacao-psicanalise-clinica-integrativa'), 'biblioteca-1', 'Biblioteca Digital', 3),
  ((select id from course_refs where slug = 'formacao-psicanalise-clinica-integrativa'), 'biblioteca-2', 'Biblioteca Digital 2', 4),
  ((select id from course_refs where slug = 'psicanalise-integrativa-gratuita-36'), 'dia-1', 'Modulo 1 - Abertura da Jornada', 1),
  ((select id from course_refs where slug = 'psicanalise-integrativa-gratuita-36'), 'dia-2', 'Modulo 2 - Estrutura Emocional', 2),
  ((select id from course_refs where slug = 'psicanalise-integrativa-gratuita-36'), 'dia-3', 'Modulo 3 - Integracao Final', 3),
  ((select id from course_refs where slug = 'psicanalise-integrativa-gratuita-36'), 'bonus-fundador', 'Bonus do Fundador', 4)
on conflict (slug) do update
set
  title = excluded.title,
  sort_order = excluded.sort_order;

with module_refs as (
  select id, slug from public.modules
)
insert into public.lessons (module_id, slug, title, kind, duration, provider, sort_order)
values
  ((select id from module_refs where slug = 'modulo-1'), 'aula-1-introducao', 'Aula 1 - Introducao a Psicanalise Clinica Integrativa', 'video', '42 min', 'Panda Video', 1),
  ((select id from module_refs where slug = 'modulo-2'), 'aula-2-aparelho-psiquico', 'Aula 2 - Teorias do Aparelho Psiquico', 'video', '38 min', 'Panda Video', 1),
  ((select id from module_refs where slug = 'biblioteca-1'), 'biblioteca-digital', 'Biblioteca Digital', 'material', 'Arquivos', 'Interno', 1),
  ((select id from module_refs where slug = 'biblioteca-2'), 'biblioteca-digital-2', 'Biblioteca Digital 2', 'material', 'Arquivos', 'Interno', 1),
  ((select id from module_refs where slug = 'dia-1'), 'dia-1-fundamentos', 'Dia 01 - Fundamentos da Psicanalise Integrativa', 'video', '54 min', 'YouTube', 1),
  ((select id from module_refs where slug = 'dia-2'), 'dia-2-estrutura-emocional', 'Dia 02 - Estrutura emocional e leitura clinica', 'video', '49 min', 'YouTube', 1),
  ((select id from module_refs where slug = 'dia-3'), 'dia-3-integracao-final', 'Dia 03 - Integracao, aplicacao e chamada para proximo passo', 'video', '61 min', 'YouTube', 1),
  ((select id from module_refs where slug = 'bonus-fundador'), 'bonus-fundador', 'Aula bonus do fundador', 'bonus', '32 min', 'YouTube', 1)
on conflict (slug) do update
set
  title = excluded.title,
  kind = excluded.kind,
  duration = excluded.duration,
  provider = excluded.provider,
  sort_order = excluded.sort_order;

insert into public.banners (title, placement, audience, status, sort_order)
values
  ('Banner principal da home do aluno', 'Topo do portal', 'Todos os alunos', 'Publicado', 1),
  ('Campanha Psicanalise Integrativa #36', 'Curso gratuito', 'Turma #36', 'Publicado', 2),
  ('Chamada para formacao completa', 'Apos a aula bonus', 'Leads do gratuito', 'Rascunho', 3)
on conflict do nothing;

insert into public.live_classes (title, datetime_label, status, audience, sort_order)
values
  ('Plantao de duvidas da turma #36', '27/05/2026 - 20h00', 'Agendada', 'Curso gratuito de Psicanalise Integrativa', 1),
  ('Encontro de aprofundamento clinico', '31/05/2026 - 19h30', 'Em breve', 'Formacao em Psicanalise Clinica Integrativa', 2)
on conflict do nothing;

insert into public.certificate_rules (
  slug,
  title,
  course_title,
  turma,
  hours,
  minimum_lessons,
  bonus_included,
  signatory_name,
  signatory_role,
  delivery_message,
  release_window,
  is_active
)
values
  (
    'psicanalise-integrativa-gratuita-36',
    'Certificado de Participacao',
    'Psicanalise Integrativa',
    '#36',
    '12 horas',
    3,
    true,
    'Rodrygo Murari',
    'Fundador do Instituto Despertamente',
    'Seu certificado ja esta liberado para retirada aqui no portal do aluno, com validacao e download em PDF.',
    'Liberado apos a conclusao dos 3 dias e da aula bonus do fundador.',
    true
  )
on conflict (slug) do update
set
  title = excluded.title,
  course_title = excluded.course_title,
  turma = excluded.turma,
  hours = excluded.hours,
  minimum_lessons = excluded.minimum_lessons,
  bonus_included = excluded.bonus_included,
  signatory_name = excluded.signatory_name,
  signatory_role = excluded.signatory_role,
  delivery_message = excluded.delivery_message,
  release_window = excluded.release_window,
  is_active = excluded.is_active;

insert into public.certificates (
  slug,
  title,
  course_title,
  turma,
  duration_label,
  hours,
  minimum_lessons,
  completed_lessons,
  bonus_included,
  bonus_completed,
  is_available,
  issue_date,
  code,
  student_name,
  student_email,
  signatory_name,
  signatory_role,
  description,
  delivery_message,
  release_window,
  lessons
)
values
  (
    'psicanalise-integrativa-gratuita-36',
    'Certificado de Participacao',
    'Psicanalise Integrativa',
    '#36',
    'Curso gratuito de 3 dias',
    '12 horas',
    3,
    3,
    true,
    true,
    true,
    '24/05/2026',
    'IDM-PI36-0001',
    'Pedro Murari',
    'pdrmurari@gmail.com',
    'Rodrygo Murari',
    'Fundador do Instituto Despertamente',
    'Certificado emitido para alunos que concluirem a jornada gratuita de 3 dias e cumprirem os criterios definidos pela equipe do IDM.',
    'Seu certificado ja esta liberado para retirada aqui no portal do aluno, com validacao e download em PDF.',
    'Liberado apos a conclusao dos 3 dias e da aula bonus do fundador.',
    '["Dia 01 - Fundamentos da Psicanalise Integrativa","Dia 02 - Estrutura emocional e leitura clinica","Dia 03 - Integracao, aplicacao e chamada para proximo passo"]'::jsonb
  )
on conflict (code) do update
set
  slug = excluded.slug,
  title = excluded.title,
  course_title = excluded.course_title,
  turma = excluded.turma,
  duration_label = excluded.duration_label,
  hours = excluded.hours,
  minimum_lessons = excluded.minimum_lessons,
  completed_lessons = excluded.completed_lessons,
  bonus_included = excluded.bonus_included,
  bonus_completed = excluded.bonus_completed,
  is_available = excluded.is_available,
  issue_date = excluded.issue_date,
  student_name = excluded.student_name,
  student_email = excluded.student_email,
  signatory_name = excluded.signatory_name,
  signatory_role = excluded.signatory_role,
  description = excluded.description,
  delivery_message = excluded.delivery_message,
  release_window = excluded.release_window,
  lessons = excluded.lessons;
