declare namespace NodeJS {
    interface ProcessEnv {
      PORT: number;
      DB_PORT:number;
      DB_NAME:string;
      DB_HOST: string;
      DB_USER: string;
      DB_PASSWORD: string;
      JWT_SECRET: string;
    }
  }
  