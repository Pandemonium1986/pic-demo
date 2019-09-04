export interface IContinuousdeployment {
  id?: number;
  title?: string;
  content?: any;
}

export class Continuousdeployment implements IContinuousdeployment {
  constructor(public id?: number, public title?: string, public content?: any) {}
}
