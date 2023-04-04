-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 04-04-2023 a las 15:46:08
-- Versión del servidor: 10.4.24-MariaDB
-- Versión de PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "-03:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `tse`
--

CREATE DATABASE `tse`;

USE tse;


-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `areas`
--

CREATE TABLE `areas` (
  `idareas` int(11) NOT NULL,
  `areasnombre` varchar(255) DEFAULT NULL,
  `areasdescripcion` varchar(255) NOT NULL,
  `areasultmodfecha` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `areasultmodusuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `areas`
--

INSERT INTO `areas` (`idareas`, `areasnombre`, `areasdescripcion`, `areasultmodfecha`, `areasultmodusuario`) VALUES
(1, 'GAII', 'Gerencia de Asuntos Internacionales e Institucionales', '2023-03-07 22:38:13', 1),
(2, 'ENERC', 'Escuela Nacional de Experimentación y Realización Cinematográfica', '2023-03-07 22:38:13', 1),
(3, 'GA', 'Gerencia de Administración', '2023-03-07 22:38:13', 1),
(4, 'GFIA', 'Gerencia de Fiscalización a la Industria Audiovisual', '2023-03-07 22:38:13', 1),
(5, 'GAJ', 'Gerencia de Asuntos Jurídicos', '2023-03-07 22:38:13', 1),
(6, 'GG', 'Gerencia General', '2023-03-07 22:38:13', 1),
(7, 'OA', 'Observatorio Audiovisual', '2023-03-07 22:38:13', 1),
(8, 'PRES', 'Presidencia', '2023-03-07 22:38:13', 1),
(9, 'GEA', 'Gerencia de Exhibición y Audiencias', '2023-03-07 22:38:13', 1),
(10, 'GFPA', 'Gerencia de Fomento a la Producción Audiovisual', '2023-03-07 22:38:13', 1),
(11, 'SGDF', 'Subgerencia de Desarrollo Federal', '2023-03-07 22:38:13', 1),
(12, 'SGGLSEII', 'Subgerencia de Gestión en Línea, Sistemas e Infraestructura Informática', '2023-03-07 22:38:13', 1),
(13, 'SGPC', 'Subgerencia de Prensa y Comunicación', '2023-03-07 22:38:13', 1),
(14, 'SGRRHHO', 'Subgerencia de Recursos Humanos y Organización', '2023-03-07 22:38:13', 1),
(15, 'UTI', 'Unidad de Transparencia Institucional', '2023-03-07 22:38:13', 1),
(16, 'SGAYF', 'Subgerencia de Administración y Finanzas', '2023-03-07 22:38:13', 1),
(17, 'UAI', 'Unidad de Auditoría Interna', '2023-03-07 22:38:13', 1),
(18, 'VPRES', 'Vicepresidencia', '2023-03-21 16:33:55', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ejes`
--

CREATE TABLE `ejes` (
  `idejes` int(11) NOT NULL,
  `ejesnombre` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `ejes`
--

INSERT INTO `ejes` (`idejes`, `ejesnombre`) VALUES
(1, 'Fomento a la producción de contenidos audiovisuales'),
(2, 'Difusión y Promoción nacional e internacional'),
(3, 'Promover el Desarrollo, Capacitación, Formación e Innovación de la Industria Audiovisual'),
(4, 'Normativa y Gestión');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `lineas`
--

CREATE TABLE `lineas` (
  `idlineas` int(11) NOT NULL,
  `lineasnombre` varchar(255) DEFAULT NULL,
  `lineasobjetivo` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `lineas`
--

INSERT INTO `lineas` (`idlineas`, `lineasnombre`, `lineasobjetivo`) VALUES
(1, 'Mantener acuerdos con fondos internacionales', 1),
(2, 'Gestionar el ingreso a otros fondos de apoyo cultural existentes', 1),
(3, 'Organizar VENTANA SUR cada año junto con el Marché du Film – Festival de Cannes-', 2),
(4, 'Fortalecer la Industria Audiovisual para optimizar su aporte al crecimiento económico y la generación de empleo', 2),
(5, 'Dar cumplimiento a la ejecución del porcentaje del 50% de los recursos tributarios, fijados por Ley, destinado para tal fin', 3),
(6, 'Elevar el costo medio para ajustar a los incrementos de los costos de producción y a la demanda real', 3),
(7, 'Estimular el desarrollo de proyectos', 3),
(8, 'Impulsar la producción de series internacionales', 3),
(9, 'Impulsar nuevos proyectos, acercando herramientas a la Industria Audiovisual a nivel Federal', 4),
(10, 'Facilitar el acceso de los productores de todo el país a los subsidios del INCAA mediante la utilización de la plataforma INCAA en línea', 4),
(11, 'Propender que la producción nacional sea representativa de la diversidad cultural del país', 4),
(12, 'Consolidar la comunidad asociada al consumo de Cine Argentino', 5),
(13, 'Profundizar el cross channel: TV/VOD/ Social Media/Territorios', 5),
(14, 'Sumar taquilla a los estrenos nacionales', 5),
(15, 'Aportar a la internacionalización del cine y los contenidos argentinos', 5),
(16, 'Participar a través de la Agencia de Promoción Internacional de la Industria Audiovisual en Festivales y Mercados Internacionales', 6),
(17, 'Brindar apoyos para la participación de las producciones nacionales en Festivales y Mercados Internacionales', 6),
(18, 'Fomentar acciones tendientes a la conservación y restauración del acervo audiovisual nacional', 7),
(19, 'Relanzar la página web institucional', 8),
(20, 'Ampliar mecanismos para el acceso a la Información pública del organismo', 8),
(21, 'Profundizar la federalización de la ENERC', 9),
(22, 'Capacitar para estimular la producción y circulación de contenidos audiovisuales de exportación', 9),
(23, 'Promover la capacitación al personal', 10),
(24, 'Jerarquizar y fortalecer la carrera del personal de gestión', 10),
(25, 'Concluir con la ejecución de planos de arquitectura e instalaciones de los edificios del organismo para mejorar el layout y la eficiencia', 11),
(26, 'Participar activamente a través de cuadros técnicos del INCAA en debates que involucren a la Industria Audiovisual para plasmar la visión del Instituto y de la Industria', 12),
(27, 'Promover la actualización de la Ley de Cine y de calificación', 12),
(28, 'Incorporar nuevas herramientas que nos lleve a una gestión por objetivos y resultados', 13),
(29, 'Fortalecer la aplicación de nuevas tecnologías', 13),
(30, 'Fortalecer la política de Recursos Humanos', 13),
(31, 'Consolidar los mecanismos que garanticen la transparencia en la gestión', 14),
(32, 'Afianzar el uso de la Ventanilla Única Y el Control de Calidad  Audiovisual y sus circuitos asociados', 14);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `objetivos`
--

CREATE TABLE `objetivos` (
  `idobjetivos` int(11) NOT NULL,
  `objetivosnombre` varchar(255) DEFAULT NULL,
  `objetivoseje` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `objetivos`
--

INSERT INTO `objetivos` (`idobjetivos`, `objetivosnombre`, `objetivoseje`) VALUES
(1, 'Gestionar y mantener acuerdos con otros fondos internacionales que faciliten las coproducciones internacionales', 1),
(2, 'Facilitar la participación financiera mixta y de privados', 1),
(3, 'Viabilizar el desarrollo de contenidos audiovisuales multiplataforma', 1),
(4, 'Federalizar y fomentar las producciones regionales con los subsidios del INCAA', 1),
(5, 'Generar audiencias para el Cine Argentino', 2),
(6, 'Expandir a la región y al mundo las producciones nacionales', 2),
(7, 'Optimizar la conservación y restauración del acervo fílmico nacional', 2),
(8, 'Mejorar el acceso a la información', 2),
(9, 'Promover programas de capacitación para el desarrollo y reconocimiento de la Industria audiovisual argentina', 3),
(10, 'Fortalecer las capacidades de los recursos humanos', 3),
(11, 'Impulsar y acompañar el desarrollo de las nuevas tecnologías de información y comunicación', 3),
(12, 'Bregar por una normativa actualizada que acompañe el crecimiento de la Industria Audiovisual', 4),
(13, 'Optimizar la Gestión', 4),
(14, 'Perseverar  y profundizar en  la transparencia', 4);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `pegi`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `pegi` (
`idplanesdeaccion` int(11)
,`planesdeaccionnombre` text
,`planesdeaccionlinea` int(11)
,`planesdeaccionarea` int(11)
,`idareas` int(11)
,`areasnombre` varchar(255)
,`idlineas` int(11)
,`lineasnombre` varchar(255)
,`lineasobjetivo` int(11)
,`idobjetivos` int(11)
,`objetivosnombre` varchar(255)
,`objetivoseje` int(11)
,`idejes` int(11)
,`ejesnombre` varchar(255)
);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `planesdeaccion`
--

CREATE TABLE `planesdeaccion` (
  `idplanesdeaccion` int(11) NOT NULL,
  `planesdeaccionnombre` text DEFAULT NULL,
  `planesdeaccionlinea` int(11) DEFAULT NULL,
  `planesdeaccionarea` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `planesdeaccion`
--

INSERT INTO `planesdeaccion` (`idplanesdeaccion`, `planesdeaccionnombre`, `planesdeaccionlinea`, `planesdeaccionarea`) VALUES
(1, 'Promover la participación de producciones independientes en las convocatorias de Ibermedia para que puedan acceder a asistencia técnica y financiera del fondo', 1, 1),
(2, 'Contribuir al desarrollo de la cinematografía dentro del espacio audiovisual de los países iberoamericanos a través de la participación del Instituto en el Programa Ibermedia', 1, 1),
(3, 'Potenciar el cine independiente mediante el acceso al financiamiento de estos fondos para la cooperación y coproducción con  los países miembros de la CAACI', 2, 1),
(4, 'Explorar y gestionar el ingreso de Argentina, a través del Instituto Nacional de Cine y Artes Audiovisuales, a nuevos fondos de fomento audiovisuales internacionales', 2, 1),
(5, 'Coordinar la realización', 3, 1),
(6, 'Generar los requerimientos de contrataciones necesarias', 3, 1),
(7, 'Gestionar sponsoreos para el Mercado', 3, 1),
(8, 'Realizar la comunicación del Evento', 3, 13),
(9, 'Comercializar  los stands a Agentes de Ventas, Film Commissions y Provincias', 3, 1),
(10, 'Convocar a los distintos actores de la industria audiovisual', 3, 1),
(11, 'Promover la coproducción, financiación y distribución internacional de los contenidos latinoamericanos', 3, 1),
(12, 'Investigaciones sobre Impacto económico y tributario del sector audiovisual ampliado a la dimensión federal y de género  (regiones y provincias)', 4, 7),
(13, 'Análisis de sustentabilidad de la política de fomento: evolución del fondo de fomento', 4, 7),
(14, 'Reforzar los marcos jurídicos de la propiedad intelectual  y dotarlos de mayor eficacia para hacer frente a la piratería', 4, 5),
(15, 'Ampliar los estudios prospectivos para diseñar políticas y acciones que 	contemplen los cambios marcados por las tendencias mundiales en 	producción, distribución, exhibición y consumo de contenidos audiovisuales', 4, 7),
(16, 'Participar en la elaboración de la planificación estratégica elaborando encuestas y estudios que identifiquen necesidades del sector', 4, 7),
(17, 'Focalizar en la formación de las empresas del sector, para que las empresas audiovisuales mejoren su capacidad para encontrar socios para la producción y venta de sus obras', 4, 2),
(18, 'Optimizar los procesos administrativos en el otorgamiento de subsidios y anticipos a los distintos proyectos presentados', 5, 3),
(19, 'Planificar y establecer criterios de anticipos a tasa 0 a otorgar por año calendario', 5, 4),
(20, 'Establecer sistemas de control para el otorgamiento de subsidios y anticipos mediante la fijación de plazos de cumplimiento de las distintas etapas de la producción audiovisual para facilitar el seguimiento y control de los  proyectos audiovisuales activos', 5, 10),
(21, 'Contribuir a la producción de contenidos de alta calidad capaces de competir en mercados cada vez más competitivos y atomizados', 6, 4),
(22, 'Planificar los subsidios al cine y otras formas de exhibición para generar una cantidad y calidad óptima de producciones que aporten valor cultural, trabajo calificado e ingresos de divisas al país', 6, 4),
(23, 'Instrumentar concursos y otras acciones de fomento para el cine y el audiovisual nacional, como para otras plataformas de exhibición', 7, 10),
(24, 'Coadyuvar la conformación de desarrollos de proyectos con un plan de negocio que desglose íntegramente al mismo en sus diversas fases estéticas, presupuestarias, logísticas y de mercado, que le den credibilidad y claridad para fomentar la participación económica de inversores, en un marco profesional de confianza y compromiso', 7, 10),
(25, 'Lograr una diversificación y mayor productividad en la generación de proyectos', 7, 4),
(26, 'Propiciar incentivos en el fomento a la producción en materia de cupos laborales de discapacidad, diversidades y géneros que garanticen la igualdad de oportunidades', 7, 4),
(27, 'Propiciar políticas de incentivos en el fomento a la producción de coproducciones  federales con apoyos de los distintos organismos provinciales  de fomento al audiovisual', 7, 4),
(28, 'Propiciar políticas de incentivos económicos de devolución  (cash  rebate u otros) para proyectos de inversión extranjera que fortalezcan el ingreso de divisas y el desarrollo de la industria audiovisual nacional', 7, 4),
(29, 'Propiciar políticas de incentivos en el fomento a la producción cumpliendo pautas de sustentabilidad respecto al cuidado del medioambiente', 7, 4),
(30, 'Propiciar incentivos en el fomento a la producción en materia de cupos laborales de discapacidad, diversidades y géneros que garanticen la igualdad de oportunidades', 7, 4),
(31, 'Propiciar políticas de incentivos en el fomento a la producción de coproducciones  federales con apoyos de los distintos organismos provinciales  de fomento al audiovisual', 7, 4),
(32, 'Propiciar políticas de incentivos económicos de devolución  (cash  rebate u otros) para proyectos de inversión extranjera que fortalezcan el ingreso de divisas y el desarrollo de la industria audiovisual nacional', 7, 4),
(33, 'Propiciar políticas de incentivos en el fomento a la producción cumpliendo pautas de sustentabilidad respecto al cuidado del medioambiente', 7, 4),
(34, 'Delinear y reglamentar un Régimen de Fomento de Producción de Series Audiovisuales', 8, 4),
(35, 'Establecer los procedimientos generales y la modalidad de convocatoria para el mismo', 8, 10),
(36, 'Establecer mesas de discusión estratégicas respecto al fomento a la producción y distintos servicios de producción audiovisual sobre contenidos para otros medios de exhibición', 8, 4),
(37, 'Presentar los términos, condiciones y procedimientos que regirán el funcionamiento del Régimen de Fomento a la Producción de Series Audiovisuales Internacionales una vez creado', 8, 10),
(38, 'Generar nuevas herramientas y fuentes de recursos para el fomento y el desarrollo de producciones argentinas para los diversos contenidos audiovisuales', 9, 4),
(39, 'Promover la utilización de las nuevas tecnologías que permitan  incorporar innovación y creatividad que facilite la inserción y competitividad de las producciones nacionales en el mercado internacional', 9, 4),
(40, 'Articular con las Film Commissions  provinciales para fortalecer el desarrollo audiovisual federal', 9, 4),
(41, 'Celebrar convenios de articulación con los diferentes organismos provinciales de fomento a la producción', 9, 4),
(42, 'Potenciar la empleabilidad de los jóvenes egresados/as en el campo audiovisual', 9, 2),
(43, 'Ampliar las prestaciones y la integración  entre la plataforma INCAA EN LÍNEA y los distintos sistemas de la administración pública de Gestión Documental  Electrónica, Sistema Integrado de gestión Financiera,  de Trámites a Distancia, entre otros', 10, 12),
(44, 'Alcanzar la digitalización de la totalidad de los procesos', 10, 12),
(45, 'Acercar capacitaciones y tutoriales a los diferentes actores de la Industria Audiovisual a través de la plataforma INCAA en línea vía streaming, facilitando consultas y seguimiento', 10, 12),
(46, 'Alentar la producción de películas sobre temas sociales, de perspectiva de género, culturales, religiosos, políticos y ambientales que expongan las diferentes realidades', 11, 8),
(47, 'Propiciar políticas de inclusión, accesibilidad y usabilidad en los diferentes ejes de fomento a producción y exhibición de la industria audiovisual', 11, 8),
(48, 'Dar a conocer diferentes expresiones culturales, historias, realidades, que resultan desconocidas por falta de información o divulgación', 11, 9),
(49, 'Utilizar los contenidos más populares y familiares para la audiencia como puerta de entrada para ampliar la comunidad asociada al cine argentino', 12, 9),
(50, 'Potenciar el apoyo a Festivales Nacionales y programas especiales que el Instituto considere implementar en el territorio', 12, 11),
(51, 'Aumentar la distribución nacional de CINE.AR TV y CINE.AR PLAY', 12, 9),
(52, 'Propiciar la disponibilidad e integración de las apps de CINE.AR PLAY en los distintos dispositivos existentes en el mercado', 13, 9),
(53, 'Optimizar la red de Espacios INCAA', 13, 9),
(54, 'Promocionar el Cine Gaumont y sus tres salas dedicadas al cine argentino con entradas a precios accesibles', 14, 9),
(55, 'Complementar las salas físicas con la sala digital', 14, 9),
(56, 'Realizar estudios para ampliar los públicos de las producciones nacionales en territorio argentino. Identificar acciones que faciliten la comunicación y el acceso de los públicos a las obras audiovisuales argentinas', 14, 7),
(57, 'Incrementar la distribución en el exterior de CINE.AR PLAY y CINE.AR ESTRENOS', 15, 9),
(58, 'Trabajar por la integración del sistema de TVOD CINE.AR ESTRENOS en las diferentes plataformas existentes', 15, 9),
(59, 'Sinergizar CINE.AR con Festivales Nacionales e Internacionales', 15, 9),
(60, 'Desarrollo de un catálogo de Cine Nacional digital, accesible y en múltiples idiomas', 15, 1),
(61, 'Participar con stands en los principales Festivales  y Mercados Internacionales', 16, 1),
(62, 'Propiciar la celebración de acuerdos bilaterales', 16, 1),
(63, 'Proponer e implementar  políticas de difusión y promoción internacional de las producciones audiovisuales nacionales', 16, 1),
(64, 'Planificar y diseñar la participación de los contenidos audiovisuales nacionales en el ámbito internacional: mercados, rondas de negocios y festivales', 16, 1),
(65, 'Gestionar y brindar apoyos para facilitar la participación de las producciones nacionales en Festivales y Mercados Internacionales', 17, 1),
(66, 'Aportar visibilidad a las producciones nacionales en el ámbito internacional, mediante difusión y comunicación institucional', 17, 1),
(67, 'Diseñar y planificar políticas innovadoras de apoyo y fomento a la participación de los contenidos nacionales en el plano internacional', 17, 1),
(68, 'Gestionar las políticas de fomento de la industria audiovisual en el ámbito internacional', 17, 1),
(69, 'Mejorar las condiciones edilicias y ambientales para la conservación del acervo audiovisual del INCAA', 18, 8),
(70, 'Generar programas para la restauración del acervo audiovisual', 18, 8),
(71, 'Plan de conservación filmico y digital', 18, 8),
(72, 'Incorporar tecnología y técnicas innovadoras que contribuyan a la restauración y conservación de los materiales', 18, 2),
(73, 'Planificar programas de participación de los estudiantes de ENERC en las tareas de restauración', 18, 2),
(74, 'Patrimonio cinemateca: relevamiento de técnicas de restauración, gestión y exhibición del acervo audiovisual.  Legislación comparada', 18, 7),
(75, 'Desarrollar un Gestor de Contenidos Unificado para todos los sitios del organismo actuales y aquellos que sea necesario desarrollar en el futuro', 19, 12),
(76, 'Administrar de manera centralizada la publicación y desarrollo de todos los sitios', 19, 12),
(77, 'Diseñar una nueva página web institucional que se constituya en el principal canal de información útil para todos los usuarios, donde cada sitio mantenga su identidad de marca y estética pero pueda compartir información', 19, 13),
(78, 'Avanzar en la publicación de información activa y en tiempo real en INCAA en línea', 20, 12),
(79, 'Alcanzar la publicación de la totalidad de los indicadores activos', 20, 7),
(80, 'Incorporar tutoriales online para promover el correcto y total acceso a la información pública del organismo', 20, 15),
(81, 'Finalizar las tareas de digitalización y carga de expedientes en el Archivo Digital', 20, 12),
(82, 'Efectivizar  Editorial Observatorio INCAA: publicación de estudios y colecciones de textos relativos a la actividad del observatorio. Fondo editorial digital', 20, 7),
(83, 'Alcanzar los ciclos completos en todas las sedes', 21, 2),
(84, 'Promover la incorporación de nuevas sedes regionales en articulación con las provincias', 21, 2),
(85, 'Mejorar las instalaciones de ENERC', 21, 6),
(86, 'Desarrollar un nuevo plan educativo dando cumplimiento a la normativa establecida por CONEAU', 21, 2),
(87, 'Implementar en la ENERC un sistema informático de gestión académica para alumnos e instructores: SIU GUARANÍ', 21, 2),
(88, 'Formar técnicos audiovisuales y cinematográficos profesionales en cada región del país', 21, 2),
(89, 'Coordinar el dictado de seminarios complementarios sobre comercialización y distribución en el exterior', 22, 2),
(90, 'Coordinar posgrados y maestrías referentes a temáticas que mejoren las competencias de la industria en el exterior', 22, 2),
(91, 'Articular las capacitaciones con los diferentes fondos de fomento cultural internacionales', 22, 1),
(92, 'Generar insumos sobre estudios de Internacionalización e inteligencia comercial: fomento a las exportaciones de obras y servicios audiovisuales', 22, 7),
(93, 'Coordinar con las diferentes gerencias los requerimientos de cursos y especializaciones en función del puesto de trabajo', 23, 14),
(94, 'Diseñar una política de recursos humanos que contemple mecanismos dinámicos de promoción e incentivos, acciones de fidelización y retención de talentos y capacitación permanente', 23, 14),
(95, 'Formar al personal para la mejor comprensión de los procesos administrativos', 23, 14),
(96, 'Fomentar la capacitación de habilidades blandas y la perspectiva de género en la toma de decisiones', 23, 14),
(97, 'Promover el desarrollo de habilidades como liderazgo, dirección, planificación, formulación y gerenciamiento de proyectos', 24, 14),
(98, 'Fomentar los nombramientos por concurso', 24, 6),
(99, 'Fortalecer el conocimiento de normas éticas y ambientales', 24, 15),
(100, 'Finalizar el nuevo layout con las instalaciones tecnológicas adecuadas', 25, 6),
(101, 'Diseñar capacitaciones que faciliten la adecuación de los perfiles profesionales a aquellos demandados en el nuevo contexto del organismo', 25, 14),
(102, 'Desarrollar mecanismos que den al personal los conocimientos, habilidades y aptitudes que se requieren para lograr un desempeño óptimo', 25, 14),
(103, 'Gestionar el acceso a capacitaciones flexibles', 25, 14),
(104, 'Desarrollar mecanismos de educación virtual que fortalezcan los planes educativos vigentes', 25, 2),
(105, 'Impulsar la incorporación de nuevas técnicas pedagógicas y herramientas metodológicas digitales para la formación y capacitación en línea', 25, 6),
(106, 'Innovación Educativa: entornos colaborativos educativos (Campus virtual), generación de contenidos digitales sincrónicos, asincrónicos y blending', 25, 6),
(107, 'Prospectiva tecnológica de tendencias de producción y distribución: nuevas tecnologías, desarrollo de software, inteligencia artificial, sensores, conectividad, big data, entre otros', 25, 7),
(108, 'Sustentabilidad  ambiental de la actividad audiovisual: impacto en el entorno y uso  de energías renovables. Desarrollar propuestas de mejoras y  recomendaciones. Objetivos de Desarrollo Sostenible (ODS) Agenda 2030 de Naciones Unidas', 25, 7),
(109, 'Fomentar y coordinar la implementación de acuerdos marco con otras instituciones', 26, 6),
(110, 'Establecer mesas de articulación  con Enacom', 26, 6),
(111, 'Participar de mesas audiovisuales que se propongan en diferentes áreas gubernamentales', 26, 4),
(112, 'Participar en los ámbitos legislativos que tengan como objetivo debates que involucren nuestra actividad', 26, 6),
(113, 'Generar espacios de intercambio y articulación de colaboración recíproca con distintas asociaciones, organismo y entes públicos y privados', 26, 6),
(114, 'Establecer marcos regulatorios que tengan en cuenta el surgimiento de nuevas tecnologías y contenidos multiplataforma para alcanzar la generación de contenidos de calidad y pluralismo', 27, 6),
(115, 'Propiciar la reformulación de las cuotas de pantalla existentes', 27, 6),
(116, 'Explorar sistemas de calificaciones para contenidos audiovisuales  existentes en otras partes del mundo para ponderar modelos más eficientes basados en la experiencia internacional (PEGI, ESRB)', 27, 6),
(117, 'Incorporar a la argentina pautas que apunten hacia la corregulación de la calificación de contenidos audiovisuales bajo los parámetros de la IARC (International Age Rating Coalition)', 27, 6),
(118, 'Proponer  un sistema de calificaciones que pase de “prohibir” a informar cómo herramienta de toma de decisiones', 27, 6),
(119, 'Introducir la incorporación de modernos pictogramas, placas informativas, guías indicativas y recursos audiovisuales tendientes a fortalecer/profundizar la información brindada a la ciudadanía y la industria audiovisual', 27, 6),
(120, 'Realizar estudios de políticas y legislación internacional comparadas tendientes a las mejoras de las normativas nacionales y provinciales para el fomento de la industria audiovisual', 28, 7),
(121, 'Fortalecer el rol del presupuesto estableciendo la implementación de herramientas de planificación presupuestaria para el seguimiento y control de la gestión de forma descentralizada', 28, 3),
(122, 'Establecer los manuales de procedimientos que permitan documentar los conocimientos críticos de gestión, asegurando la continuidad institucional de las tareas y posiciones', 28, 6),
(123, 'Designar responsables administrativos de cada uno de los procesos e implementar mecanismos de seguimiento y evaluación por cumplimiento de metas y objetivos', 28, 3),
(124, 'Propiciar mecanismos de registro, fiscalización y control que acompañen el desarrollo de las nuevas formas de producción, distribución y exhibición de la industria audiovisual', 28, 4),
(125, 'Avanzar en la implementación de nuevos módulos de gestión del sistema de la administración pública', 29, 12),
(126, 'Fortalecer el proyecto INCAA EN LÍNEA cómo eje de gestión que apunte a la modernización, simplificación, automatización, integración de circuitos y bases de datos compartidas y colaborativa', 29, 12),
(127, 'Implementar desarrollos orientados hacia la experiencia del usuario integrando aplicaciones informáticas basadas en la inteligencia artificial de forma intuitiva y profesional', 29, 12),
(128, 'Fortalecer INCAA EN LÍNEA como herramienta de seguimiento y notificaciones fehacientes de tramitaciones internas y para los usuarios externos en tiempo real', 29, 12),
(129, 'Abogar por la implementación de tramitaciones transversales simplificadas y en línea que tiendan a la automatización y optimización de los recursos del INCAA', 29, 12),
(130, 'Proponer iniciativas que promuevan la igualdad de género', 30, 14),
(131, 'Presentar iniciativas tendientes a la innovación, la creatividad y la comunicación entre los agentes', 30, 14),
(132, 'Cumplimiento de cupo laboral para personas con discapacidad para garantizar su derecho al trabajo, facilitar su inclusión y la igualdad de oportunidades', 30, 14),
(133, 'Cumplimiento de cupo laboral para personas travestis, transexuales y transgenero que reúnan con las condiciones de idoneidad', 30, 14),
(139, 'Aumentar la transparencia activa de los procesos adoptando innovaciones tecnológicas y sistemas informáticos que permitan la publicidad de las acciones realizadas y el conocimiento por parte del ciudadano', 31, 12),
(140, 'Implementar acciones de capacitación y control que amplíen la transparencia y las buenas prácticas de los agentes respecto de la responsabilidad de la administración, ejecución y desarrollo de procesos que involucren fondos públicos', 31, 15),
(141, 'Formalizar e implementar una política de comunicación integral interna y externa', 31, 13),
(142, 'Fomentar la participación de la industria en el órgano de cogobierno del INCAA mediante el Consejo Asesor', 31, 8),
(143, 'Desarrollar informes ejecutivos periódicos vinculados a información financiera y presupuestaria', 31, 16),
(144, 'Impulsar procesos que garanticen total trazabilidad, seguridad, certificación y validación tanto en los circuitos administrativos y de gestión de contenidos como registros abiertos y auditables (Blockchain,Smart Contract,  IRAM, ISO)', 31, 6),
(145, 'Profundizar el análisis y difusión de los datos producidos por las distintas áreas del INCAA propendiendo a la transparencia y el aporte de información clave para el desarrollo del sector tanto en el ámbito privado como público', 31, 7),
(146, 'Centralizar la distribución de todos los contenidos audiovisuales del INCAA que estén relacionados con algún tipo de apoyo o subsidio  por parte del organismo', 32, 6),
(147, 'Realizar los informes administrativos en función de los resultados de los controles realizados y convertir a la Ventanilla Única Audiovisual en el único espacio de vinculación con los actores de la industria que gestionen contenidos frente al INCAA', 32, 6),
(148, 'Diseñar proyectos de implementación de sistemas de tránsito digital para la gestión de los contenidos audiovisuales mediante mecanismos ágiles seguros y auditables', 32, 6),
(149, 'Mantener actualizados los protocolos técnicos de entrega de contenido audiovisual', 32, 6),
(150, 'Conformar una mesa técnica audiovisual multidisciplinaria y con representación  técnicos de las distintas unidades organizativas del INCAA a fin de establecer criterios, reingeniería de circuitos, propuestas de actualización tecnológica, impulsar certificaciones y manuales de procedimientos de usabilidad, mantenimiento, capacitación y planes de mejora continuas para optimizar los recursos del INCAA y proponer actualización y aggiornamiento tecnológico y normativo', 32, 6);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `relaciones`
--

CREATE TABLE `relaciones` (
  `idrelacion` int(11) NOT NULL,
  `relaciontarjeta` int(11) NOT NULL,
  `relaciontag` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `relaciones`
--

INSERT INTO `relaciones` (`idrelacion`, `relaciontarjeta`, `relaciontag`) VALUES
(20, 1, 20),
(21, 1, 168),
(22, 1, 169),
(23, 1, 167),
(26, 55, 2),
(27, 55, 16),
(28, 55, 15);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sessions`
--

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) UNSIGNED NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tags`
--

CREATE TABLE `tags` (
  `idtags` int(11) NOT NULL,
  `tagsnombre` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tags`
--

INSERT INTO `tags` (`idtags`, `tagsnombre`) VALUES
(1, 'Accesibilidad'),
(2, 'Acceso a la información'),
(3, 'Acervo audiovisual'),
(4, 'Actas'),
(5, 'Actualización'),
(6, 'Acuerdo'),
(7, 'Administracion'),
(8, 'Alumnos'),
(9, 'Animación'),
(10, 'Apoyos'),
(11, 'Archivo digital'),
(12, 'Asamblea Federal'),
(13, 'Asociaciones'),
(14, 'Audiencia'),
(15, 'CAACI'),
(16, 'CAEC'),
(17, 'Calificaciones'),
(18, 'Campus virtual'),
(19, 'Capacitación'),
(20, 'Catálogo'),
(21, 'Certificaciones'),
(22, 'Cine argentino'),
(23, 'CINE.AR'),
(24, 'CINE.AR ESTRENOS'),
(25, 'CINE.AR PLAY'),
(26, 'CINE.AR TV'),
(27, 'Cinemateca'),
(28, 'Clasificaciones'),
(29, 'Cluster'),
(30, 'Comercialización '),
(31, 'Comité'),
(32, 'Comunicación'),
(33, 'Consejo Asesor'),
(34, 'Consursos'),
(35, 'Contenidos digitales'),
(36, 'Contenidos educativos'),
(37, 'Contrataciones'),
(38, 'Contrataciones de servicios'),
(39, 'Control'),
(40, 'Convenios'),
(41, 'Cooperación'),
(42, 'Coproducciones'),
(43, 'Cortometrajes'),
(44, 'Costo medio'),
(45, 'Creditos'),
(46, 'Cuidado del medio ambiente'),
(47, 'Cuota de pantalla'),
(48, 'Cupos'),
(49, 'Desarrollo'),
(50, 'Desarrollo Federal'),
(51, 'Directores'),
(52, 'Disposiciones'),
(53, 'Distribución'),
(54, 'Distribuidores'),
(55, 'Diversidad'),
(56, 'Divulgación'),
(57, 'Documentales'),
(58, 'Eficiencia'),
(59, 'Ejecución'),
(60, 'Empresas privadas'),
(61, 'Enacom'),
(62, 'ENERC'),
(63, 'Energias renovables'),
(64, 'Entes públicos'),
(65, 'Espacios INCAA'),
(66, 'Espectadores'),
(67, 'Estrenos'),
(68, 'Estructura'),
(69, 'Eventos'),
(70, 'Exhibición'),
(71, 'Exhibidores'),
(72, 'Expedientes'),
(73, 'Federalización'),
(74, 'Festival MDQ'),
(75, 'Festivales nacionales'),
(76, 'Film Commision'),
(77, 'Fiscalización'),
(78, 'Fomento'),
(79, 'Fondo de fomento'),
(80, 'Fondos internacionales'),
(81, 'Gammers '),
(82, 'GAUMONT'),
(83, 'GDE'),
(84, 'Género'),
(85, 'Gestor de contenidos'),
(86, 'Herramientas metodológicas'),
(87, 'Historias Breves'),
(88, 'Ibermedia'),
(89, 'INCAA en LINEA'),
(90, 'Incentivos'),
(91, 'Industria audiovisual'),
(92, 'Informe'),
(93, 'Infracciones'),
(94, 'Infraestructura'),
(95, 'Innovación'),
(96, 'Institucionales'),
(97, 'Instructores'),
(98, 'Internacionalización de contenidos'),
(99, 'Internacionles'),
(100, 'Inversión'),
(101, 'Jurídicos'),
(102, 'Largometrajes'),
(103, 'Ley de Cine'),
(104, 'Mantenimiento'),
(105, 'Manual de procedimiento'),
(106, 'Media de continuidad'),
(107, 'Mejoras'),
(108, 'Mercado internacional'),
(109, 'Mesa de entradas'),
(110, 'Metas físicas'),
(111, 'Multa'),
(112, 'Multiplataforma'),
(113, 'Nombramientos'),
(114, 'Normas ambientales'),
(115, 'Normativa'),
(116, 'Objetivos de Desarrollo Sostenible (ODS)'),
(117, 'Observatorio'),
(118, 'Optimización'),
(119, 'OTTs'),
(120, 'Pantallas'),
(121, 'PATRIMONIO'),
(122, 'Plan de fomento'),
(123, 'Planificación'),
(124, 'Política de Estado'),
(125, 'Política de fomento'),
(126, 'Política regional'),
(127, 'Prensa'),
(128, 'Presidencia'),
(129, 'Presupuesto'),
(130, 'Procedimientos'),
(131, 'Productividad'),
(132, 'Productores'),
(133, 'Programa'),
(134, 'Proveedores'),
(135, 'Proyecto'),
(136, 'Publicidad'),
(137, 'Ranking'),
(138, 'Recursos'),
(139, 'Registro'),
(140, 'Resoluciones'),
(141, 'Restauraciones'),
(142, 'Resultado de gestión'),
(143, 'RRHH'),
(144, 'Secretarias de cultura'),
(145, 'Sedes ENERC'),
(146, 'Sedes regionales ENERC'),
(147, 'Seguridad e higiene'),
(148, 'Series audiovisuales'),
(149, 'Sindicatos Audiovisuales'),
(150, 'Siu-Guarani'),
(151, 'Sociedades de gestión de derechos'),
(152, 'Subsidios'),
(153, 'Subtitulado'),
(154, 'Sustentabilidad'),
(155, 'Tecnologías'),
(156, 'Tramites a Distancia (TAD)'),
(157, 'Transparencia'),
(158, 'Transversalidad'),
(159, 'Trazabilidad'),
(160, 'Tutoriales'),
(161, 'UAI'),
(162, 'Ventana Sur'),
(163, 'Ventanas'),
(164, 'Ventanilla Unica'),
(165, 'Vicepresidencia'),
(166, 'Youtubers'),
(167, 'Digitalización'),
(168, 'Promoción'),
(169, 'Acervo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tarjetas`
--

CREATE TABLE `tarjetas` (
  `idtarjetas` int(11) NOT NULL,
  `tarjetastitulo` varchar(255) DEFAULT NULL,
  `tarjetascuerpo` text DEFAULT NULL,
  `tarjetasexpediente` varchar(255) NOT NULL,
  `tarjetasactoadministrativo` varchar(255) NOT NULL,
  `tarjetasautor` int(11) DEFAULT NULL,
  `tarjetasareas` int(11) DEFAULT NULL,
  `tarjetasejes` int(11) NOT NULL,
  `tarjetasobjetivos` int(11) NOT NULL,
  `tarjetaslineas` int(11) NOT NULL,
  `tarjetasplandeaccion` int(11) DEFAULT NULL,
  `tarjetasestado` int(11) NOT NULL,
  `tarjetasfecha` datetime NOT NULL,
  `tarjetasultmodfecha` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `tarjetasultmodusuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tarjetas`
--

INSERT INTO `tarjetas` (`idtarjetas`, `tarjetastitulo`, `tarjetascuerpo`, `tarjetasexpediente`, `tarjetasactoadministrativo`, `tarjetasautor`, `tarjetasareas`, `tarjetasejes`, `tarjetasobjetivos`, `tarjetaslineas`, `tarjetasplandeaccion`, `tarjetasestado`, `tarjetasfecha`, `tarjetasultmodfecha`, `tarjetasultmodusuario`) VALUES
(1, 'Catálogo Audiovisual Argentino', 'Se ha puesto on line luego de finalizadas las etapas de armado de la base de datos, diseño y maquetado. Se han incluído largometrajes y cortometrajes 2021 y 2022. Se inicia la etapa de recopilación de datos de largos y cortos cuya realización sea previa a 2022 mediante mailing a productores y distribuidores a través de INCAA en línea.', '', '', 1, 1, 2, 5, 15, 60, 1, '2023-02-16 18:52:15', '2023-03-28 18:42:10', 1)
;
-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tarjetas_estados`
--

CREATE TABLE `tarjetas_estados` (
  `idestados` int(11) NOT NULL,
  `estadosnombre` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tarjetas_estados`
--

INSERT INTO `tarjetas_estados` (`idestados`, `estadosnombre`) VALUES
(0, 'rechazada'),
(1, 'aprobada'),
(2, 'evaluandose');

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `tarjetas_view`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `tarjetas_view` (
`idtarjetas` int(11)
,`tarjetastitulo` varchar(255)
,`tarjetascuerpo` text
,`tarjetasexpediente` varchar(255)
,`tarjetasactoadministrativo` varchar(255)
,`tarjetasautor` int(11)
,`tarjetasareas` int(11)
,`tarjetasejes` int(11)
,`tarjetasobjetivos` int(11)
,`tarjetaslineas` int(11)
,`tarjetasplandeaccion` int(11)
,`tarjetasestado` int(11)
,`tarjetasfecha` datetime
,`tarjetasultmodfecha` timestamp
,`tarjetasultmodusuario` int(11)
,`idusuarios` int(11)
,`usuariosnombre` varchar(45)
,`usuarioscontrasenia` varchar(255)
,`usuariosarea` int(11)
,`usuariostipo` int(11)
,`idareas` int(11)
,`areasnombre` varchar(255)
,`areasdescripcion` varchar(255)
,`areasultmodfecha` timestamp
,`areasultmodusuario` int(11)
,`idestados` int(11)
,`estadosnombre` varchar(255)
,`idejes` int(11)
,`ejesnombre` varchar(255)
,`idobjetivos` int(11)
,`objetivosnombre` varchar(255)
,`objetivoseje` int(11)
,`idlineas` int(11)
,`lineasnombre` varchar(255)
,`lineasobjetivo` int(11)
,`idplanesdeaccion` int(11)
,`planesdeaccionnombre` text
,`planesdeaccionlinea` int(11)
,`planesdeaccionarea` int(11)
);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `idusuarios` int(11) NOT NULL,
  `usuariosnombre` varchar(45) DEFAULT NULL,
  `usuarioscontrasenia` varchar(255) DEFAULT NULL,
  `usuariosarea` int(11) DEFAULT NULL,
  `usuariostipo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`idusuarios`, `usuariosnombre`, `usuarioscontrasenia`, `usuariosarea`, `usuariostipo`) VALUES 
(1, 'seguimiento.estrategico', '$2b$10$Zieg/GHWt/Qs2RNdlGGmdu8XCx1DnMQf201ik5hcz5iloR5/Z1hMe', 6, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios_tipos`
--

CREATE TABLE `usuarios_tipos` (
  `idtipos` int(11) NOT NULL,
  `tiposnombre` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuarios_tipos`
--

INSERT INTO `usuarios_tipos` (`idtipos`, `tiposnombre`) VALUES
(1, 'PRESIDENCIA/VICEPRESIDENCIA'),
(2, 'GERENCIA GENERAL'),
(3, 'GERENCIAS/SUBGERENCIAS'),
(4, 'UAI');

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `usuarios_view`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `usuarios_view` (
`idusuarios` int(11)
,`usuariosnombre` varchar(45)
,`usuarioscontrasenia` varchar(255)
,`usuariosarea` int(11)
,`usuariostipo` int(11)
,`idareas` int(11)
,`areasnombre` varchar(255)
,`areasdescripcion` varchar(255)
);

-- --------------------------------------------------------

--
-- Estructura para la vista `pegi`
--
DROP TABLE IF EXISTS `pegi`;

CREATE VIEW `pegi`  AS SELECT `p`.`idplanesdeaccion` AS `idplanesdeaccion`, `p`.`planesdeaccionnombre` AS `planesdeaccionnombre`, `p`.`planesdeaccionlinea` AS `planesdeaccionlinea`, `p`.`planesdeaccionarea` AS `planesdeaccionarea`, `a`.`idareas` AS `idareas`, `a`.`areasnombre` AS `areasnombre`, `l`.`idlineas` AS `idlineas`, `l`.`lineasnombre` AS `lineasnombre`, `l`.`lineasobjetivo` AS `lineasobjetivo`, `o`.`idobjetivos` AS `idobjetivos`, `o`.`objetivosnombre` AS `objetivosnombre`, `o`.`objetivoseje` AS `objetivoseje`, `e`.`idejes` AS `idejes`, `e`.`ejesnombre` AS `ejesnombre` FROM ((((`planesdeaccion` `p` left join `areas` `a` on(`p`.`planesdeaccionarea` = `a`.`idareas`)) left join `lineas` `l` on(`p`.`planesdeaccionlinea` = `l`.`idlineas`)) left join `objetivos` `o` on(`l`.`lineasobjetivo` = `o`.`idobjetivos`)) left join `ejes` `e` on(`o`.`objetivoseje` = `e`.`idejes`))  ;

-- --------------------------------------------------------

--
-- Estructura para la vista `tarjetas_view`
--
DROP TABLE IF EXISTS `tarjetas_view`;

CREATE VIEW `tarjetas_view`  AS SELECT `t`.`idtarjetas` AS `idtarjetas`, `t`.`tarjetastitulo` AS `tarjetastitulo`, `t`.`tarjetascuerpo` AS `tarjetascuerpo`, `t`.`tarjetasexpediente` AS `tarjetasexpediente`, `t`.`tarjetasactoadministrativo` AS `tarjetasactoadministrativo`, `t`.`tarjetasautor` AS `tarjetasautor`, `t`.`tarjetasareas` AS `tarjetasareas`, `t`.`tarjetasejes` AS `tarjetasejes`, `t`.`tarjetasobjetivos` AS `tarjetasobjetivos`, `t`.`tarjetaslineas` AS `tarjetaslineas`, `t`.`tarjetasplandeaccion` AS `tarjetasplandeaccion`, `t`.`tarjetasestado` AS `tarjetasestado`, `t`.`tarjetasfecha` AS `tarjetasfecha`, `t`.`tarjetasultmodfecha` AS `tarjetasultmodfecha`, `t`.`tarjetasultmodusuario` AS `tarjetasultmodusuario`, `u`.`idusuarios` AS `idusuarios`, `u`.`usuariosnombre` AS `usuariosnombre`, `u`.`usuarioscontrasenia` AS `usuarioscontrasenia`, `u`.`usuariosarea` AS `usuariosarea`, `u`.`usuariostipo` AS `usuariostipo`, `a`.`idareas` AS `idareas`, `a`.`areasnombre` AS `areasnombre`, `a`.`areasdescripcion` AS `areasdescripcion`, `a`.`areasultmodfecha` AS `areasultmodfecha`, `a`.`areasultmodusuario` AS `areasultmodusuario`, `t_e`.`idestados` AS `idestados`, `t_e`.`estadosnombre` AS `estadosnombre`, `e`.`idejes` AS `idejes`, `e`.`ejesnombre` AS `ejesnombre`, `o`.`idobjetivos` AS `idobjetivos`, `o`.`objetivosnombre` AS `objetivosnombre`, `o`.`objetivoseje` AS `objetivoseje`, `l`.`idlineas` AS `idlineas`, `l`.`lineasnombre` AS `lineasnombre`, `l`.`lineasobjetivo` AS `lineasobjetivo`, `p`.`idplanesdeaccion` AS `idplanesdeaccion`, `p`.`planesdeaccionnombre` AS `planesdeaccionnombre`, `p`.`planesdeaccionlinea` AS `planesdeaccionlinea`, `p`.`planesdeaccionarea` AS `planesdeaccionarea` FROM (((((((`tarjetas` `t` join `usuarios` `u` on(`t`.`tarjetasautor` = `u`.`idusuarios`)) join `areas` `a` on(`t`.`tarjetasareas` = `a`.`idareas`)) join `tarjetas_estados` `t_e` on(`t`.`tarjetasestado` = `t_e`.`idestados`)) join `ejes` `e` on(`t`.`tarjetasejes` = `e`.`idejes`)) join `objetivos` `o` on(`t`.`tarjetasobjetivos` = `o`.`idobjetivos`)) join `lineas` `l` on(`t`.`tarjetaslineas` = `l`.`idlineas`)) join `planesdeaccion` `p` on(`t`.`tarjetasplandeaccion` = `p`.`idplanesdeaccion`))  ;

-- --------------------------------------------------------

--
-- Estructura para la vista `usuarios_view`
--
DROP TABLE IF EXISTS `usuarios_view`;

CREATE VIEW `usuarios_view`  AS SELECT `usuarios`.`idusuarios` AS `idusuarios`, `usuarios`.`usuariosnombre` AS `usuariosnombre`, `usuarios`.`usuarioscontrasenia` AS `usuarioscontrasenia`, `usuarios`.`usuariosarea` AS `usuariosarea`, `usuarios`.`usuariostipo` AS `usuariostipo`, `areas`.`idareas` AS `idareas`, `areas`.`areasnombre` AS `areasnombre`, `areas`.`areasdescripcion` AS `areasdescripcion` FROM (`usuarios` join `areas` on(`usuarios`.`usuariosarea` = `areas`.`idareas`))  ;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `areas`
--
ALTER TABLE `areas`
  ADD PRIMARY KEY (`idareas`),
  ADD KEY `areas_usuarios` (`areasultmodusuario`);

--
-- Indices de la tabla `ejes`
--
ALTER TABLE `ejes`
  ADD PRIMARY KEY (`idejes`);

--
-- Indices de la tabla `lineas`
--
ALTER TABLE `lineas`
  ADD PRIMARY KEY (`idlineas`),
  ADD KEY `lineas_objetivos` (`lineasobjetivo`);

--
-- Indices de la tabla `objetivos`
--
ALTER TABLE `objetivos`
  ADD PRIMARY KEY (`idobjetivos`),
  ADD KEY `objetivos_ejes` (`objetivoseje`);

--
-- Indices de la tabla `planesdeaccion`
--
ALTER TABLE `planesdeaccion`
  ADD PRIMARY KEY (`idplanesdeaccion`),
  ADD KEY `planesdeaccion_areas` (`planesdeaccionarea`),
  ADD KEY `planesdeaccion_lineas` (`planesdeaccionlinea`);

--
-- Indices de la tabla `relaciones`
--
ALTER TABLE `relaciones`
  ADD PRIMARY KEY (`idrelacion`),
  ADD KEY `relaciones_tarjeta` (`relaciontarjeta`),
  ADD KEY `relaciones_tags` (`relaciontag`);

--
-- Indices de la tabla `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`);

--
-- Indices de la tabla `tags`
--
ALTER TABLE `tags`
  ADD PRIMARY KEY (`idtags`);

--
-- Indices de la tabla `tarjetas`
--
ALTER TABLE `tarjetas`
  ADD PRIMARY KEY (`idtarjetas`),
  ADD KEY `tarjetas_usuarios` (`tarjetasautor`),
  ADD KEY `tarjetas_planesdeaccion` (`tarjetasplandeaccion`),
  ADD KEY `tarjetas_ejes` (`tarjetasejes`),
  ADD KEY `tarjetas_objetivos` (`tarjetasobjetivos`),
  ADD KEY `tarjetas_lineas` (`tarjetaslineas`),
  ADD KEY `tarjetas_estados` (`tarjetasestado`),
  ADD KEY `tarjetas_areas` (`tarjetasareas`),
  ADD KEY `tarjetas_ultmodusuarios` (`tarjetasultmodusuario`);

--
-- Indices de la tabla `tarjetas_estados`
--
ALTER TABLE `tarjetas_estados`
  ADD PRIMARY KEY (`idestados`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`idusuarios`),
  ADD KEY `usuarios_areas` (`usuariosarea`),
  ADD KEY `usuarios_tipos` (`usuariostipo`);

--
-- Indices de la tabla `usuarios_tipos`
--
ALTER TABLE `usuarios_tipos`
  ADD PRIMARY KEY (`idtipos`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `ejes`
--
ALTER TABLE `ejes`
  MODIFY `idejes` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `lineas`
--
ALTER TABLE `lineas`
  MODIFY `idlineas` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT de la tabla `objetivos`
--
ALTER TABLE `objetivos`
  MODIFY `idobjetivos` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `planesdeaccion`
--
ALTER TABLE `planesdeaccion`
  MODIFY `idplanesdeaccion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=151;

--
-- AUTO_INCREMENT de la tabla `relaciones`
--
ALTER TABLE `relaciones`
  MODIFY `idrelacion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT de la tabla `tags`
--
ALTER TABLE `tags`
  MODIFY `idtags` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=170;

--
-- AUTO_INCREMENT de la tabla `tarjetas`
--
ALTER TABLE `tarjetas`
  MODIFY `idtarjetas` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `idusuarios` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `areas`
--
ALTER TABLE `areas`
  ADD CONSTRAINT `areas_usuarios` FOREIGN KEY (`areasultmodusuario`) REFERENCES `usuarios` (`idusuarios`);

--
-- Filtros para la tabla `lineas`
--
ALTER TABLE `lineas`
  ADD CONSTRAINT `lineas_objetivos` FOREIGN KEY (`lineasobjetivo`) REFERENCES `objetivos` (`idobjetivos`);

--
-- Filtros para la tabla `objetivos`
--
ALTER TABLE `objetivos`
  ADD CONSTRAINT `objetivos_ejes` FOREIGN KEY (`objetivoseje`) REFERENCES `ejes` (`idejes`);

--
-- Filtros para la tabla `planesdeaccion`
--
ALTER TABLE `planesdeaccion`
  ADD CONSTRAINT `planesdeaccion_areas` FOREIGN KEY (`planesdeaccionarea`) REFERENCES `areas` (`idareas`),
  ADD CONSTRAINT `planesdeaccion_lineas` FOREIGN KEY (`planesdeaccionlinea`) REFERENCES `lineas` (`idlineas`);

--
-- Filtros para la tabla `relaciones`
--
ALTER TABLE `relaciones`
  ADD CONSTRAINT `relaciones_tags` FOREIGN KEY (`relaciontag`) REFERENCES `tags` (`idtags`),
  ADD CONSTRAINT `relaciones_tarjeta` FOREIGN KEY (`relaciontarjeta`) REFERENCES `tarjetas` (`idtarjetas`);

--
-- Filtros para la tabla `tarjetas`
--
ALTER TABLE `tarjetas`
  ADD CONSTRAINT `tarjetas_areas` FOREIGN KEY (`tarjetasareas`) REFERENCES `areas` (`idareas`),
  ADD CONSTRAINT `tarjetas_ejes` FOREIGN KEY (`tarjetasejes`) REFERENCES `ejes` (`idejes`),
  ADD CONSTRAINT `tarjetas_estados` FOREIGN KEY (`tarjetasestado`) REFERENCES `tarjetas_estados` (`idestados`),
  ADD CONSTRAINT `tarjetas_lineas` FOREIGN KEY (`tarjetaslineas`) REFERENCES `lineas` (`idlineas`),
  ADD CONSTRAINT `tarjetas_objetivos` FOREIGN KEY (`tarjetasobjetivos`) REFERENCES `objetivos` (`idobjetivos`),
  ADD CONSTRAINT `tarjetas_planesdeaccion` FOREIGN KEY (`tarjetasplandeaccion`) REFERENCES `planesdeaccion` (`idplanesdeaccion`),
  ADD CONSTRAINT `tarjetas_ultmodusuarios` FOREIGN KEY (`tarjetasultmodusuario`) REFERENCES `usuarios` (`idusuarios`),
  ADD CONSTRAINT `tarjetas_usuarios` FOREIGN KEY (`tarjetasautor`) REFERENCES `usuarios` (`idusuarios`);

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `usuarios_areas` FOREIGN KEY (`usuariosarea`) REFERENCES `areas` (`idareas`),
  ADD CONSTRAINT `usuarios_tipos` FOREIGN KEY (`usuariostipo`) REFERENCES `usuarios_tipos` (`idtipos`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
