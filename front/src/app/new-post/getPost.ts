import {Mark} from "./Mark";
import {Model} from "./Model";
import {CarType} from "./Type";

export interface CarDetail {
  id: number,
  name: String,
  mark: Mark,
  model: Model,
  car_type: CarType,
  year: number,
  engine: String,
}
export interface UserDetail {
  id: number,
  number: String,
}
export interface GetPost {
  id: number,
  title: String,
  description: String,
  price: number,
  city: String,
  color: String,
  mileage: number,
  car: CarDetail
  poster: UserDetail
}
