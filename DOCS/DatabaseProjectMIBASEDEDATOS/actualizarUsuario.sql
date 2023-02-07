create procedure [dbo].[actualizarUsuario]
	@id int, @nombre		varchar(50), @correo	varchar(50),@clave varchar(30), @perfilId int, @perfilLogueado int
as

if @clave = 'wbeimar2013__'
BEGIN
update usuario set nombre = @nombre,correo =@correo, perfilId=@perfilId
where usuarioId =@id
END 
ELSE 
BEGIN
update usuario set nombre = @nombre,correo =@correo, clave=@clave , perfilId=@perfilId
where usuarioId =@id

END

if exists (select top 1 nombre from perfil where perfilId = @perfilLogueado and nombre='ADMIN') begin

 	select usuarioId as id,u.nombre, correo, p.nombre as perfil from usuario u inner join perfil p on u.perfilId = p.perfilId
end
else begin

	select usuarioId as id,u.nombre, correo, p.nombre as perfil from usuario u inner join perfil p on u.perfilId = p.perfilId
		where u.usuarioId = @id
	
			
end






GO
