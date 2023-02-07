create procedure [dbo].[buscarProductoClienteCotizacion]
	@correo		varchar(30)
as
declare @usuarioId int = null

set @usuarioId = (select usuarioId from usuario where correo=  @correo )

	select	u.usuarioId, u.correo, u.nombre
	from	usuario u 
	where	u.correo = isnull(@correo, u.correo)
			and u.estado = '1'
    select productoId as productoId, productoId as id,nombre, imagen, costo,valorVenta,existencia,estado from producto

    select cotizacionPorUsuarioId,fecha,consecutivo,usuarioId,c.productoId,p.nombre,valorUnitario,descuento,
    c.estado from cotizacionPorUsuario c inner join producto p on p.productoId = c.productoId where usuarioId = isnull(@usuarioId, usuarioId)


/* exec buscarProductoClienteCotizacion 'afnarqui9@gmail.com' */