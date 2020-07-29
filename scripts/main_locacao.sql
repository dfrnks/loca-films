create table locacao
(
    idlocacao      varchar(50) not null
        constraint locacao_pk
            primary key,
    idcliente      varchar(50)
        references cliente,
    idcatalogo     varchar(50)
        references catalogo,
    dthr_locacao   timestamp    not null,
    dthr_devolucao timestamp
);

create unique index locacao_idlocacao_uindex
    on locacao (idlocacao);

