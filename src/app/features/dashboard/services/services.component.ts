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
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private _snackBar: MatSnackBar
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

  // search methods

  searchStringInStrings(searchIn: string, searched: string[]): boolean {
    let search = searchIn.toLowerCase();
    for (let i = 0; i < searched.length; i++) {
      if (searched[i].toLowerCase().includes(search))
        return true;
    }
    return false;
  }

  ngAfterViewInit() {
    this.clearFilterFormGroup();
    let services = this.tableServices as unknown as TableComponent;
    services.dataSource.filterPredicate = (data: IService, filter: string) => {
      let keys = Object.keys(this.filterFormGroup.controls);
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        let element = this.read_prop(data, key);
        if (key == 'dateLastUpdate' && this.range.controls.start.value != '' && this.range.controls.end.value != '' && element != undefined) {
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

        if (key == 'serviceName' && element != undefined) {
          if (!this.searchStringInStrings(this.filterFormGroup.controls[key].value, element))
            return false;
        }

        if (key == 'provider' && element != undefined) {
          if (!element.toLowerCase().includes(this.filterFormGroup.controls[key].value.toLowerCase()))
            return false;
        }
        if (key == 'serviceFree' && element != undefined) {
          if (this.selectedFree != '') {
            let isFree = true;
            for (let i = 0; i < element.length && isFree; i++)
              if (!element[i])
                isFree = false;
            if (!((this.selectedFree == 'Yes' && isFree) || (this.selectedFree == 'No' && !isFree)))
              return false;
          }
        }
        if (key == 'applicableGeographicalArea' && element != undefined) {
          if (this.selectedLocation != '')
            if (element != this.selectedLocation)
              return false;
        }
        if (key == 'currentStatus' && element != undefined) {
          if (this.selectedStatusDevelopment != '')
            if (!(element.toString().includes(this.selectedStatusDevelopment)))
              return false;
        }
        if (key == 'language' && element != undefined) {
          if (this.selectedLanguage.length > 0 && element != undefined) {
            let find = false;
            const elements = element as Array<String>;
            for (let i = 0; i < this.selectedLanguage.length && !find; i++) {
              if (elements.indexOf(this.selectedLanguage[i]) >= 0)
                find = true;
            }
            if (!find)
              return false;
          }
        }
        if (key == 'hasFuncionality' && element != undefined) {
          if (this.selectedFuncionality.length > 0 && element != undefined) {
            let find = false;
            const elements = element as Array<String>;
            for (let i = 0; i < this.selectedFuncionality.length && !find; i++) {
              if (elements.indexOf(this.selectedFuncionality[i]) >= 0)
                find = true;
            }
            if (!find)
              return false;
          }
        }
        if (key == 'hasDomain' && element != undefined) {
          if (this.selectedDomain.length > 0 && element != undefined) {
            let find = false;
            const elements = element as Array<String>;
            for (let i = 0; i < this.selectedDomain.length && !find; i++) {
              if (elements.indexOf(this.selectedDomain[i]) >= 0)
                find = true;
            }
            if (!find)
              return false;
          }
        }
        if (key == 'hasSubDomain' && element != undefined) {
          if (this.selectedSubDomain.length > 0 && element != undefined) {
            let find = false;
            const elements = element as Array<String>;
            for (let i = 0; i < this.selectedSubDomain.length && !find; i++) {
              if (elements.indexOf(this.selectedSubDomain[i]) >= 0)
                find = true;
            }
            if (!find)
              return false;
          }
        }

        if (key == 'versionOfService' && element != undefined) {
          if (this.selectedVersion.length > 0 && element != undefined) {
            let find = false;
            for (let i = 0; i < this.selectedVersion.length && !find; i++)
              if (element.indexOf(this.selectedVersion[i]) >= 0)
                find = true;
            if (!find)
              return false;
          }
        }

        if (key == 'numberOfDownloads' && element != undefined) {
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
            find = data.serviceName.toString().toLowerCase().includes(text) || find;
            if (data.serviceDescription)
              find = data.serviceDescription.toString().toLowerCase().includes(text) || find;
            find = data.provider.toLowerCase().includes(text) || find;
            if (data.dateLastUpdate)
              find = data.dateLastUpdate.toString().toLowerCase().includes(text) || find;
            if (data.currentStatus)
              find = data.currentStatus.toString().toLowerCase().includes(text) || find;
            if (data.hasDomain)
              find = data.hasDomain.toString().toLowerCase().includes(text) || find;
            if (data.hasFuncionality)
              find = data.hasFuncionality.toString().toLowerCase().includes(text) || find;
            if (data.applicableGeographicalArea)
              find = data.applicableGeographicalArea.toLowerCase().includes(text) || find;
            if (data.hasRequirement)
              find = data.hasRequirement.toString().toLowerCase().includes(text) || find;
            if (data.hasURL)
              find = data.hasURL.toLowerCase().includes(text) || find;
            if (data.language)
              find = data.language.toString().toLowerCase().includes(text) || find;
            if (data.hasSubDomain)
              find = data.hasSubDomain.toString().toLowerCase().includes(text) || find;
            if (data.serviceFree != undefined) {
              let isFree = this.ifServiceFree(data);
              find = (isFree && text == 'yes') || (!isFree && text == 'no') || find;
            }
            if (data.versionOfService)
              find = data.versionOfService.toString().toLowerCase().includes(text) || find;
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

  ifServiceFree(service: IService): boolean {
    for (let i = 0; i < service.serviceFree.length; i++)
      if (!service.serviceFree[i])
        return false;
    return true;
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

  nextServices(response: any, now: Date) {
    let servicesAux: IService[] = response.result.map((service: IService) => {
      if (service.dateLastUpdate == undefined)
        service.dateLastUpdate = now;
      else
        service.dateLastUpdate = new Date(service.dateLastUpdate);
      if (this.locationsToSelect.indexOf(service.applicableGeographicalArea) < 0)
        this.locationsToSelect.push(service.applicableGeographicalArea);

      service.currentStatus.forEach(currentStat => {
        if (this.statusDevelopmentToSelect.indexOf(currentStat) < 0)
          this.statusDevelopmentToSelect.push(currentStat);
      });

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

      if (service.hasFuncionality != undefined)
        if (service.hasFuncionality.forEach != undefined)
          service.hasFuncionality.forEach(funcionality => {
            if (this.funcionalityToSelect.indexOf(funcionality) < 0)
              this.funcionalityToSelect.push(funcionality);
          });

      if (service.versionOfService != undefined)
        if (service.versionOfService.forEach != undefined)
          service.versionOfService.forEach(version => {
            if (this.versionToSelect.indexOf(version) < 0)
              this.versionToSelect.push(version);
          });


      if (service.hasDomain != undefined)
        if (service.hasDomain.forEach != undefined)
          service.hasDomain.forEach(domain => {
            if (this.domainToSelect.indexOf(domain) < 0)
              this.domainToSelect.push(domain);
          });

      service.freeText = this.ifServiceFree(service) ? 'Yes' : 'No';
      service.linkShow = this.substring(service.hasURL);
      service.funcionalitiesShow = this.subFuncionalities(service.hasFuncionality);
      return {
        ...service,
      };
    });

    servicesAux.sort(function (a, b) {
      if (a.dateLastUpdate > b.dateLastUpdate)
        return 1;
      if (a.dateLastUpdate < b.dateLastUpdate)
        return -1;
      return 0;
    });
    return servicesAux;
  }

  equals(a: IService[], b: IService[]): boolean {
    if (a.length !== b.length) {
      return false;
    }
    if (a.length == 0)
      return true;
    for (let i = 0; i < a.length; i++) {
      if(JSON.stringify(a[i]) != JSON.stringify(b[i]))
        return false;
    }
    return true;
  }

  fetchServices() {
    this.locationsToSelect = [''];
    this.statusDevelopmentToSelect = [''];
    this.languageToSelect = [];
    this.domainToSelect = [];
    this.isTableLoading = true;
    let servicesAux: IService[] = [];
    const now = new Date();
    this.listServices$ = this.servicesService.listProductsCache().subscribe({
      next: (response) => {
        servicesAux = response.result;
        servicesAux = this.nextServices(response, now);
        this.services = [...servicesAux];
        this.servicesService.listProducts().subscribe({
          next: (response) => {
            response.result = this.nextServices(response, now);
            //response.result[0].language[0]= 'aadsf'; // only for test
            //response.result[0].provider = 'oooo';    // only for test
            //console.log(servicesAux[0].applicableGeographicalArea, response.result[0].applicableGeographicalArea);
            if (this.equals(servicesAux, response.result)) {
              console.log('Services not changed');
            }
            else {
              this.services = [... this.nextServices(response,now)];
              this._snackBar.open('Services reloaded', 'Close', { duration: 3 * 1000, });
              console.log('Services changed');
            }
          },
          error: (err: HttpErrorResponse) => {
            this.modals.open({
              title: 'Error',
              message: 'The service data could not be loaded',
            });
            console.log('Error of load: ', err);
          }
        });
        console.log('Services loaded: ', this.services);
      },
      error: (err: HttpErrorResponse) => {
        this.modals.open({
          title: 'Error',
          message: 'The service data could not be loaded',
        });
        console.log('Error of load: ', err);
      },
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
    // need change the name of atributes here
    switch (event.action) {
      case 'View':
        const aux = { ...event.row };
        if (aux.serviceDescription == undefined)
          aux.serviceDescription = '';
        if (aux.currentStatus == undefined)
          aux.currentStatus = [''];
        if (aux.hasSubDomain == undefined)
          aux.hasSubDomain = [''];
        if (aux.hasFuncionality == undefined)
          aux.hasFuncionality = [''];
        if (aux.applicableGeographicalArea == undefined)
          aux.applicableGeographicalArea = '';
        if (aux.hasRequirement == undefined)
          aux.hasRequirement = [''];
        if (aux.hasURL == undefined)
          aux.hasURL = '';
        if (aux.language == undefined)
          aux.language = '';
        if (aux.subdomain == undefined)
          aux.subdomain = '';
        if (aux.versionOfService == undefined)
          aux.versionOfService = [''];
        if (aux.numberOfDownloads == undefined)
          aux.numberOfDownloads = 0;
        if (aux.serviceName === undefined)
          aux.serviceName = [''];
        let service: any = {
          serviceName: aux.serviceName,
          serviceDescription: aux.serviceDescription,
          provider: aux.provider,
          dateLastUpdate: aux.dateLastUpdate,
          currentStatus: aux.currentStatus,
          hasSubDomain: aux.hasSubDomain,
          hasFuncionality: aux.hasFuncionality,
          applicableGeographicalArea: aux.applicableGeographicalArea,
          hasRequirement: aux.hasRequirement,
          hasURL: aux.hasURL,
          language: aux.language,
          hasDomain: aux.hasDomain,
          serviceFree: this.ifServiceFree(aux) ? 'Yes' : 'No',
          versionOfService: aux.versionOfService,
          numberOfDownloads: aux.numberOfDownloads,
          all: ''
        };
        this.editFormGroup.setValue(service);
        let date = new Date(this.editFormGroup.controls['dateLastUpdate'].value);
        this.editFormGroup.controls['dateLastUpdate'].setValue(date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear());
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
        if (this.services[i].hasDomain != undefined) {
          if (this.services[i].hasDomain.indexOf(domain) >= 0) { // one domain is in the file
            if (typeof this.services[i].hasSubDomain != "string") {
              for (let i2 = 0; i2 < this.services[i].hasSubDomain.length; i2++) {
                if (this.subDomainToSelect.indexOf(this.services[i].hasSubDomain[i2]) < 0)
                  this.subDomainToSelect.push(this.services[i].hasSubDomain[i2]); // add new subDomain
              }
            }
          }
        }
      }
    });
  }


}
