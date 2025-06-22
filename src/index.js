const express = require('express');
const dotenv = require('dotenv');
const swaggerUI = require('swagger-ui-express');

const connectDB = require('./config/db');
const authRoutes = require('./routes/auth.routes');
const taskRoutes = require('./routes/task.routes');
const swaggerDocs = require('./docs/swagger');


dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/task', taskRoutes);

// Swagger route
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));