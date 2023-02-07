create procedure [dbo].[eliminarProducto]
	@id int
as

delete producto
where productoId =@id

select productoId as productoId, productoId as id,nombre, imagen, costo,valorVenta,existencia,estado from producto
GO
