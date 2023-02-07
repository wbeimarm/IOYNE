create procedure [dbo].[guardarProducto]
 @nombre		varchar(50), @imagen	varchar(300),
    @costo int, @valorVenta int, @existencia int
as


insert into producto(nombre, imagen, costo, valorVenta,existencia, estado )
values(@nombre,@imagen, @costo, @valorVenta,@existencia,1)
select productoId as productoId, productoId as id,nombre, imagen, costo,valorVenta,existencia,estado from producto
go

