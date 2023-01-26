CREATE TABLE [dbo].[cotizacionPorUsuario] (
    [cotizacionPorUsuarioId] INT                IDENTITY (1, 1) NOT NULL,
    [fecha]                  DATETIMEOFFSET (7) NOT NULL,
    [consecutivo]            NVARCHAR (30)      NOT NULL,
    [usuarioId]              INT                NULL,
    [productoId]             INT                NOT NULL,
    [cantidad]               DECIMAL (18, 4)    NOT NULL,
    [valorUnitario]          DECIMAL (18, 2)    NOT NULL,
    [descuento]              DECIMAL (18, 2)    NOT NULL,
    [estado]                 BIT                NOT NULL
);


GO

