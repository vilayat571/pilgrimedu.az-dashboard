interface Option {
  value: string;
  label: string;
}

export const options: Option[] = [
  { value: "Regionlar", label: "Regionlar" },
  { value: "Avropa", label: "Avropa" },
  { value: "Amerika və Kanada", label: "Amerika və Kanada" },
  { value: "Asiya", label: "Asiya" },
  { value: "İngiltərə", label: "İngiltərə" },
  {
    value: "Rusiya və postsovet ölkələri",
    label: "Rusiya və postsovet ölkələri",
  },
  {
    value: "Türkiyə və İslam ölkələri",
    label: "Türkiyə və İslam ölkələri",
  },
];

export const typeOfscholarships: Option[] = [
  { value: "Təqaüdün tipi", label: "Təqaüdün tipi" },
  { value: "Tam maliyyələşdirilmiş", label: "Tam maliyyələşdirilmiş" },
  { value: "Yarım maliyyələşdirilmiş", label: "Yarım maliyyələşdirilmiş" },
  { value: "Endirimli", label: "Endirimli" },
];
