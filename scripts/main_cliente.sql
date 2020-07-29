create table cliente
(
    idcliente varchar(50)  not null
        constraint cliente_pk
            primary key,
    nome      varchar(50)  not null,
    email     varchar(255) not null,
    senha     varchar(255) not null
);

create unique index cliente_email_uindex
    on cliente (email);

create unique index cliente_idcliente_uindex
    on cliente (idcliente);

