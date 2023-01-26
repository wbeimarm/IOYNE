CREATE TABLE [dbo].[usuario] (
    [usuarioId] INT             IDENTITY (1, 1) NOT NULL,
    [nombre]    NVARCHAR (50)   NULL,
    [perfilId]  INT             NULL,
    [correo]    NVARCHAR (50)   NOT NULL,
    [estado]    BIT             NOT NULL,
    [clave]     VARBINARY (350) NOT NULL
);


GO

