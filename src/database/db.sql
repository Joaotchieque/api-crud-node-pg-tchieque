
/*Criação da Base de dados postgresSQL*/
CREATE DATABASE nodepg;

CREATE TABLE artigos (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    conteudo TEXT NOT NULL,
    autor VARCHAR(255) NOT NULL,
    criado TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO artigos (titulo, conteudo, autor) 
VALUES
('Saude mental','Um estudo de caso','Freitas'),
('Ginecologia','Um estudo de caso em ginecologia','Paiva'),
('Maternidade','Estudo da muulher','Silva');