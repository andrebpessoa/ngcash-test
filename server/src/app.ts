import express from 'express'
import 'express-async-errors'
import helmet from 'helmet'
import cors from 'cors'

import routes from './routes'
import domainErrorHandler from './middlewares/DomainErrorHandler'

const app = express()

app.use(express.json())
app.use(helmet())
app.use(cors())

app.use(routes)

app.use(domainErrorHandler)

export default app
