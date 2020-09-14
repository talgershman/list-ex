import { Injectable } from '@angular/core';
import { IZone } from '../../entities/zone.js';
import { ISection } from '../../entities/section.js';

interface ICellData {
  type: string;
  section?: ISection;
  zone?: IZone;
  title?: string;
}

@Injectable({
  providedIn: 'root'
})
export class MatrixPageService {

  constructor() { }

  generateCells(zones: IZone[], sections: ISection[]): ICellData[][]{
    const generateZoneHeaders = this._generateZoneHeaders(zones);
    const cells = this._generateInnerCells(zones, sections);

    cells.splice(0, 0, generateZoneHeaders);
    return cells;
  }

  _generateInnerCells(zones: IZone[], sections: ISection[]): any {
    const result = [];
    const sectionsMap = this._generateSectionMap(sections);
    for (const [row, rowZone] of zones.entries()){
      result[row] = [];
      result[row][0] =  {
        type: 'zone',
        zone: rowZone
      } as ICellData;
      for (const [col, colZone] of zones.entries()){
        const key = `${rowZone.guid}-${colZone.guid}`;
        const sectionObj = sectionsMap[key];
        result[row][col + 1] = {
          type: sectionObj ? 'section' : 'empty',
          section: sectionObj
        } as ICellData;
      }
    }
    return result;
  }

  _generateZoneHeaders(zones: IZone[]): any {
    const result = [];
    result.push({
      type: 'title',
      title: 'Source / Destinastion'
    });
    for (const zone of zones){
      result.push({
        type: 'title',
        title: zone.name
      } as ICellData);
    }
    return result;
  }

  _generateSectionMap(sections: ISection[]): any{
    const result = {};
    sections.forEach(section => {
      const key = this._generateKey(section);
      result[key] = section;
    });
    return result;
  }

  _generateKey(section: ISection): string{
    return `${section.sourceGuid}-${section.destinationGuid}`;
  }
}
