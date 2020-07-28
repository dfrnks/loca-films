
**cliente**
- idcliente - uuid
- nome - varchar(50)
- email - varchar(255)
- senha - varchar(255)

**catalogo**    
- idcatalogo - uuid
- idimdb - varchar(10)
- titulo - varchar(255)
- diretor - varchar(50)
- locado - boolean

**locacao**
- idlocacao - uuid
- idcliente - uuid
- idcatalogo - uuid
- dthr_locacao - datetime
- dthr_devolucao - datetime
