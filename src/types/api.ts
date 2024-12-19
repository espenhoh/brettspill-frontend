export type SpillError = {
  errors: {
    spill_navn: string[];
    spill_type: string[];
  };
};

export type Spill = {
  id: number;
  spill_type_navn: string;
  spill_navn: string;
  spill_type: string;
  opprettet_tid: string;
  start_tid: string | null;
  slutt_tid: string | null;
  spillere: Spiller[]; // Bytt `any[]` med en spesifikk type om spillere har en bestemt struktur
};

export type Spiller = {
  username: string;
};

export interface SpillListe extends Array<Spill> {}

export interface SpillType {
  value: string;
  label: string;
}
