### starter code for project


## start postgres locally
```
docker run -e POSTGRES_PASSWORD=mypassword -d -p 5432:5432 postgres
```

## db url
```
postgresql://postgres:mypassword@localhost:5432/mydb?schema=public
```

## create .env file in root folder and add above url
```
DATABASE_URL = "your_db_url"

PORT = 4000
JWT_SECRET = "your_jwt_secret"
JWT_REFRESH_SECRET = "your_jwt_refresh_secret"
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
