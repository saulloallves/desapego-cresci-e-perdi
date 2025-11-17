create table if not exists public.unit_locations (
  id uuid primary key default gen_random_uuid(),
  unit_id uuid not null unique,
  latitude double precision not null,
  longitude double precision not null,
  address_geocoded text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.unit_locations enable row level security;

create policy "Unit locations are readable by anon" on public.unit_locations
  for select
  to anon
  using (true);

create policy "Unit locations are insertable by service role" on public.unit_locations
  for insert
  to service_role
  with check (true);

create policy "Unit locations are updatable by service role" on public.unit_locations
  for update
  to service_role
  using (true);

create index if not exists idx_unit_locations_unit_id on public.unit_locations(unit_id);

-- Trigger to update updated_at
create or replace function update_unit_locations_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger update_unit_locations_updated_at
  before update on public.unit_locations
  for each row
  execute function update_unit_locations_updated_at();
