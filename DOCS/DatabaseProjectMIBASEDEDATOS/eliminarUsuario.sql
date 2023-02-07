create procedure [dbo].[eliminarUsuario]
	@id int
as

delete usuario
where usuarioId =@id
select usuarioId as id, nombre, correo from usuario
GO
