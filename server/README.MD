
## init project
```
cd .\server\
npm init -y
npm install express zod bcryptjs jsonwebtoken cookie-parser cors dotenv express-async-errors prisma @prisma/client
npm install -D typescript ts-node @types/node @types/express @types/jsonwebtoken @types/cookie-parser @types/bcryptjs @types/cors
```

## start postgres locally
```
docker run -e POSTGRES_PASSWORD=mypassword -d -p 5432:5432 postgres
```

## setup prisma
```
npx prisma init
npx prisma generate dev --name init
npx prisma migrate
```

## start dev server
```
npm run dev
```

## build server
```
npm run build
```

## run build
```
npm run start
```