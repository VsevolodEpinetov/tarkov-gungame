import fs from 'fs';
import path from 'path';
import gunsData from "../public/data/guns.json"

const dataDirectory = path.join(process.cwd(), 'public')

export function getAllGunsNames() {
  return Object.keys(gunsData).map(gunName => {
    return {
      params: {
        id: gunName
      }
    }
  })
}


export function getGunData(gunName) {
  return gunsData[gunName];
}
