import {Mark} from "./Mark";
import {Model} from "./Model";
import {CarType} from "./Type";

export interface Car {
  id:number,
  name: String,
  mark: Mark,
  model: Model,
  type: CarType,
  year: number,
  engine: String
}
