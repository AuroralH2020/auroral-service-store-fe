interface ISideNavItem {
  link: string;
  icon: string;
  text: string;
  isAdministration?: boolean;
}

export const sideNavItems: ISideNavItem[] = [
  {
    link: './clients',
    icon: 'person',
    text: 'Clientes',
    isAdministration: true,
  },
  {
    link: './users',
    icon: 'people',
    text: 'Usuarios',
    isAdministration: true,
  },
  {
    link: './operations',
    icon: 'account_tree',
    text: 'Operaciones',
    isAdministration: true,
  },
  {
    link: './services',
    icon: 'apartment',
    text: 'Services',
  },
  /*
  {
    link: './assets',
    icon: 'widgets',
    text: 'Activos',
  },
  {
    link: './operation-records',
    icon: 'info',
    text: 'Registro de operaciones',
  },
  {
    link: './incidents',
    icon: 'warning',
    text: 'Incidencias',
  },
  */
];
