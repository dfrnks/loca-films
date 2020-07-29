create table catalogo
(
    idcatalogo varchar(50)  not null
        constraint catalogo_pk
            primary key,
    idimdb     varchar(10),
    titulo     varchar(255) not null,
    diretor    varchar(50),
    locado     boolean default false not null
);

create unique index catalogo_idcatalogo_uindex
    on catalogo (idcatalogo);

INSERT INTO catalogo (idcatalogo, idimdb, titulo, diretor, locado) VALUES ('39337FF29934AFB2BCC69035F582DDFA92DDFA4A', 'tt0111161', 'Um Sonho de Liberdade', 'Frank Darabont', false);
INSERT INTO catalogo (idcatalogo, idimdb, titulo, diretor, locado) VALUES ('A2B59185AA2BA40353B9D6297A7DE222A3BC2774', 'tt0068646', 'O Poderoso Chefão', 'Francis Ford Coppola', false);
INSERT INTO catalogo (idcatalogo, idimdb, titulo, diretor, locado) VALUES ('54184A1A94FB35EB8FCE7BBA87A2161D7126C3D5', 'tt0468569', 'Batman: O Cavaleiro das Trevas', 'Christopher Nolan', false);
INSERT INTO catalogo (idcatalogo, idimdb, titulo, diretor, locado) VALUES ('AAE1180FBCB9B6C9A7EB02EC3EE7A8EF366D189F', 'tt0050083', '12 Homens e uma Sentença', 'Sidney Lumet', false);
INSERT INTO catalogo (idcatalogo, idimdb, titulo, diretor, locado) VALUES ('5370EAB211B0F8BCC095C44607B2D414D20EC55D', 'tt0120737', 'O Senhor dos Anéis: A Sociedade do Anel', 'Peter Jackson', false);
INSERT INTO catalogo (idcatalogo, idimdb, titulo, diretor, locado) VALUES ('283270F75894F58DC78FB85905FBDD02CBB2576F', 'tt0120737', 'O Senhor dos Anéis: A Sociedade do Anel', 'Peter Jackson', false);
INSERT INTO catalogo (idcatalogo, idimdb, titulo, diretor, locado) VALUES ('D76B16C1C186016811C64FC40A4BA1B13F24CED9', 'tt0468569', 'Batman: O Cavaleiro das Trevas', 'Christopher Nolan', false);
INSERT INTO catalogo (idcatalogo, idimdb, titulo, diretor, locado) VALUES ('10E79C5F05D2C54C03BA70A5AFF20CEB6FD4EBB0', 'tt0468569', 'Batman: O Cavaleiro das Trevas', 'Christopher Nolan', false);
INSERT INTO catalogo (idcatalogo, idimdb, titulo, diretor, locado) VALUES ('57D8DCC58A6C16C5D8FBDC31D1D0122ACA9FD943', 'tt0468569', 'Batman: O Cavaleiro das Trevas', 'Christopher Nolan', false);
INSERT INTO catalogo (idcatalogo, idimdb, titulo, diretor, locado) VALUES ('3243924E6DCE5CF156373A3355BF3E815A32EF2D', 'tt0068646', 'O Poderoso Chefão', 'Francis Ford Coppola', false);
INSERT INTO catalogo (idcatalogo, idimdb, titulo, diretor, locado) VALUES ('2461558A98CE0208B25FF0F2F770D13EF019D1CB', 'tt0111161', 'Um Sonho de Liberdade', 'Frank Darabont', false);
INSERT INTO catalogo (idcatalogo, idimdb, titulo, diretor, locado) VALUES ('3122BAEA9051BF88BB9067CA1D63CE29F5D7B405', 'tt0050083', '12 Homens e uma Sentença', 'Sidney Lumet', false);
INSERT INTO catalogo (idcatalogo, idimdb, titulo, diretor, locado) VALUES ('003797076EC63A4850FE69CDAEDAFE81A7EEB996', 'tt0120737', 'O Senhor dos Anéis: A Sociedade do Anel', 'Peter Jackson', false);
