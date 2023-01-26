CREATE TABLE [dbo].[producto] (
    [productoId] INT             IDENTITY (1, 1) NOT NULL,
    [nombre]     NVARCHAR (50)   NULL,
    [imagen]     NVARCHAR (250)  NULL,
    [costo]      DECIMAL (18, 2) NULL,
    [valorVenta] DECIMAL (18, 2) NULL,
    [existencia] INT             NULL,
    [estado]     BIT             NOT NULL
);


GO

