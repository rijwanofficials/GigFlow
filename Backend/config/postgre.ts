import { Sequelize } from "sequelize";

let sequelize: Sequelize;

export const connectPostgres = async (): Promise<void> => {
  try {
    if (!process.env.POSTGRES_URL) {
      throw new Error("POSTGRES_URL is not defined in .env");
    }
    sequelize = new Sequelize(process.env.POSTGRES_URL, {
      dialect: "postgres",
      logging: false,
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
    });
    await sequelize.authenticate();
    console.log("---✅ PostgreSQL (Neon) connected successfully---");
  } catch (error) {
    console.error("❌ PostgreSQL connection failed", error);
    process.exit(1);
  }
};
export { sequelize };
