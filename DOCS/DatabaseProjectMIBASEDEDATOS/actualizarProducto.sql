create procedure [dbo].[actualizarProducto]
	@id int, @nombre		varchar(50), @imagen	varchar(300),
    @costo int, @valorVenta int, @existencia int
as

update producto set nombre = @nombre,imagen =@imagen,
costo=@costo, valorVenta=@valorVenta, existencia=@existencia
where productoId =@id
select productoId as productoId, productoId as id,nombre, imagen, costo,valorVenta,existencia,estado from producto
GO
