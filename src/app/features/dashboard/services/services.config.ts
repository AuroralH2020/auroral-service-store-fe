import { ITableConfig } from '@shared/components/table/table.interfaces';

export const servicesConfig: ITableConfig = {
  //filter: true,
  sort: true,
  paginator: true,
  columns: [
    { name: 'Name', prop: 'serviceName', type: 'text' },
    { name: 'Provider', prop: 'provider', type: 'text' },
    { name: 'Language', prop: 'language', type: 'text' }, 
    { name: 'Last updated', prop: 'dateLastUpdate', type: 'date' },
    { name: 'Current status', prop: 'currentStatus', type: 'text' },
    { name: 'Domain', prop: 'hasDomain', type: 'text' },
    { name: 'Subdomain', prop: 'hasSubDomain', type: 'text' },
    { name: 'Funcionalities', prop: 'funcionalitiesShow', type: 'text' },
    { name: 'Geographical restrictions', prop: 'applicableGeographicalArea', type: 'text' },
    { name: 'Link to the service', prop: 'linkShow', type: 'url' , linkURL: 'hasURL'},
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
  { label: 'Name', property: 'serviceName', type: 'text' },
  { label: 'Description', property: 'serviceDescription', type: 'text' },
  { label: 'Provider', property: 'provider', type: 'text' },
  { label: 'Language', property: 'language', type: 'text' },
  { label: 'Date of last update', property: 'dateLastUpdate', type: 'text' },
  { label: 'Current status', property: 'currentStatus', type: 'text' },
  { label: 'Domain', property: 'hasDomain', type: 'text' },
  { label: 'SubDomain', property: 'hasSubDomain', type: 'text' },
  { label: 'Funcionalities', property: 'hasFuncionality', type: 'text' },
  { label: 'Geographical restrictions', property: 'applicableGeographicalArea', type: 'text' },
  { label: 'Link to the service', property: 'hasURL', type: 'text' },
  { label: 'Service requirements', property: 'hasRequirement', type: 'text' },
  { label: 'Is free', property: 'serviceFree', type: 'boolean' },
  { label: 'Version', property: 'versionOfService', type: 'text' },
  { label: 'Number of downloads', property: 'numberOfDownloads', type: 'number' },
  { label: 'Keywords', property: 'all', type: 'text' }, 
];  
 
