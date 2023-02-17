export class EnvService {
  get(key: string): string {
    return process.env[key];
  }
}
