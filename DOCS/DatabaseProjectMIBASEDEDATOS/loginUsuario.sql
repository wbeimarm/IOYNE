alter procedure [dbo].[loginUsuario]
	@correo		varchar(30), @clave varchar(30)
as


-- exec loginUsuario 'afnarqui9@gmail.com'
-- 	update usuario set clave ='lindo' where usuarioId = 2


declare @token varchar(200), @intentos int,@usuarioId int, @usuarioBloqueadoId int, 
@fechaBloqueado [datetimeoffset](7), @minutos int 
set @token = (select NEWID())

if exists (select top 1 perfilId from usuario where correo = @correo and clave=@clave) begin

		set @usuarioBloqueadoId = (select usuarioBloqueadoId from usuarioBloqueado ub inner join usuario u
				on ub.usuarioId = u.usuarioId where correo = @correo)

	    		set @fechaBloqueado = (select fecha from usuarioBloqueado ub inner join usuario u
				on ub.usuarioId = u.usuarioId where correo = @correo)


-- La consulta SQL devuelve la diferencia en segundos : 3600 segundos
set @minutos = (SELECT DATEDIFF(MINUTE, @fechaBloqueado, getdate()))
-- La consulta SQL devuelve la diferencia en minutos : 60 minutos
  if (@minutos >= 120) begin
	 delete usuarioBloqueado
		where usuarioBloqueadoId = @usuarioBloqueadoId 
	end 
	 else 
	begin
	     IF ( @minutos IS NOT NULL)
		 BEGIN
			 select	'el usuario esta bloqueado  por 2 horas' as mensaje
			return
		 END

	end

	select	u.usuarioId, u.correo, u.nombre
			, @token as tokentwo, p.nombre as Rol, u.perfilId
	from	usuario u inner join perfil p on u.perfilId = p.perfilId
	where	u.correo = @correo and clave=@clave
			and u.estado = '1'


	select	nombre  
	from	ruta


end
else begin

if exists (select top 1 perfilId from usuario where correo = @correo) begin
     
	if exists(select top 1 intentos from usuarioBloqueado ub inner join usuario u
				on ub.usuarioId = u.usuarioId where correo = @correo) begin
		set @intentos = (select intentos from usuarioBloqueado ub inner join usuario u
				on ub.usuarioId = u.usuarioId where correo = @correo)
		set @usuarioBloqueadoId = (select usuarioBloqueadoId from usuarioBloqueado ub inner join usuario u
				on ub.usuarioId = u.usuarioId where correo = @correo)
	set @intentos = @intentos + 1
	update usuarioBloqueado set intentos = @intentos
	where usuarioBloqueadoId = @usuarioBloqueadoId 
		if(@intentos) > 2 begin
		 select	'el usuario esta bloqueado por 2 horas' as mensaje
		end else 
		begin 
		  select	'no puede ingresar a la aplicación verifique' as mensaje
		end
		 
	end 
	else 
	begin
	set @usuarioId = (select usuarioId from usuario where correo = @correo)
	 insert into usuarioBloqueado(usuarioId,fecha,intentos) 
	 values(@usuarioId, getdate(), 1)
	 select	'no puede ingresar a la aplicación verifique' as mensaje
	 	  
	end
	
end else 
BEGIN
 select	'no puede ingresar a la aplicación verifique' as mensaje
	 
END
	

	
			
end



GO
