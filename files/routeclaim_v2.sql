-- ============================================================
--  RouteClaim v2 – Base de Datos
--  Paleta rústica montaña · Comunitat Valenciana
--  Motor: MySQL 8.0+ / MariaDB 10.6+
-- ============================================================

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";
SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

CREATE DATABASE IF NOT EXISTS `routeclaim_v2`
  DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `routeclaim_v2`;

-- ──────────────────────────────────────────
-- TABLA: usuarios
-- ──────────────────────────────────────────
DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE `usuarios` (
  `id`               VARCHAR(40)      NOT NULL,
  `username`         VARCHAR(40)      NOT NULL,
  `email`            VARCHAR(120)     NOT NULL,
  `password_hash`    VARCHAR(255)     NOT NULL,
  `nombre`           VARCHAR(80)          NULL,
  `color_hex`        CHAR(7)          NOT NULL DEFAULT '#7a9968',
  `bandera`          VARCHAR(10)      NOT NULL DEFAULT '🇪🇸',
  `disciplina_pref`  ENUM('running','bicicleta','trekking','todas') NOT NULL DEFAULT 'todas',
  `zona_ciudad`      VARCHAR(100)         NULL,
  `puntos_totales`   INT UNSIGNED     NOT NULL DEFAULT 0,
  `rutas_ids`        JSON                 NULL  COMMENT 'Array JSON de IDs conquistados',
  `activo`           TINYINT(1)       NOT NULL DEFAULT 1,
  `email_verificado` TINYINT(1)       NOT NULL DEFAULT 0,
  `created_at`       DATETIME         NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at`       DATETIME         NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_email`    (`email`),
  UNIQUE KEY `uq_username` (`username`),
  KEY `idx_puntos` (`puntos_totales` DESC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ──────────────────────────────────────────
-- TABLA: disciplinas
-- ──────────────────────────────────────────
DROP TABLE IF EXISTS `disciplinas`;
CREATE TABLE `disciplinas` (
  `id`          TINYINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `slug`        VARCHAR(30)      NOT NULL,
  `nombre`      VARCHAR(60)      NOT NULL,
  `descripcion` VARCHAR(255)         NULL,
  `icono`       VARCHAR(10)          NULL,
  `activa`      TINYINT(1)       NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_slug` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ──────────────────────────────────────────
-- TABLA: rutas
-- ──────────────────────────────────────────
DROP TABLE IF EXISTS `rutas`;
CREATE TABLE `rutas` (
  `id`                  INT UNSIGNED     NOT NULL AUTO_INCREMENT,
  `nombre`              VARCHAR(100)     NOT NULL,
  `descripcion`         TEXT                 NULL,
  `disciplina_id`       TINYINT UNSIGNED NOT NULL,
  `distancia_texto`     VARCHAR(20)          NULL,
  `dificultad`          ENUM('facil','media','dificil','extrema') NOT NULL DEFAULT 'media',
  `ciudad`              VARCHAR(100)         NULL,
  `lat_inicio`          DECIMAL(10,7)    NOT NULL,
  `lng_inicio`          DECIMAL(10,7)    NOT NULL,
  `lat_fin`             DECIMAL(10,7)    NOT NULL,
  `lng_fin`             DECIMAL(10,7)    NOT NULL,
  `imagen_url`          VARCHAR(255)         NULL,
  `conquistador_id`     VARCHAR(40)          NULL,
  `tiempo_record_s`     INT UNSIGNED         NULL,
  `veces_completada`    INT UNSIGNED     NOT NULL DEFAULT 0,
  `activa`              TINYINT(1)       NOT NULL DEFAULT 1,
  `created_at`          DATETIME         NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at`          DATETIME         NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_disciplina`   (`disciplina_id`),
  KEY `idx_conquistador` (`conquistador_id`),
  KEY `idx_ciudad`       (`ciudad`),
  CONSTRAINT `fk_ruta_disciplina` FOREIGN KEY (`disciplina_id`) REFERENCES `disciplinas` (`id`),
  CONSTRAINT `fk_ruta_conquistador` FOREIGN KEY (`conquistador_id`) REFERENCES `usuarios` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ──────────────────────────────────────────
-- TABLA: modos_juego
-- ──────────────────────────────────────────
DROP TABLE IF EXISTS `modos_juego`;
CREATE TABLE `modos_juego` (
  `id`          TINYINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `slug`        VARCHAR(30)      NOT NULL,
  `nombre`      VARCHAR(60)      NOT NULL,
  `descripcion` VARCHAR(255)         NULL,
  `color_hex`   CHAR(7)          NOT NULL DEFAULT '#7a9968',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_slug` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ──────────────────────────────────────────
-- TABLA: partidas
-- ──────────────────────────────────────────
DROP TABLE IF EXISTS `partidas`;
CREATE TABLE `partidas` (
  `id`             INT UNSIGNED     NOT NULL AUTO_INCREMENT,
  `modo_id`        TINYINT UNSIGNED NOT NULL,
  `usuario1_id`    VARCHAR(40)      NOT NULL,
  `usuario2_id`    VARCHAR(40)          NULL,
  `estado`         ENUM('pendiente','activa','finalizada','cancelada') NOT NULL DEFAULT 'pendiente',
  `duracion_dias`  SMALLINT UNSIGNED    NULL,
  `fecha_inicio`   DATETIME             NULL,
  `fecha_fin`      DATETIME             NULL,
  `ganador_id`     VARCHAR(40)          NULL,
  `rutas_objetivo` SMALLINT UNSIGNED    NULL,
  `created_at`     DATETIME         NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at`     DATETIME         NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_u1` (`usuario1_id`), KEY `idx_u2` (`usuario2_id`), KEY `idx_estado` (`estado`),
  CONSTRAINT `fk_p_modo` FOREIGN KEY (`modo_id`)     REFERENCES `modos_juego` (`id`),
  CONSTRAINT `fk_p_u1`   FOREIGN KEY (`usuario1_id`) REFERENCES `usuarios` (`id`),
  CONSTRAINT `fk_p_u2`   FOREIGN KEY (`usuario2_id`) REFERENCES `usuarios` (`id`) ON DELETE SET NULL,
  CONSTRAINT `fk_p_gan`  FOREIGN KEY (`ganador_id`)  REFERENCES `usuarios` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ──────────────────────────────────────────
-- TABLA: actividades
-- ──────────────────────────────────────────
DROP TABLE IF EXISTS `actividades`;
CREATE TABLE `actividades` (
  `id`                  BIGINT UNSIGNED  NOT NULL AUTO_INCREMENT,
  `usuario_id`          VARCHAR(40)      NOT NULL,
  `ruta_id`             INT UNSIGNED     NOT NULL,
  `partida_id`          INT UNSIGNED         NULL,
  `tiempo_s`            INT UNSIGNED     NOT NULL,
  `distancia_real_m`    INT UNSIGNED         NULL,
  `velocidad_media_kmh` DECIMAL(5,2)         NULL,
  `conquistada`         TINYINT(1)       NOT NULL DEFAULT 0,
  `fecha`               DATETIME         NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_usuario` (`usuario_id`), KEY `idx_ruta` (`ruta_id`), KEY `idx_fecha` (`fecha`),
  CONSTRAINT `fk_act_u` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`),
  CONSTRAINT `fk_act_r` FOREIGN KEY (`ruta_id`)    REFERENCES `rutas` (`id`),
  CONSTRAINT `fk_act_p` FOREIGN KEY (`partida_id`) REFERENCES `partidas` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ──────────────────────────────────────────
-- TABLA: conquistas
-- ──────────────────────────────────────────
DROP TABLE IF EXISTS `conquistas`;
CREATE TABLE `conquistas` (
  `id`               BIGINT UNSIGNED  NOT NULL AUTO_INCREMENT,
  `ruta_id`          INT UNSIGNED     NOT NULL,
  `actividad_id`     BIGINT UNSIGNED  NOT NULL,
  `usuario_nuevo_id` VARCHAR(40)      NOT NULL,
  `usuario_prev_id`  VARCHAR(40)          NULL,
  `tiempo_s`         INT UNSIGNED     NOT NULL,
  `fecha`            DATETIME         NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_ruta` (`ruta_id`), KEY `idx_nuevo` (`usuario_nuevo_id`), KEY `idx_fecha` (`fecha`),
  CONSTRAINT `fk_c_ruta`  FOREIGN KEY (`ruta_id`)          REFERENCES `rutas` (`id`),
  CONSTRAINT `fk_c_act`   FOREIGN KEY (`actividad_id`)      REFERENCES `actividades` (`id`),
  CONSTRAINT `fk_c_nuevo` FOREIGN KEY (`usuario_nuevo_id`)  REFERENCES `usuarios` (`id`),
  CONSTRAINT `fk_c_prev`  FOREIGN KEY (`usuario_prev_id`)   REFERENCES `usuarios` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ──────────────────────────────────────────
-- TABLA: notificaciones
-- ──────────────────────────────────────────
DROP TABLE IF EXISTS `notificaciones`;
CREATE TABLE `notificaciones` (
  `id`         BIGINT UNSIGNED  NOT NULL AUTO_INCREMENT,
  `usuario_id` VARCHAR(40)      NOT NULL,
  `tipo`       ENUM('ruta_arrebatada','reto_recibido','reto_aceptado','partida_finalizada','record_superado','sistema') NOT NULL,
  `titulo`     VARCHAR(100)     NOT NULL,
  `mensaje`    VARCHAR(255)         NULL,
  `leida`      TINYINT(1)       NOT NULL DEFAULT 0,
  `created_at` DATETIME         NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_usuario_leida` (`usuario_id`, `leida`),
  CONSTRAINT `fk_n_u` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ──────────────────────────────────────────
-- TABLA: acceso_anticipado
-- ──────────────────────────────────────────
DROP TABLE IF EXISTS `acceso_anticipado`;
CREATE TABLE `acceso_anticipado` (
  `id`         INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `email`      VARCHAR(120) NOT NULL,
  `created_at` DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ──────────────────────────────────────────
-- DATOS SEMILLA
-- ──────────────────────────────────────────
INSERT INTO `disciplinas` (`slug`,`nombre`,`descripcion`,`icono`) VALUES
('running',   'Running',   'Conquista corriendo. La más rápida para acumular territorio.', '🏃'),
('bicicleta', 'Bicicleta', 'Pedalea y domina rutas de mayor distancia.',                   '🚴'),
('trekking',  'Trekking',  'Conquista terreno montañoso fuera del asfalto.',               '🥾');

INSERT INTO `modos_juego` (`slug`,`nombre`,`descripcion`,`color_hex`) VALUES
('versus',    'Versus',    'Reta a un usuario. El que más rutas acumule gana.', '#c0604a'),
('solitario', 'Solitario', 'Compite contigo mismo. Conquista toda tu zona.',    '#7a9968'),
('conquista', 'Conquista', 'Domina más rutas en el tiempo fijado.',             '#2e6b7e');

INSERT INTO `usuarios` (`id`,`username`,`email`,`password_hash`,`color_hex`,`bandera`,`disciplina_pref`,`puntos_totales`,`rutas_ids`,`email_verificado`) VALUES
('demo1','VeloClaimer','demo@test.com',  '$2y$12$demoHash1','#c0604a','🇪🇸','bicicleta',540,'[1,5,10]',1),
('demo2','TrailKing',  'trail@test.com', '$2y$12$demoHash2','#7aa8bc','🏴󠁥󠁳󠁶󠁣󠁿','trekking', 420,'[2,4,7,12]',1),
('demo3','MaratonCV',  'mara@test.com',  '$2y$12$demoHash3','#d4a843','🇪🇸','running',  310,'[3,8,11]',1);

INSERT INTO `rutas` (`nombre`,`disciplina_id`,`distancia_texto`,`dificultad`,`ciudad`,`lat_inicio`,`lng_inicio`,`lat_fin`,`lng_fin`,`conquistador_id`,`tiempo_record_s`,`veces_completada`) VALUES
('Vía Verde del Serpis',              2,'45 km','facil',   'Gandía – Alcoi',          38.9600,-0.1800,38.7000,-0.4700,'demo1',4680,14),
('Puentes Colgantes de Chulilla',     3,'9 km', 'media',   'Chulilla, Valencia',      39.6550,-0.8870,39.6600,-0.8950,'demo2',3240, 9),
('Parque Natural del Turia – Roja',   1,'12 km','media',   'Valencia',                39.5500,-0.6800,39.5200,-0.7100,'demo3',3900, 7),
('Forat de Bernia',                   3,'9 km', 'media',   'Serra Bernia, Alicante',  38.6800,-0.0500,38.6900,-0.0600,'demo2',2880, 6),
('Vía Verde Ojos Negros',             2,'80 km','facil',   'Valencia – interior',     39.8600,-0.8700,40.1000,-1.1000,'demo1',9600, 5),
('Marjal de Pego – Oliva',            2,'18 km','facil',   'Pego – Oliva',            38.8600,-0.1200,38.9200,-0.0800, NULL,  NULL, 3),
('Sierra Calderona – Cumbres',        3,'14 km','dificil', 'Serra, Valencia',         39.7200,-0.4300,39.7400,-0.4500,'demo2',5400, 4),
('Paseo Ribera del Xúquer',           1,'7 km', 'facil',   'Alzira – Sueca',          39.1500,-0.4300,39.2000,-0.3900,'demo3',1980, 8),
('Montanejos – Barranco del Mijares', 3,'10 km','media',   'Montanejos, Castellón',   40.0000,-0.5500,39.9800,-0.5700, NULL,  NULL, 2),
('Coll de Rates – Costa Blanca',      2,'35 km','dificil', 'Callosa d''en Sarrià',    38.6400,-0.0200,38.7200,-0.1500,'demo1',7200,11),
('Running Malvarrosa – Port Saplaya', 1,'8 km', 'facil',   'Valencia',                39.4800,-0.3300,39.5200,-0.3200,'demo3',2160, 9),
('Penyagolosa – Cima',                3,'16 km','dificil', 'Vistabella del Maestrat', 40.2200,-0.3500,40.2300,-0.3600,'demo2',6600, 3);

-- ──────────────────────────────────────────
-- VISTAS
-- ──────────────────────────────────────────
CREATE OR REPLACE VIEW `v_mapa_rutas` AS
SELECT r.id, r.nombre, r.ciudad, r.lat_inicio, r.lng_inicio, r.lat_fin, r.lng_fin,
  d.nombre AS disciplina, r.distancia_texto, r.dificultad,
  u.id AS conquistador_id, u.username AS conquistador, u.color_hex, r.tiempo_record_s, r.veces_completada
FROM rutas r
LEFT JOIN usuarios u ON u.id = r.conquistador_id
JOIN disciplinas d ON d.id = r.disciplina_id
WHERE r.activa = 1;

CREATE OR REPLACE VIEW `v_ranking_global` AS
SELECT u.id, u.username, u.color_hex, u.bandera, u.disciplina_pref,
  u.puntos_totales, JSON_LENGTH(u.rutas_ids) AS rutas_conquistadas,
  RANK() OVER (ORDER BY u.puntos_totales DESC) AS posicion
FROM usuarios u WHERE u.activo = 1;

SET FOREIGN_KEY_CHECKS = 1;
-- FIN RouteClaim v2 BBDD
