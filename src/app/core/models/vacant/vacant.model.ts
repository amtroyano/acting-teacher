import { Base } from "../base.model";
import { JobOpening } from "./jobopening.model";
import { School } from "./school.model";

export class Vacant extends Base {
    index: number;
    idPlaza: number;
    centro: string;
    school: School;
    fFinAus: string;
    idClave: number;
    latitud: string;
    localidad: string;
    longitud: string;
    numPla: number;
    observaciones: string;
    participacion: string;
    provincia: string;
    puesto: string;
    jobOpening: JobOpening;
    tipo: string;
    distancia: string;
    tiempo: string;
}
