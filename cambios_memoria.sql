CREATE TABLE `tse`.`gerencias` (
`idgrencia` INT NOT NULL AUTO_INCREMENT , 
`gerencianombre` VARCHAR(255) NOT NULL , 
`gerenciaacronimo` VARCHAR(255) NULL , 
`gerenciadescripcion` TEXT NULL , 
PRIMARY KEY (`idgrencia`)
);

INSERT INTO `gerencias` (`idgrencia`, `gerencianombre`, `gerenciaacronimo`, `gerenciadescripcion`) 
VALUES (NULL, 'Gerencia General', 'GG', NULL), 
(NULL, 'Gerencia de Asuntos Juridicos', 'GAJ', NULL), 
(NULL, 'Gerencia de Administracion', 'GA', NULL), 
(NULL, 'Gerencia de Fiscalizacion a la Industria Audiovisual', 'GFIA', NULL), 
(NULL, 'Escuela Nacional de Expermientacion y Realizacion Cinematografica', 'ENERC', NULL), 
(NULL, 'Gerencia de Fomento a la Produccion Audiovisual', 'GFPA', NULL), 
(NULL, 'Gerencia de Exhibicion y Audiencias', 'GEA', NULL), 
(NULL, 'Gerencia de Asuntos Internacionales e Institucionales', 'GAII', NULL);

CREATE TABLE `tse`.`subgerencias` (
`idsubgerencia` INT NOT NULL AUTO_INCREMENT , 
`subgerenciagerencia` INT NULL , 
`subgerencianombre` VARCHAR(255) NOT NULL , 
`subgerenciaacronimo` VARCHAR(255) NULL , 
`subgerenciadescripcion` TEXT NULL , 
PRIMARY KEY (`idsubgerencia`)
);

INSERT INTO `subgerencias` (`idsubgerencia`, `subgerenciagerencia`, `subgerencianombre`, `subgerenciaacronimo`, `subgerenciadescripcion`) 
VALUES (NULL, NULL, 'Unidad de Sumarios Administrativos', NULL, NULL), 
(NULL, NULL, 'Observatorio Audiovisual', 'OA', NULL), 
(NULL, NULL, 'Unidad de Despacho', NULL, NULL), 
(NULL, '1', 'Unidad Operativa de Gestion', NULL, NULL), 
(NULL, '1', 'Subgerencia de Recursos Humanos y Organizacion', NULL, NULL), 
(NULL, '1', 'Subgerencia de Prensa y Comunicacion', NULL, NULL), 
(NULL, '8', 'Subgerencia de Gestion Internacional e Institucional', NULL, NULL), 
(NULL, '8', 'Subgerencia de Animacion', NULL, NULL), 
(NULL, '8', 'Subgerencia Administrativa Internacional e Institucional', NULL, NULL), 
(NULL, '8', 'Unidad de Estrategias de Nuevos Mercados Internacionales', NULL, NULL), 
(NULL, '3', 'Subgerencia de Administracion y Finanzas', NULL, NULL), 
(NULL, '3', 'Subgerencia de Gestion en Linea, Sistemas e Infraestructura Informática', NULL, NULL), 
(NULL, '7', 'Subgerencia de Exhibicion', NULL, NULL), 
(NULL, '7', 'Subgerencia de Desarrollo Federal', NULL, NULL), 
(NULL, '6', 'Subgerencia de Gestion de Produccion Audiovisual', NULL, NULL), 
(NULL, '5', 'Secretaria Administrativa', NULL, NULL), 
(NULL, '5', 'Secretaria Academica', NULL, NULL);

CREATE TABLE `tse`.`coordinaciones` (
`idcoordinacion` INT NOT NULL AUTO_INCREMENT , 
`coordinacionsubgerencia` INT NULL , 
`coordinaciongerencia` INT NULL , 
`coordinacionnombre` VARCHAR(255) NOT NULL , 
`coordinacionacronimo` VARCHAR(255) NULL , 
`coordinaciondescripcion` TEXT NULL , 
PRIMARY KEY (`idcoordinacion`)
);

INSERT INTO `coordinaciones` (`idcoordinacion`, `coordinacionsubgerencia`, `coordinaciongerencia`, `coordinacionnombre`, `coordinacionacronimo`, `coordinaciondescripcion`) 
VALUES (NULL, NULL, NULL, 'Unidad de Transparencia Institucional', 'UTI', NULL), 
(NULL, NULL, NULL, 'Coordinacion de Cinemateca Nacional', NULL, NULL), 
(NULL, NULL, NULL, 'Coordinacion de Genero y Diversidad', NULL, NULL), 
(NULL, '4', '1', 'Coordinacion de Asistencia Administrativa de Gerencia General', NULL, NULL), 
(NULL, '5', '1', 'Coordinacion de Administracion de Personal', NULL, NULL), 
(NULL, '5', '1', 'Coordinacion de Desarrollo de Personal', NULL, NULL), 
(NULL, '5', '1', 'Coordinacion de Higiene y Seguridad', NULL, NULL), 
(NULL, '6', '1', 'Coordinacion de Difusion en Medios de Comunicacion', NULL, NULL), 
(NULL, '6', '1', 'Coordinacion de Comunicacion Institucional', NULL, NULL), 
(NULL, '7', '8', 'Coordinacion de Coproducciones', NULL, NULL), 
(NULL, '9', '8', 'Coordinacion Tecnica Administrativa', NULL, NULL), 
(NULL, '9', '8', 'Coordinacion de Promocion de Producciones, Mercados y Festivales Internacionales', NULL, NULL), 
(NULL, '11', '3', 'Coordinacion Administrativa', NULL, NULL), 
(NULL, '11', '3', 'Coordinacion de Planificacion Presupuestaria y Financ.', NULL, NULL), 
(NULL, '11', '3', 'Coordinacion Compras, Contrataciones y Servicios Generales', NULL, NULL), 
(NULL, '13', '7', 'Coordinacion de Contenidos de Medios', NULL, NULL), 
(NULL, '13', '7', 'Coordinacion Red Espacios INCAA', NULL, NULL), 
(NULL, '13', '7', 'Coordinacion Operativa de Medios', NULL, NULL), 
(NULL, '14', '7', 'Coordinacion de Gestion y Desrrollo de Programas Especiales', NULL, NULL), 
(NULL, NULL, '2', 'Coordinacion de Asuntos Contenciosos', NULL, NULL), 
(NULL, NULL, '2', 'Coordinacion de Dictamenes', NULL, NULL), 
(NULL, NULL, '2', 'Coordinacion Administrativa de Asuntos Juridicos', NULL, NULL), 
(NULL, NULL, '4', 'Coordinacion de Infracciones a la Actividad Cinematografica y Exhibicion de Peliculas', NULL, NULL), 
(NULL, NULL, '4', 'Coordinacion de Fiscalizacion, Datos y Seguimiento de Ingresos', NULL, NULL), 
(NULL, '15', '6', 'Coordinacion de Concursos para Otros Medios de Exhibicion', NULL, NULL), 
(NULL, '15', '6', 'Coordinacion de Gestion y Seguimiento de Proyectos de Peliculas', NULL, NULL), 
(NULL, '15', '6', 'Coordinacion de Liquidaciones de Concursos y Subsidios', NULL, NULL),
(NULL, '15', '6', 'Coordinacion de Concursos de Proyectos Cinematograficos', NULL, NULL),
(NULL, '15', '6', 'Coordinacion de Control y Reconocimiento de Costos', NULL, NULL),
(NULL, NULL, '5', 'Coordinacion de Sedes Regionales', NULL, NULL),
(NULL, NULL, '5', 'Coordinacion de Extension', NULL, NULL),
(NULL, NULL, '5', 'Coordinacion de Produccion', NULL, NULL),
(NULL, NULL, '5', 'Coordinacion de Alumnos', NULL, NULL);

CREATE TABLE `tse`.`departamentos` (
`iddepartamento` INT NOT NULL AUTO_INCREMENT , 
`departamentocoordinacion` INT NULL , 
`departamentosubgerencia` INT NULL , 
`departamentogerencia` INT NULL , 
`departamentonombre` VARCHAR(255) NOT NULL , 
`departamentoacronimo` VARCHAR(255) NULL , 
`departamentodescripcion` TEXT NULL , 
PRIMARY KEY (`iddepartamento`)
);

INSERT INTO `departamentos` (`iddepartamento`, `departamentocoordinacion`, `departamentosubgerencia`, `departamentogerencia`, `departamentonombre`, `departamentoacronimo`, `departamentodescripcion`) 
VALUES (NULL, NULL, NULL, NULL, 'Departamento de Asistencia Administrativa y Gestion del Consejo Asesor', NULL, NULL), 
(NULL, NULL, '4', '1', 'Departamento de Calificacion de Contenidos Audiovisuales', NULL, NULL), 
(NULL, NULL, '4', '1', 'Departamento de Control de Calidad Audiovisual', NULL, NULL), 
(NULL, NULL, '5', '1', 'Departamento de Gestion de Licencias y Registro de Presentismo', NULL, NULL), 
(NULL, NULL, '6', '1', 'Departamento de Produccion de Contenidos Audiovisuales', NULL, NULL), 
(NULL, NULL, NULL, '8', 'Departamento de Planeamiento y Organizacion de Eventos Especializ. Intern.', NULL, NULL), 
(NULL, NULL, NULL, '8', 'Departamento de Asistencia Tecnica y Administrativa', NULL, NULL), 
(NULL, '13', '11', '3', 'Departamento de Gestion Documental', NULL, NULL), 
(NULL, '13', '11', '3', 'Departamento de Tesoreria', NULL, NULL), 
(NULL, '13', '11', '3', 'Departamento de Liquidacion de Haberes', NULL, NULL), 
(NULL, '15', '11', '3', 'Departamento de Mantenimiento y Servicios Generales', NULL, NULL), 
(NULL, NULL, NULL, '7', 'Departamento de Gestion y Seguimiento Administrativo', NULL, NULL), 
(NULL, '16', '13', '7', 'Departamento de Programacion de Plataformas de Exhibicion Cine.ar', NULL, NULL), 
(NULL, '16', '13', '7', 'Departamento de Programacion Espacios INCAA y Gaumont', NULL, NULL), 
(NULL, NULL, '14', '7', 'Departamento de Logistica y Organizacion de Eventos', NULL, NULL), 
(NULL, '21', NULL, '2', 'Departamento de Control Legal de Coproducciones Internacionales', NULL, NULL), 
(NULL, '21', NULL, '2', 'Departamento de Acuerdos, Convenios y Contratos de Fomento', NULL, NULL), 
(NULL, '24', NULL, '4', 'Departamento de Control y Fiscalizacion', NULL, NULL), 
(NULL, '26', '15', '6', 'Departamento de Gestion de Creditos y Anticipos de Subsidios Extraordinarios', NULL, NULL), 
(NULL, '26', '15', '6', 'Departamento de Proyectos en Etapa de Produccion', NULL, NULL), 
(NULL, '26', '15', '6', 'Departamento de Evaluacion Previa de Proyectos Cinematograficos', NULL, NULL), 
(NULL, '29', '15', '6', 'Departamento de Analisis y Sistematizacion de Informacion', NULL, NULL), 
(NULL, NULL, '16', '5', 'Departamento de Bedelia', NULL, NULL),
(NULL, NULL, '17', '5', 'Departamento de Biblioteca', NULL, NULL);


CREATE TABLE `tse`.`memorias` (
`id` INT NOT NULL AUTO_INCREMENT , 
`anio` INT NOT NULL , 
`area` VARCHAR(255) NOT NULL , 
PRIMARY KEY (`id`)
);

CREATE TABLE `tse`.`acciones` (
`idaccion` INT NOT NULL , 
`accionmemoria` INT NOT NULL , 
`acciondescripcion` TEXT NULL ,
`accioneje` INT NOT NULL , 
`accionresultados` TEXT NULL , 
`accionresumen` TEXT NOT NULL , 
`acciontipo` VARCHAR(255) NOT NULL,
PRIMARY KEY (`idaccion`)
);

ALTER TABLE `acciones` ADD `acciontitulo` VARCHAR(255) NOT NULL AFTER `acciontipo`;

ALTER TABLE `acciones` CHANGE `accioneje` `accioneje` VARCHAR(255) NOT NULL;

ALTER TABLE `memorias` ADD `areatipo` VARCHAR(255) NOT NULL AFTER `area`;

ALTER TABLE `memorias` ADD `sintesis` TEXT NULL AFTER `areatipo`;

ALTER TABLE `acciones` ADD `acciontags` VARCHAR(255) NOT NULL AFTER `acciontitulo`;

CREATE VIEW acciones_view AS
SELECT *
FROM acciones
left join memorias
on acciones.accionmemoria = memorias.id;