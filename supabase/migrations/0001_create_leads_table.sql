create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  type text not null check (type in ('franchise', 'sell_items')),
  name text,
  phone text not null,
  city text,
  notes text,
  source_section text,
  created_at timestamptz not null default now()
);

alter table public.leads enable row level security;

create policy "Leads are insertable by anon" on public.leads
  for insert
  to anon
  with check (true);
