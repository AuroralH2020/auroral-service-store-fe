import { ITableConfig } from '@shared/components/table/table.interfaces';

export const servicesConfig: ITableConfig = {
  //filter: true,
  sort: true,
  paginator: true,
  columns: [
    { name: 'Name', prop: 'title', type: 'text' },
    { name: 'Provider', prop: 'provider', type: 'text' },
    { name: 'Language', prop: 'language', type: 'text' }, 
    { name: 'Last updated', prop: 'lastUpdated', type: 'date' },
    { name: 'Current status', prop: 'statusDevelopment', type: 'text' },
    { name: 'Domain', prop: 'domain', type: 'text' },
    { name: 'Subdomain', prop: 'subdomain', type: 'text' },
    { name: 'Funcionalities', prop: 'funcionalitiesShow', type: 'text' },
    { name: 'Geographycal restrictions', prop: 'location', type: 'text' },
    { name: 'Link to the service', prop: 'linkShow', type: 'text' },
    { name: 'Is free', prop: 'freeText', type: 'text' },
  ],
  
  actions: [
    {
      name: 'View',
      type: 'mat-icon-button',
      themeColor: 'accent',
      icon: 'remove_red_eye',
      tooltip: 'View',
    },

],
};

export const formFields = [
  { label: 'Name', property: 'title', type: 'text' },
  { label: 'Description', property: 'description', type: 'text' },
  { label: 'Provider', property: 'provider', type: 'text' },
  { label: 'Language', property: 'language', type: 'text' },
  { label: 'Date of last update', property: 'lastUpdated', type: 'text' },
  { label: 'Current status', property: 'statusDevelopment', type: 'text' },
  { label: 'Domain', property: 'domain', type: 'text' },
  { label: 'SubDomain', property: 'subdomain', type: 'text' },
  { label: 'Funcionalities', property: 'funcionalities', type: 'text' },
  { label: 'Geographical restrictions', property: 'location', type: 'text' },
  { label: 'Link to the service', property: 'link', type: 'text' },
  { label: 'Service requirements', property: 'serviceRequirements', type: 'text' },
  { label: 'Is free', property: 'free', type: 'boolean' },
  { label: 'Version', property: 'versionOfService', type: 'text' },
  { label: 'Number of downloads', property: 'numberOfDownloads', type: 'number' },
  
  
];  

