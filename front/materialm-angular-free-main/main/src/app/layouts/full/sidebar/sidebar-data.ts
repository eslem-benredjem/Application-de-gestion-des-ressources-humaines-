import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Home',
  },
  {
    displayName: 'Dashboard',
    iconName: 'solar:widget-add-line-duotone',
    route: 'dashboard',

  },
  {
    navCap: 'Employes',
    divider: true
  },
  {
    displayName: 'Ajouter Employe',
    iconName: 'solar:user-plus-broken',
    route: 'dashboard/ajouter',
  
  },
  {
    displayName: 'Liste des Employes',
    iconName: 'solar:users-group-rounded-line-duotone',
    route: 'dashboard/listEmploye',
  },
  {
    navCap: 'Groupes',
    divider: true
  },
  {
    displayName: 'Liste des Groupes',
    iconName: 'solar:checklist-minimalistic-broken',
    route: 'dashboard/listGroup',
  },
  {
    navCap: 'Conge',
    divider: true
  },
  {
    displayName: 'Lise des Conges',
    iconName: 'solar:file-text-linear',
    route: 'dashboard/listConge',
  },
  {
    navCap: 'Profile',
    divider: true
  },
  {
    displayName: 'Profile',
    iconName: 'solar:user-id-linear',
    route: 'dashboard/profile',
  },
  {
    navCap: 'Auth',
    divider: true
  },
  {
    displayName: 'Logout',
    iconName: 'solar:user-plus-rounded-line-duotone',
    route: '/auth/login',
  },
];


export const navItems2: NavItem[] = [
  {
    navCap: 'Home',
  },
  {
    displayName: 'Dashboard',
    iconName: 'solar:widget-add-line-duotone',
    route: 'dashboard',

  },
  {
    navCap: 'Employes',
    divider: true
  },
  {
    displayName: 'Liste des Employes',
    iconName: 'solar:users-group-rounded-line-duotone',
    route: 'dashboard/listEmployeRes',
  },

  {
    navCap: 'Conge',
    divider: true
  },
  {
    displayName: 'Demande de Conge',
    iconName: 'solar:document-add-linear',
    route: 'dashboard/demande',
  },
  {
    displayName: 'Lise des Conges',
    iconName: 'solar:file-text-linear',
    route: 'dashboard/listConge',
  },
  {
    navCap: 'Profile',
    divider: true
  },
  {
    displayName: 'Profile',
    iconName: 'solar:user-id-linear',
    route: 'dashboard/profile',
  },
  {
    navCap: 'Auth',
    divider: true
  },
  {
    displayName: 'Logout',
    iconName: 'solar:user-plus-rounded-line-duotone',
    route: '/auth/login',
  },
];

export const navItems3: NavItem[] = [
  {
    navCap: 'Home',
  },
  {
    displayName: 'Dashboard',
    iconName: 'solar:widget-add-line-duotone',
    route: 'dashboard',

  },
  {
    navCap: 'Conge',
    divider: true
  },
  {
    displayName: 'Demande de Conge',
    iconName: 'solar:document-add-linear',
    route: 'dashboard/demande',
  },
  {
    navCap: 'Profile',
    divider: true
  },
  {
    displayName: 'Profile',
    iconName: 'solar:user-id-linear',
    route: 'dashboard/profile',
  },
  {
    navCap: 'Auth',
    divider: true
  },
  {
    displayName: 'Logout',
    iconName: 'solar:user-plus-rounded-line-duotone',
    route: '/auth/login',
  },
];
