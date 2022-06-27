-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : lun. 27 juin 2022 à 11:07
-- Version du serveur : 10.4.24-MariaDB
-- Version de PHP : 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `gestion_bibliotheque`
--

-- --------------------------------------------------------

--
-- Structure de la table `adhesions`
--

CREATE TABLE `adhesions` (
  `id` int(11) NOT NULL,
  `droit` int(11) NOT NULL,
  `annee` int(11) NOT NULL,
  `lecteur_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `consultations`
--

CREATE TABLE `consultations` (
  `id` int(11) NOT NULL,
  `livre_id` int(11) NOT NULL,
  `date_cons` date NOT NULL,
  `heure_debut` time NOT NULL,
  `heur_fin` time DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `consultations`
--

INSERT INTO `consultations` (`id`, `livre_id`, `date_cons`, `heure_debut`, `heur_fin`, `created_at`, `updated_at`) VALUES
(20, 5, '2022-06-22', '02:46:54', '02:51:23', '2022-06-21 23:46:54', '2022-06-21 23:46:54');

-- --------------------------------------------------------

--
-- Structure de la table `lecteurs`
--

CREATE TABLE `lecteurs` (
  `id` int(11) NOT NULL,
  `num_lecteur` varchar(25) NOT NULL,
  `nom_lecteur` varchar(40) NOT NULL,
  `prenom_lecteur` varchar(40) DEFAULT NULL,
  `adresse_lecteur` varchar(40) NOT NULL,
  `telephone` varchar(40) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `lecteurs`
--

INSERT INTO `lecteurs` (`id`, `num_lecteur`, `nom_lecteur`, `prenom_lecteur`, `adresse_lecteur`, `telephone`, `created_at`, `updated_at`) VALUES
(7, 'LC1', 'RALPH', 'OBryan', 'Andilamena', '0321265478', '2022-06-15 14:17:42', '2022-06-15 14:17:42');

-- --------------------------------------------------------

--
-- Structure de la table `livres`
--

CREATE TABLE `livres` (
  `id` int(11) NOT NULL,
  `num_livre` varchar(25) NOT NULL,
  `disponible` tinyint(1) NOT NULL DEFAULT 1,
  `nb_pret` int(11) NOT NULL DEFAULT 0,
  `ouvrage_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `livres`
--

INSERT INTO `livres` (`id`, `num_livre`, `disponible`, `nb_pret`, `ouvrage_id`, `created_at`, `updated_at`) VALUES
(5, 'LV1', 1, 0, 7, '2022-06-15 14:17:04', '2022-06-15 14:17:04');

-- --------------------------------------------------------

--
-- Structure de la table `ouvrages`
--

CREATE TABLE `ouvrages` (
  `id` int(11) NOT NULL,
  `titre` varchar(40) NOT NULL,
  `auteur` varchar(40) NOT NULL,
  `date_edition` date DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `ouvrages`
--

INSERT INTO `ouvrages` (`id`, `titre`, `auteur`, `date_edition`, `created_at`, `updated_at`) VALUES
(7, 'Python for beginner', 'James Bonde', '2017-02-08', '2022-06-15 14:16:39', '2022-06-15 14:16:39'),
(8, 'Test', 'Test', '2022-06-21', '2022-06-21 23:47:23', '2022-06-21 23:47:23');

-- --------------------------------------------------------

--
-- Structure de la table `prets`
--

CREATE TABLE `prets` (
  `id` int(11) NOT NULL,
  `num_pret` varchar(25) NOT NULL,
  `date_pret` date NOT NULL,
  `date_retour` date DEFAULT NULL,
  `lecteur_id` int(11) NOT NULL,
  `livre_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `prets`
--

INSERT INTO `prets` (`id`, `num_pret`, `date_pret`, `date_retour`, `lecteur_id`, `livre_id`, `created_at`, `updated_at`) VALUES
(4, 'P1', '2022-06-15', NULL, 7, 5, '2022-06-15 14:18:07', '2022-06-15 14:18:07');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `fullname` varchar(50) NOT NULL,
  `pseudo` varchar(50) DEFAULT NULL,
  `password` varchar(50) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `adhesions`
--
ALTER TABLE `adhesions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `lecteur_id` (`lecteur_id`);

--
-- Index pour la table `consultations`
--
ALTER TABLE `consultations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `livre_id` (`livre_id`);

--
-- Index pour la table `lecteurs`
--
ALTER TABLE `lecteurs`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `livres`
--
ALTER TABLE `livres`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk1_OUVRAGE` (`ouvrage_id`);

--
-- Index pour la table `ouvrages`
--
ALTER TABLE `ouvrages`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `prets`
--
ALTER TABLE `prets`
  ADD PRIMARY KEY (`id`),
  ADD KEY `lecteur_id` (`lecteur_id`),
  ADD KEY `livre_id` (`livre_id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `adhesions`
--
ALTER TABLE `adhesions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `consultations`
--
ALTER TABLE `consultations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT pour la table `lecteurs`
--
ALTER TABLE `lecteurs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT pour la table `livres`
--
ALTER TABLE `livres`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `ouvrages`
--
ALTER TABLE `ouvrages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT pour la table `prets`
--
ALTER TABLE `prets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `adhesions`
--
ALTER TABLE `adhesions`
  ADD CONSTRAINT `fk1_LECTEUR` FOREIGN KEY (`lecteur_id`) REFERENCES `lecteurs` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `consultations`
--
ALTER TABLE `consultations`
  ADD CONSTRAINT `fk1_LIVRE` FOREIGN KEY (`livre_id`) REFERENCES `livres` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `livres`
--
ALTER TABLE `livres`
  ADD CONSTRAINT `fk1_OUVRAGE` FOREIGN KEY (`ouvrage_id`) REFERENCES `ouvrages` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `prets`
--
ALTER TABLE `prets`
  ADD CONSTRAINT `fk2_LECTEUR` FOREIGN KEY (`lecteur_id`) REFERENCES `lecteurs` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk2_LIVRE` FOREIGN KEY (`livre_id`) REFERENCES `livres` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
