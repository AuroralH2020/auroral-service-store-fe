import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalsService } from '@shared/services/modals.service';
import { Subscription } from 'rxjs';
import { ServicesService } from './services-service';
import { IService } from './services.interfaces';

import { formFields, servicesConfig } from './services.config';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TableComponent } from '@shared/components/table/table.component';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})

export class ServicesComponent implements OnInit {
  isTableLoading = true;
  services: IService[] = [];
  private listServices$!: Subscription;
  servicesConfig = servicesConfig;
  editFormGroup = new FormGroup({});
  filterFormGroup = new FormGroup({});
  formFields = formFields;

  range = new FormGroup({
    start: new FormControl(null),
    end: new FormControl(null),
  });

  constructor(
    private servicesService: ServicesService,
    private modals: ModalsService,
    private dialog: MatDialog,
  ) { }

  @ViewChild('tableServices') tableServices!: TemplateRef<any>;
  @ViewChild('inputText') inputText!: ElementRef<any>;

  selectedFree = '';
  selectedLocation = '';
  locationsToSelect: string[] = [];
  selectedStatusDevelopment = '';
  statusDevelopmentToSelect: string[] = [];
  selectedLanguage: string[] = [];
  languageToSelect: string[] = [];
  selectedFuncionality: string[] = [];
  funcionalityToSelect: string[] = [];
  selectedDomain: string[] = [];
  domainToSelect: string[] = [];
  selectedSubDomain: string[] = [];
  selectedVersion: string[] = [];
  subDomainToSelect: string[] = [];
  versionToSelect: string[] = [];

  @ViewChild('modalFilter') modalFilter!: TemplateRef<any>;

  ngOnInit(): void {
    this.formFields.forEach((field: { property: string }) => {
      this.editFormGroup.addControl(
        field.property,
        new FormControl('', Validators.required)
      );
      this.editFormGroup.controls[field.property].disable(); // not editable
      this.filterFormGroup.addControl(
        field.property,
        new FormControl('', Validators.required)
      );
    });
    this.fetchServices();
  }

  ngAfterViewInit() {
    this.clearFilterFormGroup();
    let services = this.tableServices as unknown as TableComponent;
    services.dataSource.filterPredicate = (data: IService, filter: string) => {
      let keys = Object.keys(this.filterFormGroup.controls);
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        let element = this.read_prop(data, key);
        if (key == 'lastUpdated' && this.range.controls.start.value != '' && this.range.controls.end.value != '') {
          let date = new Date(element);
          let init = new Date(this.range.controls.start.value);
          let end = new Date(this.range.controls.end.value);
          init.setHours(0);
          init.setMinutes(0);
          init.setSeconds(0);
          end.setHours(23);
          end.setMinutes(59);
          end.setSeconds(59);
          if (!(init <= date && end >= date))
            return false;
        }
        if (key == 'title' || key == 'provider') {
          if (!element.toLowerCase().includes(this.filterFormGroup.controls[key].value.toLowerCase()))
            return false;
        }
        if (key == 'free') {
          if (this.selectedFree != '')
            if (!((this.selectedFree == 'Yes' && element) || (this.selectedFree == 'No' && !element)))
              return false;
        }
        if (key == 'location') {
          if (this.selectedLocation != '')
            if (!(element == this.selectedLocation))
              return false;
        }
        if (key == 'statusDevelopment') {
          if (this.selectedStatusDevelopment != '')
            if (!(element == this.selectedStatusDevelopment))
              return false;
        }
        if (key == 'language') {
          if (this.selectedLanguage.length > 0) {
            let find = false;
            const elements = element as Array<String>;
            for (let i = 0; i < this.selectedLanguage.length && !find; i++) {
              if (element != undefined)
                if (elements.indexOf(this.selectedLanguage[i]) >= 0)
                  find = true;
            }
            if (!find)
              return false;
          }
        }
        if (key == 'funcionalities') {
          if (this.selectedFuncionality.length > 0) {
            let find = false;
            const elements = element as Array<String>;
            for (let i = 0; i < this.selectedFuncionality.length && !find; i++) {
              if (element != undefined)
                if (elements.indexOf(this.selectedFuncionality[i]) >= 0)
                  find = true;
            }
            if (!find)
              return false;
          }
        }
        if (key == 'domain') {
          if (this.selectedDomain.length > 0) {
            let find = false;
            const elements = element as Array<String>;
            for (let i = 0; i < this.selectedDomain.length && !find; i++) {
              if (element != undefined)
                if (elements.indexOf(this.selectedDomain[i]) >= 0)
                  find = true;
            }
            if (!find)
              return false;
          }
        }
        if (key == 'subdomain') {
          if (this.selectedSubDomain.length > 0) {
            let find = false;
            const elements = element as Array<String>;
            for (let i = 0; i < this.selectedSubDomain.length && !find; i++) {
              if (element != undefined)
                if (elements.indexOf(this.selectedSubDomain[i]) >= 0)
                  find = true;
            }
            if (!find)
              return false;
          }
        }

        if (key == 'versionOfService') {
          if (this.selectedVersion.length > 0) {
            let find = false;
            if (element != undefined)
              for (let i = 0; i < this.selectedVersion.length && !find; i++)
                if (element == this.selectedVersion[i])
                  find = true;
            if (!find)
              return false;
          }
        }

        if (key == 'numberOfDownloads') {
          if (this.filterFormGroup.controls[key].value != '') {
            if (!Number.isNaN(this.filterFormGroup.controls[key].value)) {
              if (element == undefined)
                return false;
              if (Number(this.filterFormGroup.controls[key].value) != Number(element))
                return false;
            }
          }
          if (element != undefined && (this.maxDownloads != this.maxDownloadsInput || this.minDownloads != this.minDownloadsInput)) {
            let num = Number(element);
            if (num > this.maxDownloadsInput || num < this.minDownloadsInput)
              return false;
          }
          else if (this.maxDownloads != this.maxDownloadsInput || this.minDownloads != this.minDownloadsInput) {
            if (element == undefined)
              return false;
          }
        }

        if (key == 'all') {
          if (this.filterFormGroup.controls[key].value != '') {
            console.log('Se hace el filtro para all', data);
            let find = false;
            let text = this.filterFormGroup.controls[key].value.toLowerCase();
            find = data.title.toLowerCase().includes(text) || find;
            if (data.description)
              find = data.description.toLowerCase().includes(text) || find;
            find = data.provider.toLowerCase().includes(text) || find;
            if (data.lastUpdated)
              find = data.lastUpdated.toString().toLowerCase().includes(text) || find;
            if (data.statusDevelopment)
              find = data.statusDevelopment.toLowerCase().includes(text) || find;
            if (data.domain)
              find = data.domain.toString().toLowerCase().includes(text) || find;
            if (data.funcionalities)
              find = data.funcionalities.toString().toLowerCase().includes(text) || find;
            if (data.location)
              find = data.location.toLowerCase().includes(text) || find;
            if (data.serviceRequirements)
              find = data.serviceRequirements.toLowerCase().includes(text) || find;
            if (data.link)
              find = data.link.toLowerCase().includes(text) || find;
            if (data.language)
              find = data.language.toString().toLowerCase().includes(text) || find;
            if (data.subdomain)
              find = data.subdomain.toString().toLowerCase().includes(text) || find;
            if (data.free != undefined){
              console.log(text);
              find = (data.free && text == 'yes') || (!data.free && text == 'no') || find;
            }
            if (data.versionOfService)
              find = data.versionOfService.toLowerCase().includes(text) || find;
            if (data.numberOfDownloads)
              find = data.numberOfDownloads.toString().toLowerCase().includes(text) || find;
            if (!find)
              return false;
          }
        }
      }
      return true;
    };
  }



  read_prop(obj: any, id: any) {
    if (id != undefined)
      return obj[id];
    console.log('fallo al leer la propiedad');
    return undefined;
  }

  applyFilterPopUp() {
    let services = this.tableServices as unknown as TableComponent;
    services.dataSource.filter = 'onlyColumns';

    if (services.dataSource.paginator) {
      services.dataSource.paginator.firstPage();
    }
  }

  @ViewChild('maxDownloadsHTML') maxDownloadsHTML!: ElementRef<any>;
  @ViewChild('minDownloadsHTML') minDownloadsHTML!: ElementRef<any>;

  changeMaxDownloads($event: any) {
    this.maxDownloadsInput = $event.target.value;
    if (Number(this.minDownloadsInput) > Number(this.maxDownloadsInput)) {
      this.minDownloadsInput = this.maxDownloadsInput; // equal by the maximum
      if (this.minDownloadsHTML != undefined)
        this.minDownloadsHTML.nativeElement.value = this.minDownloadsInput;
    }
    this.applyFilterPopUp();
  }

  changeMinDownloads($event: any) {
    this.minDownloadsInput = $event.target.value;
    if (Number(this.minDownloadsInput) > Number(this.maxDownloadsInput)) {
      this.maxDownloadsInput = this.minDownloadsInput; // equal by the minimun
      if (this.maxDownloadsHTML != undefined)
        this.maxDownloadsHTML.nativeElement.value = this.maxDownloadsInput;
    }
    this.applyFilterPopUp();
  }


  ngOnDestroy(): void {
    this.listServices$?.unsubscribe();
  }

  minDownloads = -1;
  maxDownloads = 0;

  maxDownloadsInput = this.maxDownloads;
  minDownloadsInput = this.minDownloads;


  fetchServices() {
    this.locationsToSelect = [''];
    this.statusDevelopmentToSelect = [''];
    this.languageToSelect = [];
    this.domainToSelect = [];
    this.isTableLoading = true;
    this.listServices$ = this.servicesService.listProducts().subscribe({
      next: (response) => {
        (this.services = response.result.map((service) => {
          if (service.registration != undefined)
            service.lastUpdated = new Date(service.registration.modified);
          else
            service.lastUpdated = new Date(1980, 1, 1);
          if (this.locationsToSelect.indexOf(service.location) < 0)
            this.locationsToSelect.push(service.location);
          if (this.statusDevelopmentToSelect.indexOf(service.statusDevelopment) < 0)
            this.statusDevelopmentToSelect.push(service.statusDevelopment);
          if (service.language != undefined)
            if (service.language.forEach != undefined)
              service.language.forEach(language => {
                if (this.languageToSelect.indexOf(language) < 0)
                  this.languageToSelect.push(language);
              });

          if (service.numberOfDownloads != undefined) {
            if (this.minDownloads > service.numberOfDownloads || this.minDownloads == -1)
              this.minDownloads = service.numberOfDownloads;
            if (this.maxDownloads < service.numberOfDownloads)
              this.maxDownloads = service.numberOfDownloads;
          }
          this.maxDownloadsInput = this.maxDownloads;
          this.minDownloadsInput = this.minDownloads;

          if (service.funcionalities != undefined)
            if (service.funcionalities.forEach != undefined)
              service.funcionalities.forEach(funcionality => {
                if (this.funcionalityToSelect.indexOf(funcionality) < 0)
                  this.funcionalityToSelect.push(funcionality);
              });

          if (service.versionOfService != undefined)
            if (this.versionToSelect.indexOf(service.versionOfService) < 0)
              this.versionToSelect.push(service.versionOfService);

          if (service.domain != undefined)
            if (service.domain.forEach != undefined)
              service.domain.forEach(domain => {
                if (this.domainToSelect.indexOf(domain) < 0)
                  this.domainToSelect.push(domain);
              });

          service.freeText = service.free ? 'Yes' : 'No';
          return {
            ...service,
          };
        }));
        this.services.sort(function (a, b) {
          if (a.lastUpdated > b.lastUpdated)
            return 1;
          if (a.lastUpdated < b.lastUpdated)
            return -1;
          return 0;
        });
        for (let i = 0; i < this.services.length; i++) {
          this.services[i].linkShow = this.substring(this.services[i].link);
          this.services[i].funcionalitiesShow = this.subFuncionalities(this.services[i].funcionalities);
        }
      },
      error: (err: HttpErrorResponse) =>
        this.modals.open({
          title: 'Error',
          message: 'The service data could not be loaded',
        }),
      complete: () => {
        this.isTableLoading = false;
      },
    });

  }

  @ViewChild('modalService') modalService!: TemplateRef<any>;

  subFuncionalities(funcionalities: string[]): string[] {
    if (funcionalities == undefined)
      return [];
    let numLetters = 0, i = 0;
    let ret: string[] = [];
    while (numLetters < 40 && i < funcionalities.length) {
      if (funcionalities[i].length < 41) {
        numLetters = numLetters + funcionalities[i].length;
        ret.push(funcionalities[i]);
      }
      i++;
    }
    return ret;
  }

  substring(enter: string): string {
    if (enter == undefined)
      return '';
    const maxLetters = 20;
    if (enter.length > maxLetters)
      return enter.substring(0, maxLetters);
    return enter;
  }

  actions(event: { action: string, row: any }): void {
    switch (event.action) {
      case 'View':
        const aux = { ...event.row };
        if (aux.description == undefined)
          aux.description = '';
        if (aux.statusDevelopment == undefined)
          aux.statusDevelopment = '';
        if (aux.domain == undefined)
          aux.domain = '';
        if (aux.funcionalities == undefined)
          aux.funcionalities = '';
        if (aux.location == undefined)
          aux.location = '';
        if (aux.serviceRequirements == undefined)
          aux.serviceRequirements = '';
        if (aux.link == undefined)
          aux.link = '';
        if (aux.language == undefined)
          aux.language = '';
        if (aux.subdomain == undefined)
          aux.subdomain = '';
        if (aux.versionOfService == undefined)
          aux.versionOfService = '';
        if (aux.numberOfDownloads == undefined)
          aux.numberOfDownloads = 0;
        let service: any = {
          title: aux.title,
          description: aux.description,
          provider: aux.provider,
          lastUpdated: aux.lastUpdated,
          statusDevelopment: aux.statusDevelopment,
          domain: aux.domain,
          funcionalities: aux.funcionalities,
          location: aux.location,
          serviceRequirements: aux.serviceRequirements,
          link: aux.link,
          language: aux.language,
          subdomain: aux.subdomain,
          free: aux.free ? 'Yes' : 'No',
          versionOfService: aux.versionOfService,
          numberOfDownloads: aux.numberOfDownloads,
          all: ''
        };
        this.editFormGroup.setValue(service);
        let date = new Date(this.editFormGroup.controls['lastUpdated'].value);
        this.editFormGroup.controls['lastUpdated'].setValue(date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear());
        this.dialog.open(this.modalService, { width: '77em' });
        break;
      default:
        break;
    }
  }

  clearFilterFormGroup() {
    this.maxDownloadsInput = this.maxDownloads;
    this.minDownloadsInput = this.minDownloads;
    if (this.minDownloadsHTML != undefined)
      this.minDownloadsHTML.nativeElement.value = this.minDownloadsInput;
    if (this.maxDownloadsHTML != undefined)
      this.maxDownloadsHTML.nativeElement.value = this.maxDownloadsInput;
    this.range.controls.start.setValue('');
    this.range.controls.end.setValue('');
    this.selectedVersion = [];
    this.selectedFree = '';
    this.selectedLocation = '';
    this.selectedStatusDevelopment = '';
    this.selectedLanguage = [];
    this.selectedFuncionality = [];
    this.selectedDomain = [];
    this.selectedSubDomain = [];
    let keys = Object.keys(this.filterFormGroup.controls);
    keys.forEach(key => {
      this.filterFormGroup.controls[key].setValue('');
    });
    this.applyFilterPopUp();
  }

  openFilter() {
    this.dialog.open(this.modalFilter, { width: '77em' });
  }

  filterView = false;
  changeFilterView() {
    this.filterView = !this.filterView;
    if (this.minDownloadsHTML != undefined)
      this.minDownloadsHTML.nativeElement.value = this.minDownloadsInput;
    if (this.maxDownloadsHTML != undefined)
      this.maxDownloadsHTML.nativeElement.value = this.maxDownloadsInput;
  }

  changeDomain() {
    this.selectedSubDomain = [];
    this.subDomainToSelect = [];
    this.selectedDomain.forEach(domain => {
      for (let i = 0; i < this.services.length; i++) {
        if (this.services[i].domain != undefined) {
          if (this.services[i].domain.indexOf(domain) >= 0) { // one domain is in the file
            if (typeof this.services[i].subdomain != "string") {
              for (let i2 = 0; i2 < this.services[i].subdomain.length; i2++) {
                if (this.subDomainToSelect.indexOf(this.services[i].subdomain[i2]) < 0)
                  this.subDomainToSelect.push(this.services[i].subdomain[i2]); // add new subDomain
              }
            }
          }
        }
      }
    });
  }


}
