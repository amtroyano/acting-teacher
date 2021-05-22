import { Corp } from "../user/corp.model";
import { Position } from "../user/position.model";

export class Corps {

    corps: Array<Corp>;

    constructor() {
        this.corps = new Array<Corp>(
            new Corp(590, 'Profesores de Enseñanza Secundaria', new Array<Position>(
                new Position('AD594423', 'Pianista Acompañante (Danza)')
            )),
            new Corp(591, 'Profesores Tec.de Formación Profesional'),
            new Corp(592, 'Profesores Escuelas Oficiales de Idiomas'),
            new Corp(593, 'Catedráticos de Música y Artes Escénicas'),
            new Corp(594, 'Profesores de Música y Artes Escénicas'),
            new Corp(597, 'Cuerpo de primaria',  new Array<Position>(
                new Position('CV597031', 'Educación Infantil Apoyo Covid')
            ))
        );
    }
}