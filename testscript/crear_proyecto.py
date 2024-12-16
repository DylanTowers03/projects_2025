import os
import subprocess

def run_command(command):
    """Ejecuta un comando en la terminal de Ubuntu WSL"""
    subprocess.run(command, shell=True, check=True)

def get_database_choice():
    print("Selecciona el sistema de base de datos:")
    print("1: MySQL")
    print("2: PostgreSQL")
    print("3: Oracle")
    print("4: MSSQL")
    choice = input("Ingresa el número correspondiente a tu elección: ")
    
    db_choices = {
        "1": ("mysql2", "mysql"),
        "2": ("pg", "postgres"),
        "3": ("oracledb", "oracle"),
        "4": ("tedious", "mssql")
    }
    return db_choices.get(choice)

def create_database_file(dialect, package):
    db_content = f"""import {{ Sequelize }} from "sequelize";

const DB_NAME = process.env.DB_NAME || "nombrebd";
const DB_USER = process.env.DB_USER || "user";
const DB_PASS = process.env.DB_PASS || "pass";
const DB_HOST = process.env.DB_HOST || "localhost";
const DB_PORT = process.env.DB_PORT || 3306;

export const database = new Sequelize(DB_NAME, DB_USER, DB_PASS, {{
    host: DB_HOST,
    dialect: "{dialect}",
    port: +DB_PORT,
}});

async function generateDb() {{
    try {{
        await database.sync({{ force: false }});
        console.log("Base de datos y tablas creadas");
    }} catch (error) {{
        console.error("Error al sincronizar la base de datos", error);
    }}
}}

generateDb();
"""
    os.makedirs("src/database", exist_ok=True)
    with open("src/database/db.ts", "w") as db_file:
        db_file.write(db_content)

    print(f"Archivo de configuración de base de datos creado en src/database/db.ts.")

def create_model():
    model_name = input("Ingresa el nombre del modelo (minúsculas): ").capitalize()
    fields = []

    while True:
        field_name = input("Ingresa el nombre del campo (o presiona Enter para finalizar): ")
        if not field_name:
            break

        print("Selecciona el tipo de dato:")
        print("1: STRING")
        print("2: INTEGER")
        print("3: BOOLEAN")
        print("4: DATE")
        field_type = input("Ingresa el número correspondiente al tipo de dato: ")

        sequelize_types = {
            "1": "DataTypes.STRING",
            "2": "DataTypes.INTEGER",
            "3": "DataTypes.BOOLEAN",
            "4": "DataTypes.DATE"
        }

        ts_types = {
            "1": "string",
            "2": "number",
            "3": "boolean",
            "4": "Date"
        }

        if field_type in sequelize_types and field_type in ts_types:
            fields.append({
                "name": field_name,
                "sequelize_type": sequelize_types[field_type],
                "ts_type": ts_types[field_type]
            })
        else:
            print("Tipo de dato no válido. Inténtalo nuevamente.")

    # Crear archivo del modelo
    model_content = f"""import {{ Model, DataTypes }} from "sequelize";
import {{ database }} from "../database/db";

export class {model_name} extends Model {{
"""
    for field in fields:
        model_content += f"  public {field['name']}!: {field['ts_type']};\n"

    model_content += f"""\n}}

export interface {model_name}I {{
"""
    for field in fields:
        model_content += f"    {field['name']}: {field['ts_type']};\n"

    model_content += f"""}}\n\n{model_name}.init(
  {{
"""
    for field in fields:
        model_content += f"""    {field['name']}: {{
        type: {field['sequelize_type']},
        allowNull: false
      }},
"""

    model_content += f"""  }},
  {{
    tableName: "{model_name.lower()}s",
    sequelize: database,
    timestamps: false
  }}
);"""

    model_file_path = f"src/models/{model_name}.ts"
    os.makedirs("src/models", exist_ok=True)
    with open(model_file_path, "w") as model_file:
        model_file.write(model_content)

    print(f"Modelo {model_name} creado en {model_file_path}.")

    # Crear el controlador del modelo
    controller_content = f"""import {{ Request, Response }} from 'express';
import {{ {model_name}, {model_name}I }} from '../models/{model_name}';

export class {model_name}Controller {{
    public async test(req: Request, res: Response) {{
        try {{
            res.send('hola, método test para {model_name}')
        }} catch (error) {{
            res.status(500).json({{ msg: 'Error', error }});
        }}
    }}

    public async getAll{model_name}(req: Request, res: Response) {{
        try {{
            const {model_name.lower()}s: {model_name}I[] = await {model_name}.findAll();
            res.status(200).json({{{model_name.lower()}s}});
        }} catch (error) {{
            res.status(500).json({{ msg: 'Error', error }});
        }}
    }}

    public async create{model_name}(req: Request, res: Response) {{
        const {{ {', '.join([field['name'] for field in fields])} }} = req.body;

        try {{
            const {model_name.lower()} = await {model_name}.create({{ {', '.join([field['name'] for field in fields])} }});
            res.status(201).json({{{model_name.lower()}}});
        }} catch (error) {{
            res.status(500).json({{ msg: 'Error', error }});
        }}
    }}

    public async update{model_name}(req: Request, res: Response) {{
        const {{ id }} = req.params;
        const {{ {', '.join([field['name'] for field in fields])} }} = req.body;

        try {{
            const {model_name.lower()} = await {model_name}.findByPk(id);
            if (!{model_name.lower()}) {{
                return res.status(404).json({{ msg: '{model_name} no encontrado' }});
            }}
            await {model_name.lower()}.update({{ {', '.join([field['name'] for field in fields])} }});
            res.status(200).json({{{model_name.lower()}}});
        }} catch (error) {{
            res.status(500).json({{ msg: 'Error', error }});
        }}
    }}

    public async delete{model_name}(req: Request, res: Response) {{
        const {{ id }} = req.params;

        try {{
            const {model_name.lower()} = await {model_name}.findByPk(id);
            if (!{model_name.lower()}) {{
                return res.status(404).json({{ msg: '{model_name} no encontrado' }});
            }}
            await {model_name.lower()}.destroy();
            res.status(200).json({{ msg: '{model_name} eliminado' }});
        }} catch (error) {{
            res.status(500).json({{ msg: 'Error', error }});
        }}
    }}
}}
"""
    controller_file_path = f"src/controllers/controller.{model_name.lower()}.ts"
    os.makedirs("src/controllers", exist_ok=True)
    with open(controller_file_path, "w") as controller_file:
        controller_file.write(controller_content)

    print(f"Controlador para {model_name} creado en {controller_file_path}.")

def main():
    db_choice = get_database_choice()
    if not db_choice:
        print("Opción inválida.")
        return
    db_package, db_dialect = db_choice

    # Instalar paquetes necesarios
    run_command(f"npm install {db_package}")
    create_database_file(db_dialect, db_package)

    # Crear modelos
    while True:
        create_model_choice = input("¿Deseas crear un modelo? (s/n): ").lower()
        if create_model_choice == "s":
            create_model()
        elif create_model_choice == "n":
            print("Finalizando configuración.")
            break
        else:
            print("Opción no válida. Responde con 's' o 'n'.")

if __name__ == "__main__":
    main()
