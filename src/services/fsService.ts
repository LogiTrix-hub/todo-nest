import { Injectable } from '@nestjs/common';
import { writeFile, readFile } from 'fs/promises';

@Injectable()
export class FSService {
  constructor() {}

  async writeFile(path: string, data: string) {
    return writeFile(path, data, 'utf-8');
  }

  async readFile(path: string) {
    return readFile(path, 'utf-8');
  }
}
