export interface IContinousintegration {
  id?: number;
  title?: string;
  content?: any;
}

export class Continousintegration implements IContinousintegration {
  constructor(public id?: number, public title?: string, public content?: any) {}
}
