create procedure [dbo].[guardarCotizacion]
 @consecutivo varchar(30),@usuarioId int,
 @productoId int, @cantidad decimal(18,2), @valorUnitario decimal(18,2),
 @descuento decimal(18,2)
as

insert into cotizacionPorUsuario(fecha,consecutivo,usuarioId,productoId,cantidad,valorUnitario,descuento, estado )
values(getdate(), @consecutivo,@usuarioId,@productoId, @cantidad, @valorUnitario,@descuento,1)

select c.cotizacionPorUsuarioId as id,p.nombre as producto,cantidad,valorUnitario,descuento,
        consecutivo,fecha,c.productoId,c.usuarioId, u.nombre as cliente,
       case when c.estado = 1 then 'GENERADA' else 'COBRADA' end as estado
       from cotizacionPorUsuario c inner join producto p on c.productoId = p.productoId 
inner join usuario u on u.usuarioId = c.usuarioId where u.usuarioId = @usuarioId 

/*
exec guardarCotizacion '102030',6,1,3,40,0
*/
