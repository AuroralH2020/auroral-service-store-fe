export interface IService{
    title: string,
    description: string,
    provider: string,
    lastUpdated: Date,
    registration: IRegistration,
    statusDevelopment: string,
    domain: string[],
    funcionalities: string[],
    funcionalitiesShow: string[] | undefined,
    location: string,
    serviceRequirements: string,
    link: string,
    linkShow: string | undefined,
    language: string[],
    subdomain: string[],
    free: boolean,
    freeText: string,
    versionOfService: string,
    numberOfDownloads: number 
}


interface IRegistration {
    created: Date,
    modified: Date
}

export interface IColumnFilter{
    name: string, 
    value: string | undefined,
    init: Date | undefined,
    end: Date | undefined
}