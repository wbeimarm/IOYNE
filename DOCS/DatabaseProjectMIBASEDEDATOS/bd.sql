create TABLE [dbo].[usuario](
	[usuarioId] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [nvarchar](50) NULL,
	[perfilId] [int] NULL,
	[correo] [nvarchar](50) NOT NULL,
	[estado] [bit] NOT NULL,
    [clave] [varchar](350) NULL
)
go
CREATE TABLE [dbo].[ruta](
	[rutaId] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [varchar](80) NULL,
	[descripcion] [varchar](250) NULL
) 

go
CREATE TABLE [dbo].[perfil](
	[perfilId] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [varchar](7) NULL
)
go


CREATE TABLE [dbo].[rutaPermiso](
	[rutaPermisoId] [int] IDENTITY(1,1) NOT NULL,
	[rutaId] [int] NULL,
	[perfilId] [int] NULL
)
GO
CREATE TABLE [dbo].[producto](
	[productoId] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [nvarchar](50) NULL,
	[imagen] [nvarchar](250) NULL,
	[costo] [decimal](18, 2) NULL,
	[valorVenta] [decimal](18, 2) NULL,
	[existencia] [int] NULL,
	[estado] [bit] NOT NULL
)
GO
CREATE TABLE [dbo].[cotizacionPorUsuario](
	[cotizacionPorUsuarioId] [int] IDENTITY(1,1) NOT NULL,
	[fecha] [datetimeoffset](7) NOT NULL,
	[consecutivo] [nvarchar](30) NOT NULL,
	[usuarioId] [int] NULL,
	[productoId] [int] NOT NULL,
	[cantidad] [decimal](18, 4) NOT NULL,
	[valorUnitario] [decimal](18, 2) NOT NULL,
    [descuento] [decimal](18, 2) NOT NULL,
	[estado] [bit] NOT NULL
)
GO 

CREATE TABLE [dbo].[parametroGeneral](
	[parametroGeneralId] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [nvarchar](50) NULL,
	[direccion] [nvarchar](50) NULL,
	[telefono] [nvarchar](50) NULL,
	[descuento] [bit] NOT NULL,
	[tipoDescuento] [bit]NOT NULL,
	[valorDescuento] [decimal](18, 2) NOT NULL,
	[estado] [bit] NOT NULL
)

create TABLE [dbo].[usuarioBloqueado](
	[usuarioBloqueadoId] [int] IDENTITY(1,1) NOT NULL, 
	[usuarioId] [int] NOT NULL,
	[fecha] [datetimeoffset](7) NOT NULL,
	[intentos] [int] NOT NULL,
)



SELECT * from usuario
go 
SELECT * from ruta
go 
select * from perfil
GO 
select * from rutaPermiso
GO 
select * from producto
go 
SELECT * FROM cotizacionPorUsuario
go
select * from parametroGeneral

insert into perfil(nombre)
values('ADMIN'),
('GESTOR'),
('CLIENTE') 

insert into usuario(nombre,perfilId,correo,estado,clave)
values('Andrés',1,'lindo',1,'lindo')

insert into ruta(nombre,descripcion)
values('cliente', 'datos del cliente'),
('productos', 'datos de un producto'),
('cotización','datos de una cotización')

insert into rutaPermiso(rutaId,perfilId)
values(1,2)

select * from producto

insert into parametroGeneral(nombre, direccion, telefono,descuento,tipoDescuento,valorDescuento,estado)
values('IOYNE','calle Siempre viva 742','3207330201',1,1,10,1)

insert into producto(nombre,imagen,costo,valorVenta,existencia,estado)
values
('Star Wars','https://res.cloudinary.com/drqk6qzo7/image/upload/v1664048794/starwars_ymtvkm.jpg',20,40,100,1),
('Minions','https://res.cloudinary.com/drqk6qzo7/image/upload/v1664049120/miniuns_vl61xm.jpg',30,60,200,1),
('Fast and Furious','https://res.cloudinary.com/drqk6qzo7/image/upload/v1664049184/rapidoyfurioso_iok3zj.webp',40,80,300,1),
('The Lord of the Rings','https://res.cloudinary.com/drqk6qzo7/image/upload/v1664049259/anillo_z0h7g6.jpg',80,160,400,1)


