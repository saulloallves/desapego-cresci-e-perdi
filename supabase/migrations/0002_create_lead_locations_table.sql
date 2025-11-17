create table if not exists public.lead_locations (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references public.leads(id) on delete cascade,
  latitude double precision not null,
  longitude double precision not null,
  address_searched text,
  created_at timestamptz not null default now(),
  constraint unique_lead_location unique (lead_id)
);

alter table public.lead_locations enable row level security;

create policy "Lead locations are insertable by anon" on public.lead_locations
  for insert
  to anon
  with check (true);

create policy "Lead locations are readable by anon" on public.lead_locations
  for select
  to anon
  using (true);

create index if not exists idx_lead_locations_lead_id on public.lead_locations(lead_id);
