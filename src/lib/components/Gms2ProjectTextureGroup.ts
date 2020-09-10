import { YypTextureGroup } from "../../types/YypComponents";

export class Gms2ProjectTextureGroup {

  #data: YypTextureGroup;

  constructor(option:YypTextureGroup){
    this.#data = {...option};
  }

  toObject(): YypTextureGroup{
    return {...this.#data};
  }
}
