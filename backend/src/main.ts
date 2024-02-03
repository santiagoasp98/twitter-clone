import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    app.enableCors({
        origin: 'https://twitter-clone-frontend-ecru.vercel.app', // or http://localhost:5173
        credentials: true,
        allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept',
        methods: 'GET, POST, PUT, DELETE, OPTIONS',
    })
    await app.listen(process.env.PORT)
}
bootstrap()
