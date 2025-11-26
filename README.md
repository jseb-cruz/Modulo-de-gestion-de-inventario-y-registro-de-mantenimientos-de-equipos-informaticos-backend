# Tech Inventory API (Backend)

## 1. URL de la API
- Prod: _(agrega URL si está desplegado, p. ej. Azure/Render/Heroku)_
- Local: `http://localhost:3000/api` (Swagger en `http://localhost:3000/docs`)

## 2. Descripción
API NestJS para gestionar inventario, mantenimientos y usuarios con autenticación JWT. Usa Prisma + PostgreSQL.

## 3. Estructura del proyecto
```
src/
  application/       # casos de uso y DTOs
  domain/            # entidades y contratos de repositorio
  infrastructure/    # PrismaService y repositorios DB
  interfaces/        # módulos y controladores HTTP, auth
  main.ts            # bootstrap Nest
prisma/
  schema.prisma      # modelo de datos
  migrations/        # migraciones generadas
.env                 # variables de entorno
```

## 4. Explicación de carpetas
- `domain`: entidades (Equipment, Maintenance, Location, User) y repositorios.
- `application`: DTOs y servicios de negocio (use cases).
- `infrastructure`: PrismaService y repositorios Prisma.
- `interfaces`: controladores HTTP, módulos Nest, auth (JWT), filtros e interceptores.
- `prisma`: modelo y migraciones de la base de datos.

## 5. Configuración y entorno
Requisitos: Node 18+, npm, PostgreSQL.  
Variables en `.env`:
```
DATABASE_URL="postgresql://user:pass@localhost:5432/tech_inventory?schema=public"
USE_FAKE_API=false
JWT_SECRET=tu_clave_jwt
JWT_EXPIRES_IN=1d
```

## 6. Ejecución (local)
```bash
npm install
npx prisma migrate dev
npm run start:dev
```
Swagger: `http://localhost:3000/docs`

## 7. Despliegue
1) Ajusta `.env` de producción (DB y JWT).  
2) Ejecuta migraciones: `npx prisma migrate deploy`.  
3) Construye y levanta con PM2/Docker/servicio: `npm start`  
4) Asegura puerto expuesto (p. ej. 3000) o un reverse proxy.

## 8. Endpoints principales (v1)
- Auth:
  - `POST /api/auth/login` → `{ token, user }`
- Users:
  - `POST /api/users` (crear)
  - `GET /api/users`, `GET /api/users/:id`, `PATCH /api/users/:id`, `DELETE /api/users/:id` (Bearer token)
- Equipment:
  - `GET /api/equipment`, `GET /api/equipment/:id`
  - `POST /api/equipment`, `PATCH /api/equipment/:id`, `DELETE /api/equipment/:id`
- Maintenance:
  - `GET /api/maintenance`, `GET /api/maintenance/:id`
  - `POST /api/maintenance`, `PATCH /api/maintenance/:id`, `DELETE /api/maintenance/:id`
- Location:
  - `GET /api/location`, `GET /api/location/:id`
  - `POST /api/location`, `PATCH /api/location/:id`, `DELETE /api/location/:id`

## 9. Arquitectura 
```mermaid
classDiagram
  class User {
    id: string
    email: string
    name: string
    role: Admin|User
    status: Active|Inactive
    password: hashed
  }
  class Equipment {
    id: string
    assetTag: string
    serialNumber: string
    model: string
    type: string
    status: string
    locationId: string
    purchaseDate: Date
    warrantyEnd: Date
  }
  class Maintenance {
    id: string
    equipmentId: string
    type: string
    scheduledAt: Date
    performedAt: Date?
    technician: string
    status: string
    cost: number?
  }
  class Location {
    id: string
    code: string
    name: string
    type: string
    status: string
    building: string?
    floor: string?
    room: string?
  }
  Equipment "1" -- "0..*" Maintenance : has
  Location "1" -- "0..*" Equipment : hosts
```
