export interface Route {
  id: number;
  href: string;
  name: string;
}

export const hrefs: Route[] = [
  {
    id: 1,
    href: "/suallar",
    name: "Suallar",
  
  },
  {
    id: 2,
    href: "/bloqlar",
    name: "Bloqlar",
  },
  {
    id: 3,
    href: "/teqaudler",
    name: "Təqaüdlər",
  },
  {
    id: 4,
    href: "/istifadechiler",
    name: "İstifadəçilər",
  },
  {
    id: 7,
    href: "/statistika",
    name: "Sayt göstəriciləri",
  },
  {
    id: 5,
    href: "/bloqelaveet",
    name: "Yeni bloq əlavə et",
  },
  {
    id: 6,
    href: "/teqaudelaveet",
    name: "Yeni təqaüd əlavə et",
  },
];
