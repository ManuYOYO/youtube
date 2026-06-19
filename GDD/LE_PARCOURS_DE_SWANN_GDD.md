# LE PARCOURS DE SWANN
## Game Design Document — Version 1.0

---

> *"Chaque journée ordinaire peut devenir une aventure extraordinaire."*

---

## TABLE DES MATIÈRES

1. [Vision du jeu](#1-vision-du-jeu)
2. [Synopsis & Scénario principal](#2-synopsis--scénario-principal)
3. [Personnages](#3-personnages)
4. [Univers & Level Design](#4-univers--level-design)
5. [Mécanique de jeu](#5-mécanique-de-jeu)
6. [Structure des niveaux](#6-structure-des-niveaux)
7. [Ennemis & Boss](#7-ennemis--boss)
8. [Dialogues & Narration](#8-dialogues--narration)
9. [Collectables & Progression](#9-collectables--progression)
10. [Direction artistique — Pixel Art](#10-direction-artistique--pixel-art)
11. [Sprites & Animations](#11-sprites--animations)
12. [Décors & Tilesets](#12-décors--tilesets)
13. [Direction audio](#13-direction-audio)
14. [Interface utilisateur (UI/UX)](#14-interface-utilisateur-uiux)
15. [Architecture technique](#15-architecture-technique)
16. [Feuille de route de développement](#16-feuille-de-route-de-développement)

---

## 1. VISION DU JEU

### 1.1 Identité du projet

| Champ | Valeur |
|---|---|
| **Titre** | Le Parcours de Swann |
| **Genre** | Plateforme 2D action-aventure |
| **Public cible** | 6–14 ans (jouable en famille) |
| **Classification PEGI** | PEGI 3 |
| **Plateforme cible** | Web (HTML5), PC, mobile |
| **Moteur recommandé** | Phaser 3 (HTML5) ou Godot 4 |
| **Résolution native** | 320×180 px (upscalé ×4 = 1280×720) |
| **Orientation** | Paysage (16:9) |
| **Durée estimée** | 4–6 heures (run complet) |
| **Mode de jeu** | Solo, local co-op (2 joueurs optionnel) |
| **Langue principale** | Français |

### 1.2 Concept central

Le joueur incarne Swann, 10 ans, une petite fille vive et imaginative. Dans son esprit, chaque tâche du quotidien — faire son lit, préparer le petit-déjeuner, finir ses devoirs — devient une quête épique dans un univers de plateforme où les meubles sont des montagnes et les appareils ménagers des boss légendaires.

Le jeu est une célébration de l'enfance, de la responsabilité et de l'imagination.

### 1.3 Piliers de design

| Pilier | Description |
|---|---|
| **Accessibilité** | Prise en main immédiate, courbe d'apprentissage douce |
| **Humour familial** | Situations drôles et reconnaissables pour parents et enfants |
| **Récompense de l'effort** | Chaque bonne action in-game a un impact narratif mesurable |
| **Imaginaire débridé** | La maison = un monde gigantesque vu par les yeux d'un enfant |
| **Empathie** | Les personnages ont de vraies émotions, le joueur y est sensible |

### 1.4 Références

- **Gameplay** : Super Mario World, Kirby's Adventure, Yoshi's Island, Chip'n Dale NES
- **Ton & narration** : Rayman Origins, Cuphead (sans la violence), A Hat in Time
- **Esthétique pixel art** : Wonder Boy, Alex Kidd, River City Girls
- **Ambiance musicale** : Kirby (chiptune joyeux), Yoshi's Island OST

---

## 2. SYNOPSIS & SCÉNARIO PRINCIPAL

### 2.1 Situation initiale

**Samedi 8h00.** La maison est silencieuse. Le soleil entre par les fenêtres du salon.

Swann dort encore. Son téléphone vibre — un message de sa meilleure amie, Léa :

> *"SWANN ! Mon anniversaire c'est aujourd'hui ! La fête commence à 14h ! Viens absolument !!! 🎂🎉"*

Swann bondit hors du lit. Mais elle sait que pour y aller, elle doit :

1. Se lever, se préparer et ranger sa chambre
2. Aider Maman pour le ménage et les corvées du matin
3. Terminer ses devoirs de mathématiques laissés en plan
4. Convaincre Papa qu'elle mérite cette sortie
5. Traverser le quartier jusqu'à la maison de Léa avant 14h00

Chaque monde est un obstacle entre Swann et la fête. Chaque victoire la rapproche du but.

### 2.2 Acte 1 — Le Chaos du Matin (Mondes 1–3)

Swann se retrouve confrontée à un réveil mécanique géant, une cuisine en ébullition et une pile de vaisselle monstrueuse. Elle doit mobiliser toute son énergie pour gérer ce matin chaotique.

**Thème** : Responsabilité et autonomie.
**Ton** : Comique, dynamique, un peu frénétique.

### 2.3 Acte 2 — L'Épreuve de l'Intelligence (Monde 4)

Les devoirs de maths transforment la table du salon en une arène de l'esprit. Les chiffres s'animent, les problèmes deviennent des créatures hostiles. Swann doit utiliser sa Réflexion Éclair pour vaincre le Monstre des Multiplications.

**Thème** : L'effort et la persévérance.
**Ton** : Légèrement stressant, mais encourageant.

### 2.4 Acte 3 — La Grande Négociation (Monde 5)

Papa est assis dans son fauteuil, bras croisés. Il faut le convaincre. Swann doit rassembler des preuves de sa bonne conduite (les Bonnes Actions collectées tout au long du jeu) et les présenter lors d'un dialogue interactif épique.

**Thème** : La communication, la confiance, la relation parent-enfant.
**Ton** : Émouvant, drôle, un peu solennel.

### 2.5 Acte 4 — La Course Finale (Monde 6)

Swann est enfin libre ! Mais il est 13h45 et la fête est à 14h00. Elle doit traverser la rue, le parc, éviter les obstacles du quartier et arriver à temps.

**Thème** : La liberté, la joie, l'accomplissement.
**Ton** : Euphorique, trépidant, triomphal.

### 2.6 Fin du jeu

Swann arrive à l'anniversaire de Léa. Les amies se retrouvent. Musique, gâteau, confettis. Dans la dernière scène, Papa regarde Swann depuis la porte, souriant. Il cligne de l'œil.

**Message final** : *"Même les journées ordinaires méritent d'être vécues comme des aventures."*

---

## 3. PERSONNAGES

### 3.1 SWANN — L'Héroïne

#### Biographie
- **Âge** : 10 ans
- **Personnalité** : Curieuse, audacieuse, généreuse, parfois impulsive
- **Motivation** : Aller à l'anniversaire de Léa, mais aussi prouver qu'elle est responsable
- **Peur secrète** : Décevoir ses parents
- **Talent caché** : Elle comprend intuitivement les gens

#### Apparence pixel art
- Sprite de **16×24 pixels** (base), upscalé ×4
- **Cheveux** : Blonds, ondulés, queue de cheval légèrement de travers
- **Yeux** : Bleu-vert (2 pixels, légèrement brillants)
- **Tenue** : Jean bleu clair avec mini-cœurs roses brodés, tee-shirt blanc, chaussures roses à semelle blanche
- **Accessoire** : Petite étoile rose accrochée à son tee-shirt (indicateur de charge de pouvoirs)

#### Statistiques de base
| Stat | Valeur |
|---|---|
| Vitesse de course | 3.5 px/frame |
| Hauteur de saut | 5 tiles |
| Double saut | Oui (après upgrade) |
| Points de vie | 3 cœurs |
| Portée attaque chat | 4 tiles |

#### Pouvoir n°1 : Réflexion Éclair ⚡
- **Déclencheur** : Touche [X] ou bouton B (gamepad)
- **Effet** : Ralentit le temps à 20% pendant 5 secondes
- **Cooldown** : 15 secondes
- **Jauge** : 3 charges max, se recharge en collectant des Étoiles Roses
- **Usages** :
  - Résoudre des séquences de plateformes rapides
  - Lire des indices cachés dans le décor
  - Convaincre un PNJ hésitant (mini-dialogue accéléré)
  - Désactiver un mécanisme complexe
- **Indicateur visuel** : L'écran prend une teinte bleutée, Swann brille légèrement

#### Pouvoir n°2 : Attaque Maine Coon 🐱
- **Déclencheur** : Touche [Z] ou bouton A (gamepad)
- **Effet** : Le chat bondit dans la direction indiquée
- **Cooldown** : 8 secondes
- **Jauge** : 5 pelotes de laine = 5 utilisations par niveau (rechargeables)
- **Usages** :
  - Attaquer les ennemis à distance
  - Activer des interrupteurs hors de portée
  - Distraire les adultes (Papa regarde le chat, Swann passe)
  - Récupérer des objets sur des plateformes inaccessibles
- **Indicateur visuel** : Le chat lance une pelote de laine lumineuse

---

### 3.2 MOUSTACHE — Le Chat Maine Coon

- **Espèce** : Maine Coon
- **Couleur** : Gris tigré avec touffe de poitrine blanche
- **Personnalité** : Loyal, un peu paresseux, mais toujours présent quand il le faut
- **Taille sprite** : 12×10 pixels
- **Comportement** : Suit Swann passivement (IA de suivi simple), devient actif lors du déclenchement du pouvoir
- **Animations** : Idle (respiration), Course, Saut, Attaque, Ronronnement (victoire)

---

### 3.3 PAPA — Le Gardien Bienveillant

#### Biographie
- **Profession** : Architecte (travaille souvent le week-end)
- **Personnalité** : Sérieux mais drôle, protecteur, très juste
- **Relation à Swann** : Il la taquine, la teste, mais est très fier d'elle
- **Rôle gameplay** : Obstacle principal (monde 5), mais aussi PNJ d'aide dans certains niveaux

#### Apparence pixel art
- Sprite de **18×28 pixels**
- **Peau** : Noire
- **Tenue** : Pantalon noir, sweat-shirt noir, chaussettes rayées (détail comique)
- **Accessoire** : Lunettes rectangulaires, tasse de café toujours à la main
- **Expression par défaut** : Sourcil levé (dubitatif)

#### Rôle dans le monde 5
- Le boss dialogue est divisé en 3 rounds
- Chaque round = une question de Papa
- Swann répond avec ses Bonnes Actions collectées
- Papa se radoucit progressivement (sprite change d'expression à chaque round)

---

### 3.4 MAMAN — La Commandante Douce

#### Biographie
- **Personnalité** : Organisée, efficace, bienveillante, légèrement stressée le matin
- **Rôle gameplay** : Donneuse de quêtes principale dans les mondes 2 et 3
- **Phrase récurrente** : *"Swann, tu as pensé à... ?"*

#### Apparence pixel art
- Sprite de **18×26 pixels**
- **Peau** : Blanche
- **Tenue** : Jean gris, tee-shirt à rayures bleues et blanches, tablier de cuisine (monde 2 uniquement)
- **Cheveux** : Châtain clair, chignon rapide
- **Accessoire** : Liste de courses tenue à la main

---

### 3.5 LA GRANDE SŒUR — Zélie

#### Biographie
- **Âge** : 13 ans
- **Personnalité** : Ado typique — parfois agaçante, parfois protectrice, toujours présente
- **Relation à Swann** : Rivalité affectueuse. Elles se chamaillent mais s'aiment
- **Rôle gameplay** : Alliée dans certains niveaux (monde 4), rivale dans d'autres (monde 1)

#### Apparence pixel art
- Sprite de **16×26 pixels**
- **Cheveux** : Bruns, ondulés, lâchés
- **Tenue** : Jean skinny, tee-shirt à slogan, écouteurs autour du cou
- **Expression par défaut** : Légèrement désintéressée, un sourire en coin

#### Comportement gameplay
- Dans le monde 1 : Elle bloque le couloir de salle de bain (mini-boss de niveau)
- Dans le monde 4 : Elle peut aider Swann sur un exercice difficile (quête secondaire)
- Peut être convaincue avec des arguments (mini-dialogue) ou déjouée par Moustache

---

### 3.6 LÉA — L'Amie Absente

- N'apparaît qu'en début et fin de jeu
- Envoie des messages texte qui apparaissent comme des pop-ups à l'écran
- Sa présence motive toute l'aventure

---

## 4. UNIVERS & LEVEL DESIGN

### 4.1 Philosophie visuelle de la maison

La maison est vue à travers les yeux de Swann : tout est gigantesque, mystérieux, plein de vie cachée. Un canapé devient une montagne. Une table basse devient une falaise. Les escaliers sont une ascension épique.

**Règle de scale** : Les objets mesurent 4 à 8× la taille réelle pour créer la sensation d'un monde-jouet.

### 4.2 Plan général de la maison

```
[GRENIER SECRET] ←— Niveau bonus caché
       ↑
[COULOIR SUPÉRIEUR] — Chambre de Swann — Chambre de Zélie — Salle de bain
       ↑
[ESCALIERS]
       ↑
[COULOIR INFÉRIEUR]
       ↓
[SALON] — [CUISINE] — [BUANDERIE] — [GARAGE]
       ↓
    [JARDIN]
       ↓
    [CAVE] ←— Niveau secret
```

### 4.3 Métaphores visuelles par pièce

| Pièce | Métaphore principale | Ambiance |
|---|---|---|
| Chambre de Swann | Forteresse magique personnelle | Chaude, rose, étoilée |
| Couloir | Donjon intermédiaire | Légèrement sombre, mystérieux |
| Salle de bain | Grotte aquatique | Bleue, vaporeuse |
| Escaliers | Montagne à gravir | Vertigineuse, dynamique |
| Salon | Prairie géante avec canapés-montagnes | Lumineuse, verte (plantes) |
| Cuisine | Usine alimentaire en ébullition | Rouge, chaude, vaporeuse |
| Jardin | Forêt extérieure | Verte, ensoleillée, ventée |
| Grenier | Royaume perdu et poussiéreux | Dorée, mystique |
| Cave | Souterrain sombre | Bleutée, froide, effrayante |
| Garage | Zone industrielle | Grise, métallique |

### 4.4 Éléments de décor interactifs

| Objet réel | Rôle gameplay |
|---|---|
| Canapé | Plateforme rebondissante (+10% hauteur de saut) |
| Table basse | Plateforme centrale principale |
| Chaises | Obstacles à pousser ou escalader |
| Tapis | Ralentit la course (-20% vitesse) |
| Aspirateur | Ennemi mobile (voir ennemis) |
| Jouets au sol | Power-ups déguisés |
| Cartable scolaire | Coffre à collectable |
| Assiette posée | Tremplin (saut ×1.5) |
| Rideau | Cachette / passage secret |
| Pile de livres | Tour-plateforme instable |
| Panier à linge | Trampoline souple |
| Frigo ouvert | Porte-bonus (ralentit le temps brièvement) |

---

## 5. MÉCANIQUE DE JEU

### 5.1 Contrôles de base

| Action | Clavier | Gamepad |
|---|---|---|
| Courir droite/gauche | Flèches / A-D | Joystick gauche / D-pad |
| Sauter | Espace / W | Bouton A / Croix |
| Double saut | Espace ×2 (après upgrade) | A ×2 |
| Accroupir | S / Flèche bas | Joystick bas / D-pad bas |
| Attaque Maine Coon | Z | Bouton X / Carré |
| Réflexion Éclair | X | Bouton B / Rond |
| Interagir / Parler | E / Entrée | Bouton Y / Triangle |
| Pause | P / Échap | Start |

### 5.2 Physique de jeu

```
Gravité               : 0.35 px/frame²
Vitesse max course    : 3.5 px/frame
Accélération sol      : 0.4 px/frame
Décélération sol      : 0.6 px/frame (freinage plus rapide que l'accélération)
Vitesse en l'air      : 3.0 px/frame (légère perte de contrôle)
Vitesse de chute max  : 8 px/frame
Hauteur saut normal   : 96 px (6 tiles)
Hauteur double saut   : 48 px supplémentaires (3 tiles)
Coyote time           : 8 frames (tolérance de saut bord de plateforme)
Jump buffer           : 10 frames (anticipation d'appui saut)
```

### 5.3 Système de vies et continues

- **3 cœurs** = 3 points de vie
- Blessure = clignotement + 2 secondes d'invincibilité
- Mort = perte d'un cœur, retour au dernier checkpoint
- **Checkpoints** : Livres roses brillants posés dans les niveaux
- **Game Over** : Perte des 3 cœurs = retour au début du monde avec 3 cœurs
- **Continues** : Illimités (jeu familial, pas punitif)

### 5.4 Système de dialogue interactif

Utilisé dans les moments de négociation et de conviction.

```
Structure d'un dialogue :
┌─────────────────────────────────────┐
│  [Portrait PNJ]  Texte de la        │
│                  question/remarque  │
│                                     │
│  > Option A (coûte 0 Bonne Action)  │
│    Option B (coûte 1 Bonne Action)  │
│    Option C (coûte 2 Bonnes Actions)│
└─────────────────────────────────────┘
```

- Certaines options sont grisées si le joueur n'a pas assez de Bonnes Actions
- Les mauvaises réponses font perdre de la progression dans la négociation
- Le compteur de Bonnes Actions restantes est visible en haut à droite

### 5.5 Système de Réflexion Éclair

Quand activée :
1. La musique passe en version ralentie/filtrée
2. L'écran prend une teinte bleue avec légère vignette
3. Swann brille d'une aura blanche
4. Tous les ennemis ralentissent
5. Des indices lumineux apparaissent dans le décor (flèches, contours de plateformes cachées)
6. Les PNJ hésitants deviennent influençables
7. Durée : 5 secondes réelles (25 secondes en temps de jeu)

### 5.6 Système de Quêtes

Chaque monde principal contient :
- **1 quête principale** (obligatoire pour progresser)
- **1–2 quêtes secondaires** (optionnelles, récompensent en Bonnes Actions)

Exemple (Monde 2 — La Cuisine du Chaos) :
- Quête principale : Préparer le petit-déjeuner (café, tartines, jus)
- Quête secondaire A : Rapporter les céréales préférées de Zélie
- Quête secondaire B : Ne pas renverser une seule assiette

### 5.7 Progression et déblocages

| Condition | Récompense |
|---|---|
| Terminer Monde 1 | Débloque le double saut |
| Collecter 30 Étoiles dans Monde 2 | Costume bonus "Chef cuisto" |
| Vaincre tous les mini-boss | Galerie d'artworks |
| Finir le jeu avec 50+ Bonnes Actions | Fin alternative (Papa participe à la fête) |
| Trouver le Grenier secret | Monde bonus + OST complet |

---

## 6. STRUCTURE DES NIVEAUX

### 6.1 MONDE 1 — Le Réveil Héroïque

**Lieu** : Chambre de Swann + Couloir + Salle de bain
**Heure du jeu** : 8h00
**Objectif** : Se lever, se préparer, ranger sa chambre

#### Cinématique d'introduction
- Swann dort. Le téléphone vibre. Elle lit le message de Léa.
- Ellipse poétique : Dans son esprit, sa chambre devient une forteresse géante.
- Le réveil transforme en **Réveil Géant Mécanique** clignote et sonne.

#### Sous-niveaux

**1-1 : La Montagne du Matelas**
- Swann doit sortir de son lit géant
- Le duvet est un sol mou qui ralentit (comme la neige dans Mario)
- Des oreillers tombent comme des blocs
- Premier ennemi : Chaussettes-Fantômes (vieux chaussettes perdues qui flottent)
- Premier collectable : Étoile Rose sous l'oreiller

**1-2 : Le Placard aux Mystères**
- Swann cherche ses vêtements du jour
- Le placard est un labyrinthe de vêtements accrochés
- Mécanisme : Pousser les cintres pour créer des passages
- Ennemi : Cravates de Papa qui pendent et fouettent
- Collectable : Tenue complète (jean + tee-shirt + chaussures roses)

**1-3 : Le Couloir du Destin**
- Zélie bloque la salle de bain
- Mini-boss : Zélie en mode ado matinal (ne répond pas, écouteurs sur les oreilles)
- Solution : Convaincre via dialogue (Swann a 3 tentatives), OU utiliser Moustache pour distraire Zélie

**1-4 : La Salle de Bain Aquatique**
- Platformer aquatique
- Robinet géant = cascade à éviter
- Savon géant = sol glissant
- Brosse à dents géante = rampe

#### BOSS 1 : Le Réveil Géant Mécanique

```
┌────────────────────────────────────┐
│  BOSS : RÉVEIL GÉANT               │
│  PV : 6 barres                     │
│  Taille : 4 tiles × 6 tiles        │
├────────────────────────────────────┤
│  PHASE 1 (6→4 PV) :                │
│  Sonne → onde de choc sonore       │
│  Tourne ses aiguilles → projectile │
│                                    │
│  PHASE 2 (4→2 PV) :                │
│  Saute sur la plateforme           │
│  Lance des mini-réveils            │
│                                    │
│  PHASE 3 (2→0 PV) :                │
│  Tourne, sonne ET saute            │
│  Vulnérable : bouton snooze (dos)  │
├────────────────────────────────────┤
│  FAIBLESSES :                      │
│  → Appuyer sur le bouton Snooze    │
│     (situé dans son dos)           │
│  → 3 frappes de Moustache suffisent│
├────────────────────────────────────┤
│  RÉCOMPENSE :                      │
│  → Débloque le Double Saut         │
│  → +5 Étoiles Roses                │
│  → Cinématique : Swann prête       │
└────────────────────────────────────┘
```

---

### 6.2 MONDE 2 — La Cuisine du Chaos

**Lieu** : Cuisine
**Heure du jeu** : 8h30
**Objectif** : Préparer le petit-déjeuner pour toute la famille

#### Ambiance
Cuisne vue comme une usine industrielle en ébullition. Vapeur partout. Casseroles qui bouillonnent. Le grille-pain crache du feu. La cafetière rugit.

#### Sous-niveaux

**2-1 : L'Arène du Plan de Travail**
- Swann saute de surface en surface sur le plan de travail
- Éviter les jets de vapeur de la casserole
- Collecter les ingrédients du petit-déjeuner
- Ennemi : Cuillères-Rebelles animées

**2-2 : Le Frigo Gelé**
- Niveau à thème glace
- Intérieur du frigo = plateforme gelée
- Chercher le jus d'orange (collectable-quête)
- Ennemi : Glaçons sauteurs

**2-3 : La Jungle du Garde-Manger**
- Placard géant = forêt verticale de boîtes et conserves
- Mécanisme : Faire tomber des boîtes pour créer des plateformes
- Ennemi : Guêpes de céréales renversées

**2-4 : La Traversée du Buffet**
- Course horizontale sur le meuble du buffet
- Assiettes qui tombent (obstacles)
- Collectables : Tasses à café pour Papa

#### BOSS 2 : Le Grille-Pain Furieux

```
┌────────────────────────────────────┐
│  BOSS : GRILLE-PAIN FURIEUX        │
│  PV : 5 barres                     │
│  Taille : 3 tiles × 4 tiles        │
├────────────────────────────────────┤
│  PHASE 1 :                         │
│  Lance des toasts brûlants         │
│  (projectile arc parabolique)      │
│                                    │
│  PHASE 2 :                         │
│  Crache des flammes latérales      │
│  Saute d'un côté à l'autre         │
│                                    │
│  PHASE 3 :                         │
│  Lance toasts ENFLAMMÉS            │
│  + crée des cendres au sol         │
│     (dommages de contact)          │
├────────────────────────────────────┤
│  FAIBLESSE :                       │
│  → Arroser avec le jus d'orange    │
│     (collectable du niveau 2-2)    │
│  → Alternativement : Moustache ×4  │
├────────────────────────────────────┤
│  RÉCOMPENSE :                      │
│  → +2 Bonnes Actions               │
│  → +8 Étoiles Roses                │
│  → Maman remercie Swann            │
└────────────────────────────────────┘
```

---

### 6.3 MONDE 3 — Mission Vaisselle

**Lieu** : Cuisine + Arrière-cuisine
**Heure du jeu** : 9h00
**Objectif** : Laver toute la vaisselle

#### Sous-niveaux

**3-1 : La Tour d'Assiettes**
- Pile d'assiettes géante = tour à escalader
- Chaque mouvement fait vaciller la pile
- Mécanique unique : Équilibre (barre de stabilité en haut de l'écran)
- Si la stabilité tombe à 0 → les assiettes tombent (reset du niveau)

**3-2 : La Rivière de Mousse**
- Évier transformé en rivière d'eau savonneuse
- Nager contre le courant
- Plateformes = éponges flottantes
- Ennemi : Bulles de savon géantes qui explosent

**3-3 : Le Lave-Vaisselle Mécanique**
- Zone d'infiltration
- Éviter les jets d'eau bouillants
- Collecter les assiettes sales et les placer dans le lave-vaisselle
- Mécanique puzzle : Ordre de placement (par taille, par type)

#### BOSS 3 : La Montagne d'Assiettes

```
┌────────────────────────────────────┐
│  BOSS : LA MONTAGNE D'ASSIETTES    │
│  PV : 4 barres (1 par strate)      │
│  Forme : Tour de 4 assiettes       │
├────────────────────────────────────┤
│  MÉCANIQUE :                       │
│  Vaincre chaque strate = 1 PV      │
│  La strate détruite tombe          │
│  Danger : Assiettes qui tombent    │
│                                    │
│  ATTAQUES :                        │
│  → Lance des assiettes comme des   │
│     frisbees                       │
│  → Projette de la mousse           │
│  → Attaque de chute verticale      │
├────────────────────────────────────┤
│  FAIBLESSE :                       │
│  → Frapper la strate la plus haute │
│     (nécessite double saut)        │
│  → Moustache peut grimper          │
├────────────────────────────────────┤
│  RÉCOMPENSE :                      │
│  → +3 Bonnes Actions               │
│  → +6 Étoiles Roses                │
│  → Cuisine propre → cutscene Maman │
└────────────────────────────────────┘
```

---

### 6.4 MONDE 4 — Les Devoirs Infernaux

**Lieu** : Salon (table basse) + Bureau imaginaire
**Heure du jeu** : 10h00
**Objectif** : Terminer les exercices de mathématiques

#### Concept unique
Ce monde bascule entre réalité (Swann à sa table) et monde imaginaire (l'intérieur de son cahier). La caméra zoome sur le cahier → transition vers un monde de papier quadrillé géant.

#### Sous-niveaux

**4-1 : Le Territoire du Cahier**
- Swann entre dans son cahier de maths
- Décor : Papier quadrillé géant avec des chiffres gravés
- Plateformes = lignes du cahier
- Ennemi : Fautes d'orthographe qui volent

**4-2 : Les Montagnes de Nombres**
- Additions géantes = plateformes (2+3 = une tour de 5 blocs)
- Puzzle : Trouver la bonne combinaison de chiffres pour créer un pont
- Mécanique : Zélie peut aider → donner le bon résultat active une plateforme

**4-3 : Le Labyrinthe de la Table de 7**
- Labyrinthe dont les portes s'ouvrent avec les bons résultats
- Le joueur répond aux multiplications via des panneaux interactifs
- Récompense : Bonne réponse = passage ouvert + étoile rose
- Mauvaise réponse = ennemi spawne

**4-4 : L'Arène du Problème Final**
- Le problème écrit dans le cahier prend vie comme un puzzle de plateforme
- Résoudre = ouvrir le chemin vers le boss

#### BOSS 4 : Le Monstre des Multiplications

```
┌────────────────────────────────────┐
│  BOSS : MONSTRE DES MULT.          │
│  PV : 7 barres                     │
│  Forme : Chiffre "×" géant animé   │
├────────────────────────────────────┤
│  PHASE 1 :                         │
│  Lance des problèmes de maths      │
│  Chaque problème raté = projectile │
│  Chaque problème réussi = PV -1    │
│                                    │
│  PHASE 2 :                         │
│  Invoque des Fractions-Fantômes    │
│  (ennemis mineurs flottants)       │
│                                    │
│  PHASE 3 :                         │
│  Entoure Swann d'équations         │
│  Seule la Réflexion Éclair permet  │
│  de lire les solutions cachées     │
│  dans le décor                     │
├────────────────────────────────────┤
│  MÉCANIQUE UNIQUE :                │
│  → Ce boss ne se bat pas avec les  │
│     poings mais avec l'intelligence│
│  → Répondre correctement = attaque │
│  → Moustache peut distraire 5 sec  │
├────────────────────────────────────┤
│  RÉCOMPENSE :                      │
│  → +5 Bonnes Actions (le plus gros │
│     gain du jeu)                   │
│  → Zélie : "Pas mal pour une gamine│
│  → Débloque l'accès à Papa        │
└────────────────────────────────────┘
```

---

### 6.5 MONDE 5 — Le Convaincre-Papa

**Lieu** : Salon (fauteuil de Papa)
**Heure du jeu** : 11h30
**Objectif** : Obtenir l'autorisation de Papa pour aller à la fête

#### Concept unique
Ce monde est quasi intégralement basé sur le dialogue et la conviction. C'est le monde le plus court en platformer (quelques sections), mais le plus long en interaction narrative.

#### Structure

**5-1 : Rassembler les Preuves**
- Swann doit retrouver ses Bonnes Actions matérialisées comme des cartes lumineuses
- Certaines sont cachées dans des coffres (cartables, boîtes)
- Ennemi : Doutes animés (petits nuages noirs qui effacent les cartes si touchés)

**5-2 : L'Approche du Trône**
- Le fauteuil de Papa = château fort
- Swann doit atteindre Papa sans être vue (furtivité optionnelle)
- Mécanisme : Si Papa la voit désœuvrée → malus de -1 Bonne Action
- Moustache peut créer une diversion

**5-3 : La Grande Négociation (Dialogue Boss)**

---

#### BOSS 5 : Papa — La Négociation Finale

```
┌────────────────────────────────────┐
│  BOSS : PAPA (Dialogue Interactif) │
│  BARRE : Mètre de Confiance (0-10) │
│  Objectif : Atteindre 8/10         │
├────────────────────────────────────┤
│  ROUND 1 : "As-tu fait tes devoirs?"│
│                                    │
│  A) "Oui Papa, et j'ai tout bon"  │
│     (+3 confiance si 5+ BA)        │
│  B) "Presque... il restait 2 exo"  │
│     (+1 confiance)                 │
│  C) "J'avais pas envie"            │
│     (-2 confiance)                 │
│                                    │
│  ROUND 2 : "As-tu aidé Maman ?"    │
│                                    │
│  A) "Oui j'ai fait la vaisselle"   │
│     (+3 confiance si quête 3 faite)│
│  B) "J'ai essayé..."               │
│     (+1 confiance)                 │
│  C) [Silence]                      │
│     (-1 confiance)                 │
│                                    │
│  ROUND 3 : "Pourquoi devrais-je    │
│  te faire confiance ?"             │
│                                    │
│  Swann peut dépenser des BA :      │
│  → 1 BA = +1 confiance             │
│  → Présenter les preuves : +2      │
│  → Faire intervenir Maman : +3     │
│     (si Maman a été aidée)         │
├────────────────────────────────────┤
│  SI CONFIANCE ≥ 8 :                │
│  Papa sourit → "OK, mais rentre    │
│  avant 18h."                       │
│  → Victoire + cutscene émouvante  │
│                                    │
│  SI CONFIANCE < 8 :                │
│  Papa hésite → mini-jeu de 60 sec  │
│  (convaincre Papa avec Moustache   │
│  et Zélie comme alliés)            │
│  → Victoire possible mais réduite  │
└────────────────────────────────────┘
```

---

### 6.6 MONDE 6 — La Course vers l'Anniversaire

**Lieu** : Quartier (rue, parc, jardin de Léa)
**Heure du jeu** : 13h45
**Objectif** : Arriver à la fête avant 14h00

#### Concept : Runner hybride
Ce monde fonctionne comme un **auto-runner** (Swann court automatiquement) avec des éléments de plateforme classique. Le chronomètre est visible à l'écran.

#### Sous-niveaux

**6-1 : La Rue Animée**
- Éviter les vélos, poussettes, et chiens en laisse
- Collecter des Étoiles pour augmenter la vitesse
- Interrupteur = passage piéton (temporise le trafic)

**6-2 : Le Parc du Vent**
- Vent latéral qui pousse Swann
- Pigeons géants (obstacles volants)
- Raccourci : Arbre à grimper pour couper le chemin

**6-3 : L'Allée Finale**
- Sprint final
- Le Retard (boss final) poursuit Swann depuis la gauche
- Plus on est lent, plus il est proche
- Collectables : Confettis (bonus de vitesse)

#### BOSS FINAL : Le Retard

```
┌────────────────────────────────────┐
│  BOSS FINAL : LE RETARD            │
│  Forme : Ombre géante en forme     │
│  d'horloge avec tentacules         │
│  PV : 5 barres                     │
├────────────────────────────────────┤
│  MÉCANIQUE :                       │
│  Le Retard POURSUIT Swann          │
│  S'il la touche → -30 secondes     │
│  Si Swann prend de l'avance        │
│    → Le Retard perd 1 barre de PV  │
│                                    │
│  ATTAQUES :                        │
│  → Lance des tentacules devant     │
│  → Crée des obstacles (voitures,   │
│     chiens, passants)              │
│  → Ralentit Swann (zone grisée)    │
│                                    │
│  COUNTERS :                        │
│  → Moustache bondit et mord les    │
│     tentacules                     │
│  → Réflexion Éclair = immunité 5s  │
│  → Collecter 5 confettis = sprint  │
├────────────────────────────────────┤
│  VICTOIRE :                        │
│  Swann touche la sonnette de Léa   │
│  Avant 14h00 → victoire parfaite   │
│  Avant 14h30 → victoire normale    │
│  Après 14h30 → victoire avec malus │
└────────────────────────────────────┘
```

---

## 7. ENNEMIS & BOSS

### 7.1 Catalogue des ennemis de base

#### CHAUSSETTE-FANTÔME
- **Monde** : 1
- **Comportement** : Flotte en zigzag
- **Attaque** : Contact
- **Faiblesse** : Moustache × 1
- **Sprite** : 8×8 pixels, chaussette rayée avec yeux

#### CRAVATE-FOUET
- **Monde** : 1
- **Comportement** : Pend du plafond, se balance
- **Attaque** : Whip (fouet horizontal)
- **Faiblesse** : Sauter par-dessus ou Moustache
- **Sprite** : 4×16 pixels, cravate à pois

#### CUILLÈRE-REBELLE
- **Monde** : 2
- **Comportement** : Marche en ligne droite, rebondit sur les murs
- **Attaque** : Contact + éclaboussure de soupe
- **Faiblesse** : Saut dessus × 1
- **Sprite** : 8×12 pixels, cuillère avec bras et jambes

#### GLAÇON SAUTEUR
- **Monde** : 2
- **Comportement** : Saute verticalement
- **Attaque** : Gel temporaire si contact
- **Faiblesse** : Moustache × 1 (il fond)
- **Sprite** : 6×10 pixels, glaçon avec visage grognon

#### GUÊPE DE CÉRÉALES
- **Monde** : 2
- **Comportement** : Vol en "8" horizontal
- **Attaque** : Piqûre (recul + dégât)
- **Faiblesse** : Moustache × 2
- **Sprite** : 10×8 pixels, guêpe avec torche céréale

#### BULLE DE SAVON
- **Monde** : 3
- **Comportement** : Monte lentement, explose au contact
- **Attaque** : Explosion de savon (glisse le sol)
- **Faiblesse** : Évitement (pas de combat possible)
- **Sprite** : 12×12 pixels, bulle arc-en-ciel semi-transparente

#### FAUTE D'ORTHOGRAPHE
- **Monde** : 4
- **Comportement** : Vole en ligne, accélère si Swann la regarde
- **Attaque** : Contact = -1 Bonne Action
- **Faiblesse** : Réflexion Éclair (révèle sa forme correcte)
- **Sprite** : 10×10 pixels, lettres rouges barrées

#### FRACTION-FANTÔME
- **Monde** : 4
- **Comportement** : Oscille de gauche à droite
- **Attaque** : Contact = confusion (contrôles inversés 3 sec)
- **Faiblesse** : Moustache × 1
- **Sprite** : 8×12 pixels, fraction avec visage malveillant

#### DOUTE ANIMÉ
- **Monde** : 5
- **Comportement** : Cherche les cartes de Bonnes Actions
- **Attaque** : Efface une carte si contact
- **Faiblesse** : Lumière (Réflexion Éclair les chasse)
- **Sprite** : 12×12 pixels, nuage noir avec yeux

#### PIGEON DU PARC
- **Monde** : 6
- **Comportement** : Vol aléatoire, charge si Swann s'approche
- **Attaque** : Choc frontal (recul)
- **Faiblesse** : Esquive (pas de combat) ou Moustache
- **Sprite** : 12×10 pixels, pigeon classique avec attitude hostile

#### CHIEN EN LAISSE
- **Monde** : 6
- **Comportement** : Tire sur sa laisse, zone d'attaque limitée
- **Attaque** : Morsure (zone fixe)
- **Faiblesse** : Passer hors de sa portée
- **Sprite** : 14×12 pixels, chien excité avec laisse

### 7.2 Ennemis spéciaux

#### ASPIRATEUR ROBOT (Boss de couloir)
- **Monde** : 1 (couloir)
- **PV** : 3
- **Comportement** : Patrouille d'un mur à l'autre, aspire dans un rayon de 2 tiles
- **Attaque** : Aspiration progressive (tire Swann vers lui)
- **Faiblesse** : Le retourner avec Moustache → aspire ses propres projectiles

#### MAMAN EN MODE ORGANISATION
- **Monde** : 2-3 (non hostile)
- **Comportement** : Traverse les niveaux avec sa liste, donne des quêtes
- **Si Swann l'ignore** : Perd 1 Bonne Action par quête ratée
- **Si Swann l'aide** : Gagne 2 Bonnes Actions + bouclier temporaire

---

## 8. DIALOGUES & NARRATION

### 8.1 Style narratif

- Pas de voix off — tout passe par des bulles de dialogue pixel art
- Chaque bulle a une couleur selon le personnage :
  - Swann : Blanc avec bordure rose
  - Papa : Gris foncé avec bordure noire
  - Maman : Bleu clair avec bordure bleue
  - Zélie : Violet avec bordure mauve
  - Moustache : Vert avec bordure verte (icône patte)
- Texte : Police pixel retro (Press Start 2P ou similaire)

### 8.2 Dialogues d'introduction — Cinématique monde 1

```
[8h00 - Chambre de Swann - Obscurité]

[Vibration du téléphone]

LÉA (message) :
"SWANN ! Mon anniversaire c'est 
AUJOURD'HUI ! La fête commence à 14h !
Tu DOIS venir !! 🎂🎉🎈"

[Swann se réveille d'un bond]

SWANN :
"14h... 14H !! 
Il est 8h du matin !!!"

MOUSTACHE :
"Mrrrow..." 
(= Traduction : "Rendors-toi")

SWANN :
"Moustache, on a exactement 6 heures
pour convaincre Papa, aider Maman,
finir mes devoirs ET aller à la fête."

MOUSTACHE :
"..."
(= Traduction : "Je reste au lit")

SWANN :
"...Tu viens quand même."
```

### 8.3 Dialogues — Interaction avec Maman (Monde 2)

```
[Cuisine - Maman devant le frigo]

MAMAN :
"Swann ! Tu es levée !
Parfait. J'ai besoin de toi."

SWANN :
"Bonjour Maman ! Je voulais te dire—"

MAMAN :
"La liste est sur le comptoir.
Petit-déjeuner pour tout le monde, 
café pour Papa, et range le lave-vaisselle."

SWANN :
"Mais j'avais—"

MAMAN :
"Et après tu pourras me parler.
D'abord les corvées, ma chérie."

[Swann regarde Moustache]

SWANN :
"Tu vois ? C'est toujours comme ça."

MOUSTACHE :
"Mrrrow" (= "Je savais qu'il fallait rester au lit")
```

### 8.4 Dialogues — Confrontation Zélie (Monde 1-3)

```
[Couloir - Zélie bloque la salle de bain]

SWANN :
"Zélie ! Tu es là depuis combien
de temps dans la salle de bain ?!"

ZÉLIE :
"..."
[Elle a ses écouteurs, n'entend pas]

SWANN :
"ZÉLIIIIE !!"

ZÉLIE :
[Elle baisse un écouteur]
"Quoi ? Ah. Je serai sortie 
dans 20 minutes."

SWANN :
"20 MINUTES ?! La fête de Léa est—"

ZÉLIE :
"Léa ? L'anniversaire de Léa, c'est
aujourd'hui ? Pourquoi tu me dis pas 
ces choses ?!"
[Écouteurs remis]

[Swann soupire. Moustache s'assoit 
sur le pied de Zélie.]

ZÉLIE :
"Ah ! Moustache non ! Ok ok, 
j'arrive dans 5 minutes."

SWANN :
"Merci Moustache."
MOUSTACHE :
"Mrrrow." (= "De rien")
```

### 8.5 Dialogues — Monde 4, Zélie aide aux devoirs

```
[Salon - Swann bloquée sur un exercice]

SWANN :
"7 fois 8... 7 fois 8..."
[Elle compte sur ses doigts]

ZÉLIE :
[Elle passe derrière Swann]
"C'est 56."

SWANN :
"Je le savais !"

ZÉLIE :
"Bien sûr."
[Elle s'éloigne]

SWANN :
"...Zélie ?"

ZÉLIE :
"Quoi."

SWANN :
"Merci."

ZÉLIE :
[Sans se retourner, légère pause]
"...Dépêche-toi de finir."
```

### 8.6 Dialogues — Boss Papa (Monde 5)

```
[Salon - Papa dans son fauteuil]

PAPA :
"Swann. Assieds-toi."

SWANN :
[Elle s'assoit sur le bord du canapé]

PAPA :
"Tu veux aller chez Léa."

SWANN :
"Oui Papa."

PAPA :
"Tu as fini tes devoirs ?"

[Option dialogue A]
SWANN :
"Oui ! J'ai tout fini. Même les exercices
en plus que Zélie m'avait montrés."

PAPA :
[Sourcil légèrement moins levé]
"Hmm. Et la cuisine ?"

[Option dialogue A]
SWANN :
"J'ai fait la vaisselle ET le 
petit-déjeuner pour tout le monde."

PAPA :
[Il pose sa tasse de café]
"..."
[Long silence]
"Et tu as rangé ta chambre ?"

SWANN :
"Oui Papa."

PAPA :
[Il se lève lentement]
"Tu sais pourquoi je te pose 
toutes ces questions ?"

SWANN :
"Parce que tu es strict ?"

PAPA :
[Il sourit — premier sourire du monde]
"Parce que je veux que tu comprennes
que la liberté, ça se mérite.
Et là... je pense que tu l'as méritée."

[Il tend la main]

PAPA :
"Rentre avant 18h.
Et dis bonjour à Léa de ma part."

SWANN :
[Elle saute de joie]
"MEEERRCI PAPAAAA !!!"

PAPA :
[Il regarde Moustache]
"Et toi, tu veilles sur elle."

MOUSTACHE :
"Mrrrow." (= "Évidemment")
```

### 8.7 Dialogue final — Arrivée à la fête

```
[Jardin de Léa - Confettis - 13h58]

LÉA :
"SWANN !!!"

SWANN :
"LÉA !!! BONNE ANNIIIIIV !!!"

[Elles s'étreignent]

LÉA :
"Je pensais pas que tu viendrais !"

SWANN :
"J'ai failli ne pas venir.
Il s'est passé des trucs DINGUES 
ce matin."

LÉA :
"Genre quoi ?"

SWANN :
"Genre... une aventure."

[Elle se retourne. Au bout de la rue,
Papa est appuyé contre la voiture.
Il lève le pouce.]

[Swann lève le pouce en retour.]

[Moustache se frotte contre ses jambes.]

[FIN]
```

---

## 9. COLLECTABLES & PROGRESSION

### 9.1 Étoiles Roses ⭐

- **Quantité** : Environ 200 dans le jeu complet
- **Usage** : Monnaie principale
- **Dépenses** :
  - 10 ⭐ = Recharge 1 pelote de laine
  - 20 ⭐ = Extension de jauge de Réflexion Éclair (+1 charge)
  - 30 ⭐ = Costume alternatif
  - 50 ⭐ = Niveau bonus débloqué (Grenier)

### 9.2 Bonnes Actions 💛

- **Quantité max** : 30 dans le jeu
- **Source** :
  - Quêtes secondaires : +1 à +3
  - Vaincre certains boss : +2 à +5
  - Dialogues réussis : +1
  - Aider spontanément un PNJ : +1
- **Usage** :
  - Négociation avec Papa (Monde 5)
  - Influence la fin du jeu
  - Débloque des dialogues supplémentaires

### 9.3 Cœurs ❤️

- **Points de vie** : 3 cœurs = 3 PV
- **Cœur plein** : Récupérer avec des gourmandises (cookies, fruits) cachées dans les niveaux
- **Cœur de bonus** (+ quart de cœur) : 4 quarts = 1 cœur supplémentaire (max 5 cœurs)

### 9.4 Pelotes de Laine 🧶

- **Munitions** de Moustache
- **Quantité par niveau** : 5 de base
- **Recharge** :
  - Trouvées dans le décor
  - Achetées avec des Étoiles Roses
  - Drops d'ennemis vaincus (25% de chance)

### 9.5 Tenues de Swann 👗

Costumes alternatifs sans effet gameplay (purement cosmétiques) :

| Tenue | Condition de déblocage |
|---|---|
| Tenue de base | Dès le début |
| Chef cuistot | 30⭐ dans Monde 2 |
| Super Studieuse | Finir Monde 4 sans erreur |
| Tenue de fête | Terminer le jeu |
| Pyjama Héroïque | Trouver le niveau secret du Monde 1 |
| Imperméable jaune | Finir Monde 3 sans perdre de PV |

---

## 10. DIRECTION ARTISTIQUE — PIXEL ART

### 10.1 Grille de base

- **Tile size** : 16×16 pixels
- **Résolution d'affichage** : 320×180 pixels natifs
- **Scale factor** : ×4 = 1280×720 (HD) ou ×6 = 1920×1080 (Full HD)
- **Sprites personnages** : 16×24 px (Swann), 18×28 px (Papa)
- **Sprites ennemis** : 8×8 à 16×16 px
- **Boss** : 32×48 à 64×64 px

### 10.2 Palettes de couleurs par monde

#### Monde 1 — Chambre (Matin chaud)
```
Couleurs principales :
Rose doux    #F2A7C3
Lavande      #C4A7E7
Crème        #FFF5E4
Bois clair   #D4A96A
Blanc doux   #FAFAFA

Couleurs d'accent :
Rose vif     #FF6B9D
Or           #FFD700
```

#### Monde 2 — Cuisine (Chaud et actif)
```
Couleurs principales :
Crème chaude #FFF0D4
Brique       #C0533A
Métal gris   #B0B8C1
Bois foncé   #6B4C3B
Vert herbe   #5A9E5A

Couleurs d'accent :
Orange feu   #FF6B35
Jaune vif    #FFE135
```

#### Monde 3 — Vaisselle (Bleu mousse)
```
Couleurs principales :
Bleu mousse  #A8D8EA
Blanc assiette #F8F8F8
Argent       #C0C0C0
Bleu foncé   #5B8DB8
Gris doux    #D0D0D8

Couleurs d'accent :
Bleu vif     #4ECDC4
Blanc pur    #FFFFFF
```

#### Monde 4 — Devoirs (Papier quadrillé)
```
Couleurs principales :
Blanc papier #FEFEFE
Bleu quadrillage #D6E8F5
Encre bleue  #2C4770
Rose gomme   #FFB5C8
Bois crayon  #C4956A

Couleurs d'accent :
Rouge erreur #FF4444
Vert correct #44AA44
```

#### Monde 5 — Salon (Chaleureux)
```
Couleurs principales :
Canapé beige #D4C4A8
Bois meuble  #8B6914
Mur crème    #F5ECD7
Tapis vert   #4A7C59
Noir élégant #1A1A2E

Couleurs d'accent :
Or lampe     #FFD700
Rose Swann   #FF6B9D
```

#### Monde 6 — Quartier (Extérieur ensoleillé)
```
Couleurs principales :
Ciel bleu    #87CEEB
Gris trottoir #A0A0A0
Vert parc    #5DA832
Brique immeuble #C45C3A
Blanc nuage  #F5F5F5

Couleurs d'accent :
Jaune soleil #FFE135
Confetti ×5  palette arc-en-ciel
```

### 10.3 Règles pixel art

1. **Pas d'anti-aliasing** — Pixels nets uniquement
2. **Ombres portées** : Décalage de 1-2 pixels vers le bas-droit, couleur plus sombre (–30% luminosité)
3. **Dithering** : Utilisé pour simuler les dégradés sur les sprites de boss
4. **Contours** : Ligne de 1 pixel, couleur sombre (jamais noir pur — utiliser #1A1A2E)
5. **Highlights** : 1 pixel blanc pur sur les bords supérieurs-gauches des surfaces courbes
6. **Animations** : 6-12 frames par animation, loop fluide

---

## 11. SPRITES & ANIMATIONS

### 11.1 Feuille de sprites de Swann

```
IDLE          : 4 frames (léger balancement, clignotement yeux)
WALK          : 8 frames (cycle complet de marche)
RUN           : 6 frames (cycle rapide, cheveux qui volent)
JUMP          : 4 frames (préparation, envol, apogée, descente)
DOUBLE JUMP   : 3 frames (rotation + éclat rose)
FALL          : 2 frames
LAND          : 2 frames (impact genoux fléchis)
CROUCH        : 2 frames
ATTACK CHAT   : 6 frames (geste d'appel vers Moustache)
RÉFLEXION     : 8 frames (yeux qui brillent, aura bleue)
TALK          : 4 frames (bouche ouverte/fermée)
HURT          : 3 frames (clignotement rouge)
VICTORY       : 6 frames (danse sur place, poing levé)
GAME OVER     : 4 frames (épaules basses, soupir visible)
PUSH          : 4 frames (pousse un objet)
CLIMB         : 6 frames (grimpe une échelle/corde)
```

### 11.2 Feuille de sprites de Moustache

```
IDLE          : 6 frames (léchage patte, bâillement)
FOLLOW        : 4 frames (trot rapide)
ATTACK PREP   : 3 frames (position de chasse)
ATTACK        : 4 frames (bond + atterrissage)
RETURN        : 4 frames (retour à Swann)
HAPPY         : 4 frames (ronronnement, queue dressée)
SCARED        : 3 frames (poils hérissés)
DISTRACT      : 6 frames (tourne en rond devant le PNJ)
SIT           : 2 frames (assis dignement)
```

### 11.3 Feuille de sprites de Papa

```
IDLE          : 4 frames (boit son café, regarde au loin)
WALK          : 6 frames
ARMS CROSSED  : 2 frames (position de négociation)
SURPRISED     : 2 frames (sourcil levé ++)
SOFTENING     : 3 frames (transition de strict à souriant)
SMILE         : 2 frames
THUMBS UP     : 2 frames (fin du jeu)
```

### 11.4 Feuille de sprites de Maman

```
IDLE          : 4 frames (regarde sa liste)
WALK          : 6 frames
TASK GIVE     : 3 frames (tend la liste)
HAPPY         : 3 frames (main sur le cœur, sourit)
WORRIED       : 2 frames (sourcils froncés)
```

### 11.5 Feuille de sprites de Zélie

```
IDLE          : 6 frames (écoute la musique, bat du pied)
BLOCK         : 2 frames (bras croisés, regard de côté)
SURPRISED     : 2 frames (retire les écouteurs)
HELP          : 3 frames (montre quelque chose du doigt)
EYE ROLL      : 3 frames (comique)
SMILE         : 2 frames (sourire malgré elle)
```

---

## 12. DÉCORS & TILESETS

### 12.1 Tileset — Chambre de Swann

**Éléments obligatoires :**
- Sol : Parquet bois clair avec planches de 16px
- Mur : Papier peint rose à petites étoiles
- Plafond : Blanc avec guirlande de lumières
- Lit géant (objet) : 64×32 px, couette rose avec étoiles dorées
- Étagère murale (plateforme) : 48×8 px, bois clair
- Affiche au mur : Décoration (plusieurs variantes)
- Fenêtre : 32×40 px, rideau rose, lumière de matin qui entre
- Tapis (sol dangereux lent) : 48×8 px, tapis en fourrure rose
- Boîtes de jouets (coffres) : 16×16 px, carton coloré

**Éléments de fond (parallax) :**
- Ciel matin par la fenêtre (fond 1)
- Étoiles brillantes au plafond (fond 2)
- Ombre mobile de Moustache qui dort (fond 3)

### 12.2 Tileset — Cuisine

**Éléments obligatoires :**
- Sol : Carrelage blanc et noir (damier 8px)
- Mur : Faïence bleue et blanche
- Plan de travail (plateforme principale) : 320×16 px, granit gris
- Éléments d'arrière-plan : Fenêtre, rideau fin, vue sur jardin
- Placards du haut (plateformes) : 48×32 px, bois peint blanc
- Casseroles (obstacle décoratif) : Plusieurs tailles
- Frigo (porte interactive) : 32×64 px, blanc brillant
- Grille-pain (boss) : 32×48 px, chrome + résistances rouges

**Effets :**
- Vapeur montante (particle system) : 8 particules/seconde, opacité décroissante
- Bulles dans casseroles : 4×4 px, aléatoires

### 12.3 Tileset — Salon

**Éléments obligatoires :**
- Sol : Parquet foncé avec tapis central (zone glissante/lente)
- Mur : Peinture beige chaude, cadres photos famille
- Canapé géant (plateforme principale) : 128×48 px, tissu gris
- Table basse (plateforme centrale) : 64×16 px, bois foncé
- Fauteuil de Papa (trône) : 48×64 px, cuir noir
- Bibliothèque (plateformes multiples) : 96×128 px, bois foncé
- Plantes d'intérieur (décoration + cachette) : 16×32 px, plusieurs variantes
- Télévision géante (fond) : 64×48 px, écran qui montre un dessin animé

**Éléments de fond (parallax) :**
- Fenêtres vue jardin (fond 1)
- Lumière naturelle changeante (fond 2)

### 12.4 Tileset — Quartier

**Éléments obligatoires :**
- Sol : Trottoir gris béton avec joints de 8px
- Route : Asphalte noir avec lignes blanches
- Immeubles de fond : Briques rouges/orange, plusieurs fenêtres
- Végétation : Arbres 32×64 px, buissons 16×16 px
- Mobilier urbain : Bancs, lampadaires, poubelles
- Passage piéton : Zèbre blanc sur la route
- Feux de circulation (interactifs) : 8×24 px, tricolore
- Maison de Léa : Grande façade 128×80 px, couleurs vives, ballons

---

## 13. DIRECTION AUDIO

### 13.1 Musique — Thèmes principaux

| Thème | Style | Tempo | Notes |
|---|---|---|---|
| **Écran titre** | Chiptune doux, mélodie principale | 90 BPM | Présente le thème de Swann |
| **Monde 1** | Chiptune joyeux, léger | 120 BPM | Guitare 8-bit + marimba |
| **Monde 2** | Cuivres 8-bit, frénétique | 145 BPM | Agitation de cuisine |
| **Monde 3** | Bulles sonores, aquatique | 110 BPM | Basses rondes, écho |
| **Monde 4** | Mystérieux, éducatif | 100 BPM | Piano 8-bit + arpèges |
| **Monde 5** | Tendu puis émouvant | 85→100 BPM | Transition au fil du dialogue |
| **Monde 6** | Sprint électrique, euphorique | 160 BPM | Maximum énergie |
| **Boss battles** | Tension + énergie | 140 BPM | Version intense du thème |
| **Victoire boss** | Fanfare courte | 3 secondes | Jingle reconnaissable |
| **Game Over** | Mélancolique mais court | 70 BPM | Encourage à réessayer |
| **Fin du jeu** | Émouvant, complet | 100 BPM | Reprise du thème principal |

### 13.2 Effets sonores

| Effet | Événement |
|---|---|
| `sfx_jump` | Saut de Swann |
| `sfx_double_jump` | Double saut (son plus aigu) |
| `sfx_land` | Atterrissage |
| `sfx_run` | Pas de course (loop) |
| `sfx_star_collect` | Collecte d'Étoile Rose |
| `sfx_heart_collect` | Collecte d'un cœur |
| `sfx_ba_collect` | Collecte d'une Bonne Action |
| `sfx_cat_attack` | Moustache bondit |
| `sfx_cat_hit` | Moustache touche un ennemi |
| `sfx_reflect` | Activation Réflexion Éclair |
| `sfx_reflect_end` | Fin de la Réflexion Éclair |
| `sfx_enemy_hit` | Ennemi touché |
| `sfx_enemy_die` | Ennemi vaincu |
| `sfx_boss_hurt` | Boss touché |
| `sfx_boss_die` | Boss vaincu |
| `sfx_player_hurt` | Swann blessée |
| `sfx_dialog_open` | Ouverture d'une bulle de dialogue |
| `sfx_dialog_type` | Effet machine à écrire |
| `sfx_dialog_select` | Sélection d'option |
| `sfx_checkpoint` | Activation d'un checkpoint |
| `sfx_level_clear` | Niveau terminé |
| `sfx_door_open` | Porte/passage ouvert |
| `sfx_push_object` | Pousser un objet |
| `sfx_water_splash` | Chute dans l'eau/mousse |

### 13.3 Voix et sons de personnages

Pas de vraie voix — sons expressifs 8-bit :
- **Swann** : Son aigu bref à chaque action importante
- **Papa** : Son grave et court dans les dialogues
- **Maman** : Son médium doux
- **Zélie** : Son légèrement désabusé
- **Moustache** : Ronronnement et miaulement 8-bit

---

## 14. INTERFACE UTILISATEUR (UI/UX)

### 14.1 HUD en jeu

```
┌──────────────────────────────────────────────────────────────┐
│ ❤️ ❤️ ❤️        ⭐ 047      🧶 🧶 🧶 🧶 🧶   ⚡ ⚡ ⚡       │
│ [Vies]       [Étoiles]    [Pelotes laine]  [Charges RF]      │
│                                                              │
│                                                              │
│                         [JEUX]                               │
│                                                              │
│                                                 💛 BA: 12    │
│                                              [Bonnes Actions]│
└──────────────────────────────────────────────────────────────┘
```

- **Position** : Coins de l'écran, jamais au centre
- **Style** : Pixel art, icônes simples, police Press Start 2P
- **Taille police** : 8px natif (32px affiché)
- **Cooldown visuel** : Icônes grisées avec compte à rebours en pixels

### 14.2 Écran de dialogue

```
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│  [Portrait 32×32]  ╔══════════════════════════════════╗     │
│                    ║ Texte de dialogue affiché         ║     │
│    [NOM]           ║ lettre par lettre...              ║     │
│                    ╚══════════════════════════════════╝     │
│                                                              │
│              > Option A                                      │
│                Option B                                      │
│                Option C                                      │
└──────────────────────────────────────────────────────────────┘
```

### 14.3 Écran titre

- Logo "LE PARCOURS DE SWANN" en pixel art animé (lettres qui tombent)
- Swann et Moustache en animation idle au premier plan
- Maison en silhouette derrière
- Menu simple : Nouvelle Partie / Continuer / Options / Crédits
- Musique du thème principal

### 14.4 Menu pause

```
╔═══════════════════╗
║    PAUSE          ║
╠═══════════════════╣
║ > Continuer       ║
║   Carte du monde  ║
║   Inventaire      ║
║   Options         ║
║   Quitter         ║
╚═══════════════════╝
```

### 14.5 Carte du monde

Vue isométrique simple de la maison. Chaque pièce = une icône. Les niveaux complétés s'illuminent. Les niveaux secrets apparaissent après déblocage.

### 14.6 Écran de fin de niveau

```
╔═══════════════════════╗
║  NIVEAU TERMINÉ ! 🎉  ║
╠═══════════════════════╣
║  ⭐ Étoiles : 24/30   ║
║  💛 BA gagnées : +2   ║
║  ❤️ PV restants : 3/3  ║
║                       ║
║  [Objectifs]          ║
║  ✅ Quête principale  ║
║  ✅ Vaisselle propre  ║
║  ❌ Sans perdre de PV ║
╚═══════════════════════╝
```

---

## 15. ARCHITECTURE TECHNIQUE

### 15.1 Choix du moteur

**Option A : Phaser 3 (Recommandé pour démarrage rapide)**
- HTML5 natif, pas d'installation
- Excellent support pixel art et tilemaps (Tiled)
- WebGL + Canvas fallback
- Gratuit, open-source
- Documentation exhaustive

**Option B : Godot 4**
- Moteur complet, export multi-plateforme
- Meilleur pour un jeu plus complexe
- GDScript simple à apprendre
- Export HTML5 possible

**Ce GDD cible Phaser 3 pour les exemples de code.**

### 15.2 Structure de fichiers

```
parcours-swann/
│
├── index.html
├── package.json
│
├── src/
│   ├── main.js                  # Entrée Phaser, config
│   ├── GameConfig.js            # Constantes globales
│   │
│   ├── scenes/
│   │   ├── BootScene.js         # Préchargement minimal
│   │   ├── PreloadScene.js      # Chargement des assets
│   │   ├── MenuScene.js         # Écran titre
│   │   ├── WorldMapScene.js     # Carte du monde
│   │   ├── GameScene.js         # Scène de jeu principale
│   │   ├── DialogScene.js       # Superposition dialogues
│   │   ├── BossScene.js         # Scènes boss (héritent GameScene)
│   │   ├── PauseScene.js        # Menu pause (overlay)
│   │   ├── LevelCompleteScene.js
│   │   └── EndingScene.js       # Cutscene finale
│   │
│   ├── entities/
│   │   ├── Player.js            # Classe Swann
│   │   ├── Cat.js               # Classe Moustache
│   │   ├── Papa.js              # PNJ Papa
│   │   ├── Maman.js             # PNJ Maman
│   │   ├── Zelie.js             # PNJ Zélie
│   │   └── enemies/
│   │       ├── BaseEnemy.js     # Classe de base ennemi
│   │       ├── ChaussetteFantome.js
│   │       ├── CravateFouet.js
│   │       ├── CuillereRebelle.js
│   │       ├── GlaconSauteur.js
│   │       ├── GuepesCereales.js
│   │       ├── BulleSavon.js
│   │       ├── FauteOrthographe.js
│   │       ├── FractionFantome.js
│   │       ├── DouteAnime.js
│   │       └── PigeonParc.js
│   │
│   ├── bosses/
│   │   ├── BaseBoss.js          # Classe de base boss
│   │   ├── ReveilGeant.js
│   │   ├── GrillePainFurieux.js
│   │   ├── MontagneAssiettes.js
│   │   ├── MonstreMultiplications.js
│   │   ├── PapaDialogue.js      # Boss dialogue spécial
│   │   └── LeRetard.js
│   │
│   ├── systems/
│   │   ├── InputManager.js      # Gestion clavier/gamepad
│   │   ├── DialogSystem.js      # Moteur de dialogue
│   │   ├── QuestSystem.js       # Suivi des quêtes
│   │   ├── CollectableSystem.js # Gestion collectables
│   │   ├── SaveSystem.js        # Sauvegarde localStorage
│   │   ├── AudioManager.js      # Musique et SFX
│   │   └── ParticleSystem.js    # Effets visuels
│   │
│   ├── levels/
│   │   ├── LevelLoader.js       # Chargeur de niveaux Tiled
│   │   ├── World1/
│   │   │   ├── Level1-1.json
│   │   │   ├── Level1-2.json
│   │   │   ├── Level1-3.json
│   │   │   └── Level1-Boss.json
│   │   ├── World2/
│   │   ├── World3/
│   │   ├── World4/
│   │   ├── World5/
│   │   └── World6/
│   │
│   └── ui/
│       ├── HUD.js               # Interface en jeu
│       ├── DialogBox.js         # Bulle de dialogue
│       ├── HealthBar.js         # Barre de vie boss
│       └── WorldMap.js          # Carte du monde
│
├── assets/
│   ├── sprites/
│   │   ├── swann_spritesheet.png
│   │   ├── moustache_spritesheet.png
│   │   ├── papa_spritesheet.png
│   │   ├── maman_spritesheet.png
│   │   ├── zelie_spritesheet.png
│   │   ├── enemies_spritesheet.png
│   │   └── bosses/
│   │       ├── reveil_boss.png
│   │       ├── grillePain_boss.png
│   │       ├── assiettes_boss.png
│   │       ├── monstre_maths_boss.png
│   │       └── leRetard_boss.png
│   │
│   ├── tilesets/
│   │   ├── chambre_tileset.png
│   │   ├── cuisine_tileset.png
│   │   ├── salon_tileset.png
│   │   ├── salledebain_tileset.png
│   │   ├── couloir_tileset.png
│   │   ├── quartier_tileset.png
│   │   └── ui_tileset.png
│   │
│   ├── audio/
│   │   ├── music/
│   │   │   ├── theme_principal.ogg
│   │   │   ├── monde1.ogg
│   │   │   ├── monde2.ogg
│   │   │   ├── monde3.ogg
│   │   │   ├── monde4.ogg
│   │   │   ├── monde5.ogg
│   │   │   ├── monde6.ogg
│   │   │   ├── boss_battle.ogg
│   │   │   └── ending.ogg
│   │   └── sfx/
│   │       ├── sfx_jump.ogg
│   │       ├── sfx_cat_attack.ogg
│   │       └── [... tous les SFX listés section 13]
│   │
│   └── ui/
│       ├── logo.png
│       ├── menu_bg.png
│       └── hud_icons.png
│
└── tilemaps/
    ├── world1/
    │   ├── 1-1.tmj
    │   ├── 1-2.tmj
    │   └── ...
    └── ...
```

### 15.3 Classes principales — Pseudo-code

#### Player.js (Swann)

```javascript
class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'swann');
    
    this.stats = {
      speed: 180,
      jumpForce: -380,
      doubleJumpForce: -280,
      maxHearts: 3,
      hearts: 3,
      starCount: 0,
      goodActions: 0,
      woolBalls: 5,
      reflectCharges: 3
    };
    
    this.state = {
      canDoubleJump: false,
      hasDoubleJumped: false,
      isReflecting: false,
      isCrouching: false,
      isOnGround: false,
      facingRight: true,
      coyoteTime: 0,
      jumpBuffer: 0
    };
  }
  
  update(input) {
    this.handleMovement(input);
    this.handleJump(input);
    this.handlePowers(input);
    this.updateAnimations();
    this.updateCoyoteTime();
  }
  
  handleJump(input) {
    // Coyote time : peut sauter jusqu'à 8 frames après le bord
    if (this.state.coyoteTime > 0 && input.jumpPressed) {
      this.jump();
    }
    // Double saut
    else if (!this.state.isOnGround && 
             !this.state.hasDoubleJumped && 
             this.stats.canDoubleJump && 
             input.jumpPressed) {
      this.doubleJump();
    }
  }
  
  activateReflect() {
    if (this.stats.reflectCharges > 0 && !this.state.isReflecting) {
      this.stats.reflectCharges--;
      this.state.isReflecting = true;
      this.scene.activateSlowMotion(0.2, 5000);
      // Révèle les indices cachés
      this.scene.events.emit('reflect_activated');
    }
  }
  
  catAttack(direction) {
    if (this.stats.woolBalls > 0) {
      this.stats.woolBalls--;
      this.scene.cat.launch(direction);
    }
  }
  
  takeDamage(amount = 1) {
    if (this.state.isInvincible) return;
    this.stats.hearts -= amount;
    this.state.isInvincible = true;
    // Flash animation, durée 2000ms
    this.scene.time.delayedCall(2000, () => {
      this.state.isInvincible = false;
    });
    if (this.stats.hearts <= 0) {
      this.die();
    }
  }
}
```

#### DialogSystem.js

```javascript
class DialogSystem {
  constructor(scene) {
    this.scene = scene;
    this.isActive = false;
    this.currentDialog = null;
    this.dialogQueue = [];
    this.selectedOption = 0;
  }
  
  startDialog(dialogData) {
    // dialogData = { speaker, portrait, lines, options? }
    this.isActive = true;
    this.scene.physics.pause(); // Fige le gameplay
    this.dialogUI.show(dialogData);
  }
  
  typewriterEffect(text, element, speed = 30) {
    let i = 0;
    const timer = this.scene.time.addEvent({
      delay: speed,
      callback: () => {
        element.text += text[i];
        this.scene.sound.play('sfx_dialog_type');
        i++;
        if (i >= text.length) timer.destroy();
      },
      repeat: text.length - 1
    });
  }
  
  selectOption(index) {
    const option = this.currentDialog.options[index];
    const cost = option.baCost || 0;
    
    if (this.scene.player.stats.goodActions >= cost) {
      this.scene.player.stats.goodActions -= cost;
      option.callback();
    } else {
      // Option grisée, son d'erreur
      this.scene.sound.play('sfx_error');
    }
  }
  
  endDialog() {
    this.isActive = false;
    this.scene.physics.resume();
    this.dialogUI.hide();
  }
}
```

#### BaseBoss.js

```javascript
class BaseBoss extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture, config) {
    super(scene, x, y, texture);
    
    this.maxHP = config.maxHP;
    this.currentHP = config.maxHP;
    this.phases = config.phases; // Array de phases
    this.currentPhase = 0;
    this.isDefeated = false;
    
    this.healthBar = new BossHealthBar(scene, this);
  }
  
  takeDamage(amount) {
    this.currentHP -= amount;
    this.healthBar.update(this.currentHP, this.maxHP);
    this.playHurtAnimation();
    
    // Vérifier changement de phase
    const phaseThreshold = this.phases[this.currentPhase + 1]?.hpThreshold;
    if (phaseThreshold && this.currentHP <= phaseThreshold) {
      this.nextPhase();
    }
    
    if (this.currentHP <= 0) {
      this.defeat();
    }
  }
  
  nextPhase() {
    this.currentPhase++;
    // Cutscene courte + nouvelle IA
    this.scene.cameras.main.shake(300, 0.02);
    this.activatePhasePattern(this.phases[this.currentPhase]);
  }
  
  defeat() {
    this.isDefeated = true;
    this.playDefeatAnimation();
    this.scene.events.emit('boss_defeated', this.id);
  }
}
```

#### SaveSystem.js

```javascript
class SaveSystem {
  static SAVE_KEY = 'parcours_swann_save';
  
  static save(gameState) {
    const saveData = {
      currentWorld: gameState.currentWorld,
      currentLevel: gameState.currentLevel,
      stars: gameState.player.starCount,
      goodActions: gameState.player.goodActions,
      hearts: gameState.player.hearts,
      unlockedWorlds: gameState.unlockedWorlds,
      completedLevels: gameState.completedLevels,
      collectedStars: gameState.collectedStars, // Par niveau
      unlockedCostumes: gameState.unlockedCostumes,
      timestamp: Date.now()
    };
    localStorage.setItem(this.SAVE_KEY, JSON.stringify(saveData));
  }
  
  static load() {
    const raw = localStorage.getItem(this.SAVE_KEY);
    return raw ? JSON.parse(raw) : null;
  }
  
  static deleteSave() {
    localStorage.removeItem(this.SAVE_KEY);
  }
}
```

### 15.4 Format des données de dialogue

```json
{
  "dialogId": "world5_papa_boss",
  "characters": {
    "papa": {
      "portrait": "papa_arms_crossed",
      "name": "Papa",
      "color": "#1A1A2E"
    },
    "swann": {
      "portrait": "swann_hopeful",
      "name": "Swann",
      "color": "#FF6B9D"
    }
  },
  "sequence": [
    {
      "speaker": "papa",
      "text": "Swann. Assieds-toi.",
      "portrait": "papa_serious"
    },
    {
      "speaker": "papa",
      "text": "Tu as fini tes devoirs ?",
      "portrait": "papa_arms_crossed",
      "options": [
        {
          "text": "Oui Papa, et j'ai tout bon !",
          "baCost": 0,
          "confidenceGain": 3,
          "condition": { "minBA": 5 },
          "nextDialog": "w5_papa_r1_a"
        },
        {
          "text": "Presque... il restait 2 exercices.",
          "baCost": 0,
          "confidenceGain": 1,
          "nextDialog": "w5_papa_r1_b"
        },
        {
          "text": "J'avais pas vraiment envie...",
          "baCost": 0,
          "confidenceLoss": 2,
          "nextDialog": "w5_papa_r1_c"
        }
      ]
    }
  ]
}
```

### 15.5 Format des niveaux Tiled (.tmj)

```json
{
  "width": 40,
  "height": 15,
  "tilewidth": 16,
  "tileheight": 16,
  "layers": [
    {
      "name": "Background",
      "type": "tilelayer",
      "data": [...]
    },
    {
      "name": "Platforms",
      "type": "tilelayer",
      "data": [...]
    },
    {
      "name": "Hazards",
      "type": "tilelayer",
      "data": [...]
    },
    {
      "name": "Objects",
      "type": "objectgroup",
      "objects": [
        {
          "type": "PlayerSpawn",
          "x": 32, "y": 192
        },
        {
          "type": "Enemy",
          "name": "ChaussetteFantome",
          "x": 128, "y": 160
        },
        {
          "type": "Collectable",
          "name": "StarRose",
          "x": 96, "y": 128
        },
        {
          "type": "Checkpoint",
          "x": 256, "y": 176
        },
        {
          "type": "LevelEnd",
          "x": 608, "y": 192
        }
      ]
    }
  ]
}
```

---

## 16. FEUILLE DE ROUTE DE DÉVELOPPEMENT

### Phase 1 — Prototype (4–6 semaines)

**Objectif** : Jeu jouable de A à Z, sans graphismes finaux.

- [ ] Setup Phaser 3 + structure de projet
- [ ] Physique de Swann (move, jump, double jump)
- [ ] Caméra qui suit le joueur
- [ ] Premier tileset placeholder (rectangles colorés)
- [ ] Premier niveau (1-1) complet
- [ ] Système de collectables (étoiles)
- [ ] Système de cœurs + dégâts
- [ ] Premier ennemi (ChaussetteFantôme)
- [ ] Premier boss (Réveil Géant, 1 phase)
- [ ] HUD basique
- [ ] Musique placeholder (chiptune libre)

### Phase 2 — Alpha (6–8 semaines)

**Objectif** : Tous les mondes jouables.

- [ ] Mondes 2, 3, 4 complets
- [ ] Tous les ennemis de base
- [ ] Tous les boss (3 phases chacun)
- [ ] Système de dialogue interactif
- [ ] Monde 5 (boss dialogue Papa)
- [ ] Monde 6 (auto-runner + Le Retard)
- [ ] Système de sauvegarde
- [ ] Cinématiques intro/fin de monde
- [ ] Pouvoir Réflexion Éclair complet
- [ ] Pouvoir Maine Coon complet

### Phase 3 — Bêta Artistique (8–10 semaines)

**Objectif** : Graphismes et audio finaux.

- [ ] Tous les sprites finaux (Swann, Moustache, PNJ)
- [ ] Tous les tilesets finaux (6 mondes)
- [ ] Animations complètes (toutes les frames)
- [ ] Musique originale chiptune (6 mondes + boss)
- [ ] Effets sonores complets
- [ ] UI/HUD pixel art final
- [ ] Écran titre animé
- [ ] Polissage visuel (parallax, particules)

### Phase 4 — Finition (4–6 semaines)

**Objectif** : Jeu prêt à la sortie.

- [ ] Levels secrets (Grenier, Cave)
- [ ] Costumes alternatifs
- [ ] Optimisation performances (60fps constant)
- [ ] Tests sur mobile (touch controls)
- [ ] Localisation (EN si voulu)
- [ ] Accessibilité (daltonisme, vitesse de jeu)
- [ ] Credits et remerciements
- [ ] Page itch.io / publication web

---

## ANNEXES

### A. Glossaire

| Terme | Définition |
|---|---|
| **BA** | Bonne Action — monnaie narrative |
| **RF** | Réflexion Éclair — premier pouvoir de Swann |
| **PV** | Points de vie |
| **HUD** | Heads-Up Display — interface en jeu |
| **Coyote time** | Délai de tolérance pour sauter après un bord |
| **Jump buffer** | Anticipation d'un appui saut avant l'atterrissage |
| **Tileset** | Ensemble de tuiles graphiques pour construire les niveaux |
| **Spritesheet** | Feuille regroupant toutes les frames d'animation d'un personnage |
| **Chiptune** | Musique synthétique imitant les sons des consoles rétro |

### B. Inspirations directes

- **Chip'n Dale Rescue Rangers (NES)** : Ramassage d'objets, portée chat
- **Kirby's Adventure (NES)** : Accessibilité, humour, boss créatifs
- **Yoshi's Island (SNES)** : Thème "enfant", univers imaginaire
- **A Hat in Time (PC)** : Héroïne enfant espiègle, hub monde réel
- **Super Mario Bros 3 (NES)** : Structure par mondes, boss fin de monde
- **Cuphead** : Boss à phases multiples, style graphique fort

### C. Lignes directrices de design — Rappel

1. **Jamais frustrant** : Le jeu doit être challengeant mais jamais punitif
2. **Toujours lisible** : Le joueur comprend toujours ce qu'il doit faire
3. **Récompenser la curiosité** : Explorer vaut toujours la peine
4. **Les personnages ont une âme** : Chaque PNJ doit sembler réel
5. **Le rire d'abord** : En cas de doute, choisir l'option plus drôle

---

*Document rédigé pour "Le Parcours de Swann" — Version 1.0*
*Tous droits réservés.*
