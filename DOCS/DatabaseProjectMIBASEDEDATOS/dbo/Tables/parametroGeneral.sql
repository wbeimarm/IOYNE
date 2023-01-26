CREATE TABLE [dbo].[parametroGeneral] (
    [parametroGeneralId] INT             IDENTITY (1, 1) NOT NULL,
    [nombre]             NVARCHAR (50)   NULL,
    [direccion]          NVARCHAR (50)   NULL,
    [telefono]           NVARCHAR (50)   NULL,
    [descuento]          BIT             NOT NULL,
    [tipoDescuento]      BIT             NOT NULL,
    [valorDescuento]     DECIMAL (18, 2) NOT NULL,
    [estado]             BIT             NOT NULL
);


GO

