export interface IService{
    serviceName: string[],
    serviceDescription: string[],
    provider: string,
    dateLastUpdate: Date,
    registration: IRegistration,
    currentStatus: string[],
    hasDomain: string[],
    hasFuncionality: string[],
    funcionalitiesShow: string[] | undefined,
    applicableGeographicalArea: string,
    hasRequirement: string[],
    hasURL: string,
    linkShow: string | undefined,
    language: string[],
    hasSubDomain: string[],
    serviceFree: boolean[],
    freeText: string,
    versionOfService: string,
    numberOfDownloads: number,
    community: ICommunity,
    node: INode
}

export interface ICommunity{
  description: string,
  name: string,
  commId: string
}

export interface INode{
  company: string,
  cid: string,
  agid: string
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