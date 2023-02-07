SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[guardarUsuario]
	@nombre		varchar(50),	@correo	varchar(50)
as

declare @perfil int = null 
set @perfil = (select perfilId from perfil where nombre ='CLIENTE')

insert into usuario(nombre,perfilId,correo,estado)
values(@nombre,@perfil,@correo,1)


select usuarioId as id,u.nombre, correo, p.nombre as perfil from usuario u inner join perfil p on u.perfilId = p.perfilId

GO 
