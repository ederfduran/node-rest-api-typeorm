import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "node_admin",
    entities: [
        "src/entity/*.ts"
    ],
    synchronize: true,
    logging: false,
})
