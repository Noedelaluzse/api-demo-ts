import {v4 as uuidv4 } from 'uuid';

export class Uuid {
  public static readonly generateUUID = () => uuidv4();
}