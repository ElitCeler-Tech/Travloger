declare module 'pg' {
  export interface ClientConfig {
    connectionString?: string;
    host?: string;
    port?: number;
    database?: string;
    user?: string;
    password?: string;
  }

  export class Client {
    constructor(config: ClientConfig);
    connect(): Promise<void>;
    query(text: string): Promise<{ rows: unknown[]; rowCount: number }>;
    end(): Promise<void>;
  }
}
