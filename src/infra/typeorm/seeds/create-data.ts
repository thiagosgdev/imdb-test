import 'dotenv/config';

import { Client } from 'pg';

const client = new Client({
  user: `${process.env.DB_USERNAME}`,
  host: `${process.env.DB_HOST}`,
  database: `${process.env.DB_NAME}`,
  password: `${process.env.DB_PASSWORD}`,
  port: Number(`${process.env.DB_PORT}`),
});

const createData = async () => {
  await client.connect();
  await client.query(
    ` 
    INSERT INTO movies (id, name, description, director, genre) VALUES
        ('ebf9593e-87a1-412c-af49-a1e575ee02eb', 'Pulp Fiction: Tempo de Violência', 'As vidas de dois assassinos da máfia, um boxeador, um gângster e sua esposa, e um par de bandidos se entrelaçam em quatro histórias de violência e redenção.', 'Quentin Tarantino', 'action'),
        ('a5acbe34-996a-4135-84f3-d96b4f24a205','O Senhor dos Anéis: A Sociedade do Anel', 'Um manso hobbit do Condado e oito companheiros partem em uma jornada para destruir o poderoso Um Anel e salvar a Terra-média das Trevas.', 'Peter Jackson', 'action'),
        ('04c0aaee-2ec2-4945-830b-39886cfe7738','Se Beber, Não Case!', 'Tres amigos se acordam duma despedida de solteiro em As Vegas sem memoria da noite anterior e o solteiro desaparecido. Eles vão lhe procurar pela cidade toda antes do casamento.', 'Todd Phillips', 'comedy');
    

    INSERT INTO votes (user_id, movie_id, score) VALUES
    ('059029ca-5282-47b6-bb1f-3760f9c6eae4', 'ebf9593e-87a1-412c-af49-a1e575ee02eb', 3),
    ('2a897331-46fc-498e-97f1-f4e4e75287c0', 'ebf9593e-87a1-412c-af49-a1e575ee02eb', 2),
    ('0c4ce04c-d2f5-43f8-9f0c-19d3a1205332', 'ebf9593e-87a1-412c-af49-a1e575ee02eb', 4),
    ('981b761d-c36c-464e-91a6-dd9b9cd3c366', 'ebf9593e-87a1-412c-af49-a1e575ee02eb', 0),
    ('fc63c173-f3ad-463f-9cc4-35b953af3d84', 'ebf9593e-87a1-412c-af49-a1e575ee02eb', 3),
    ('b4349db6-db9d-4e03-b566-7e46ea5afbc0', 'ebf9593e-87a1-412c-af49-a1e575ee02eb', 4),
    ('059029ca-5282-47b6-bb1f-3760f9c6eae4', 'a5acbe34-996a-4135-84f3-d96b4f24a205', 3),
    ('2a897331-46fc-498e-97f1-f4e4e75287c0', 'a5acbe34-996a-4135-84f3-d96b4f24a205', 3),
    ('0c4ce04c-d2f5-43f8-9f0c-19d3a1205332', 'a5acbe34-996a-4135-84f3-d96b4f24a205', 3),
    ('981b761d-c36c-464e-91a6-dd9b9cd3c366', 'a5acbe34-996a-4135-84f3-d96b4f24a205', 3),
    ('fc63c173-f3ad-463f-9cc4-35b953af3d84', 'a5acbe34-996a-4135-84f3-d96b4f24a205', 2),
    ('b4349db6-db9d-4e03-b566-7e46ea5afbc0', 'a5acbe34-996a-4135-84f3-d96b4f24a205', 4),
    ('059029ca-5282-47b6-bb1f-3760f9c6eae4', '04c0aaee-2ec2-4945-830b-39886cfe7738', 4),
    ('2a897331-46fc-498e-97f1-f4e4e75287c0', '04c0aaee-2ec2-4945-830b-39886cfe7738', 1),
    ('0c4ce04c-d2f5-43f8-9f0c-19d3a1205332', '04c0aaee-2ec2-4945-830b-39886cfe7738', 1),
    ('981b761d-c36c-464e-91a6-dd9b9cd3c366', '04c0aaee-2ec2-4945-830b-39886cfe7738', 2),
    ('fc63c173-f3ad-463f-9cc4-35b953af3d84', '04c0aaee-2ec2-4945-830b-39886cfe7738', 1),
    ('b4349db6-db9d-4e03-b566-7e46ea5afbc0', '04c0aaee-2ec2-4945-830b-39886cfe7738', 0);

    INSERT INTO actors (id, name, resume) VALUES 
        ('f25d727f-47dc-4fa4-906f-c42100c0363d', 'Elijah Wood', 'Elijah Wood is an American actor best known for portraying Frodo Baggins in Peter Jacksons blockbuster Lord of the Rings film trilogy.'),
        ('15a9f8be-9a9d-4112-aa90-d0c018125cb5', 'Ian McKellen', 'Widely regarded as one of greatest stage and screen actors both in his native Great Britain and internationally, twice nominated for the Oscar and recipient of every major theatrical award in the UK and US.'),
        ('11440b96-c3a8-4e98-a9a7-d05a5f57885a', 'Orlando Bloom', 'Orlando Jonathan Blanchard Copeland Bloom was born on January 13, 1977 in Canterbury, Kent, England.'),
        ('78715bdf-7ea4-48b6-a272-df57377d02d1', 'Sean Astin', 'Sean Patrick Astin (né Duke; February 25, 1971) is an American actor, voice actor, screenwriter, director, producer, family man, author, marathon runner, political activist and philanthropist '),
        ('cd37b08a-6870-4a55-a089-d6f0afbb371c', 'Sala Baker', 'Sala Baker was born on September 22, 1976 in Wellington, New Zealand. He is known for Trem-Bala (2022), Deadpool 2 (2018) and O Mandaloriano (2019).'),
        ('2c118bc1-31ad-4697-8b18-8b83cf9f3f99', 'John Travolta','John Joseph Travolta was born in Englewood, New Jersey, one of six children of Helen Travolta '),
        ('97e877d6-f59f-4a9d-94e2-8fbb1ae48af4', 'Uma Thurman','Uma Karuna Thurman was born in Boston, Massachusetts, into a highly unorthodox and internationally-minded family.'),
        ('0267c9bd-802c-4fe0-b56e-a132edce314a', 'Samuel L. Jackson','Samuel L. Jackson is an American producer and highly prolific actor, having appeared in over 100 films.'),
        ('7c79ce6e-3ede-4ea0-b4a1-e0a520754f82','Zach Galifianakis','Zach Galifianakis was born in Wilkesboro, North Carolina, to Mary Frances (Cashion), who owned a community arts center, and Harry Galifianakis, a heating oil vendor.'),
        ('ece1ccd7-d70f-4a92-a1e1-96c09aca37af','Bradley Cooper ','Bradley Charles Cooper was born on January 5, 1975 in Philadelphia, Pennsylvania. ');

    INSERT INTO casts (actor_id, movie_id, role) VALUES
        ('f25d727f-47dc-4fa4-906f-c42100c0363d', 'a5acbe34-996a-4135-84f3-d96b4f24a205', 'Frodo'),
        ('15a9f8be-9a9d-4112-aa90-d0c018125cb5', 'a5acbe34-996a-4135-84f3-d96b4f24a205', 'Gandalf'),
        ('11440b96-c3a8-4e98-a9a7-d05a5f57885a', 'a5acbe34-996a-4135-84f3-d96b4f24a205', 'Legolas'),
        ('78715bdf-7ea4-48b6-a272-df57377d02d1', 'a5acbe34-996a-4135-84f3-d96b4f24a205', 'Sam'),
        ('cd37b08a-6870-4a55-a089-d6f0afbb371c', 'a5acbe34-996a-4135-84f3-d96b4f24a205', 'Sauron'),
        ('2c118bc1-31ad-4697-8b18-8b83cf9f3f99', 'ebf9593e-87a1-412c-af49-a1e575ee02eb', 'Vicent'),
        ('97e877d6-f59f-4a9d-94e2-8fbb1ae48af4', 'ebf9593e-87a1-412c-af49-a1e575ee02eb', 'Mia'),
        ('0267c9bd-802c-4fe0-b56e-a132edce314a', 'ebf9593e-87a1-412c-af49-a1e575ee02eb', 'Jules'),
        ('7c79ce6e-3ede-4ea0-b4a1-e0a520754f82', '04c0aaee-2ec2-4945-830b-39886cfe7738', 'Alan'),
        ('ece1ccd7-d70f-4a92-a1e1-96c09aca37af', '04c0aaee-2ec2-4945-830b-39886cfe7738', 'Phil');
    `,
  );
  console.log('All done!');
  await client.end();
};

createData();
