import 'dotenv/config';
import { hash } from 'bcrypt';

import { Client } from 'pg';

const client = new Client({
  user: `${process.env.DB_USERNAME}`,
  host: `${process.env.DB_HOST}`,
  database: `${process.env.DB_NAME}`,
  password: `${process.env.DB_PASSWORD}`,
  port: Number(`${process.env.DB_PORT}`),
});

const createAdmin = async () => {
  const password = await hash('12345678', 8);

  await client.connect();
  await client.query(
    `INSERT INTO users (id, name, password, email, is_admin) VALUES
        ('02c2af47-2f13-4d6c-9cb2-34fb4ade634b', 'admin', '${password}', 'admin@test.com', true);`,
  );
  await client.query(
    `INSERT INTO users (id, name, password, email) VALUES
        ('059029ca-5282-47b6-bb1f-3760f9c6eae4', 'user1', '${password}', 'user1@test.com'),
        ('2a897331-46fc-498e-97f1-f4e4e75287c0', 'user2', '${password}', 'user2@test.com'),
        ('0c4ce04c-d2f5-43f8-9f0c-19d3a1205332', 'user3', '${password}', 'user3@test.com'),
        ('981b761d-c36c-464e-91a6-dd9b9cd3c366', 'user4', '${password}', 'user4@test.com'),
        ('fc63c173-f3ad-463f-9cc4-35b953af3d84', 'user5', '${password}', 'user5@test.com'),
        ('b4349db6-db9d-4e03-b566-7e46ea5afbc0', 'user6', '${password}', 'user6@test.com');`,
  );

  console.log('Users created!');
  await client.end();
};

createAdmin();
