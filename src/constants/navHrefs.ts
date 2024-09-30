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
    href: "/users",
    name: "İstifadəçilər",
  },
  {
    id: 7,
    href: "/",
    name: "Əsas statistika",
  },
  {
    id: 5,
    href: "/bloqelaveet",
    name: "Bloq əlavə et",
  },
  {
    id: 6,
    href: "/teqaudelaveet",
    name: "Təqaüd əlavə et",
  },
];
