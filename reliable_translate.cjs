const fs = require('fs');

const full_phrases = {
    "Leave the metro into the backstreets": "Quitter le métro vers les ruelles",
    "Go to Sojiro's residence and examine the doorbell": "Aller à la résidence de Sojiro et examiner la sonnette",
    "Go to Café LeBlanc and enter": "Aller au Café LeBlanc et entrer",
    "Examine your room and then start cleaning": "Examiner votre chambre et commencer le ménage",
    "Examine the bed to sleep": "Examiner le lit pour dormir",
    "during the flashback, follow the road": "pendant le flashback, suivre la route",
    "Go downstairs and answer the pay phone": "Descendre et répondre au téléphone public",
    "Step outside LeBlanc and then go back inside to flip the sign to CLOSED": "Sortir du LeBlanc puis rentrer pour retourner le panneau sur FERMÉ",
    "Step outside LeBlanc and then go back inside to flip the sign to closed": "Sortir du LeBlanc puis rentrer pour retourner le panneau sur FERMÉ",
    "Go downstairs and speak with Sojiro": "Descendre et parler avec Sojiro",
    "Leave LeBlanc and make your way to Yongen-Jaya Station": "Quitter le LeBlanc et se rendre à la station de Yongen-Jaya",
    "Ride the train and then go upstairs to enter Shibuya Underground Walkway": "Prendre le train puis monter pour entrer dans le passage souterrain de Shibuya",
    "Head north, up the big staircase, and exit the building into Shibuya Station Square": "Aller au nord, monter le grand escalier et sortir du bâtiment sur la place de la station de Shibuya",
    "Right in front of you is the Teikyu building": "Juste devant vous se trouve le bâtiment Teikyu",
    "Enter the Ginza Line Gate and ride the train": "Entrer dans la porte de la ligne Ginza et prendre le train",
    "There is nothing to do inside Kamoshida’s Palace for now. Just follow the tutorials": "Il n'y a rien à faire dans le Palais de Kamoshida pour l'instant. Suivez simplement les tutoriels",
    "At Shujin Academy, go to the second floor": "À l'Académie Shujin, aller au deuxième étage",
    "In front of the stairs to the left is the Faculty Office": "Devant l'escalier à gauche se trouve le bureau des professeurs",
    "After the scene, make your way to the rooftop": "Après la scène, se rendre sur le toit",
    "Enter Shujin Academy": "Entrer à l'Académie Shujin",
    "Solve the crossword puzzle downstairs": "Résoudre les mots croisés en bas",
    "Use the Bio Nutrient on the plant": "Utiliser le Bio-nutriment sur la plante",
    "Study at LeBlanc": "Étudier au LeBlanc",
    "Study at the school library": "Étudier à la bibliothèque de l'école",
    "Study in the school library": "Étudier à la bibliothèque de l'école",
    "Borrow the book": "Emprunter le livre",
    "Today's answer is": "La réponse d'aujourd'hui est",
    "Quick Travel to the": "Voyage rapide vers le",
    "speak with the student in front of": "parler à l'élève devant",
    "Follow Ann into the Shibuya Underground Walkway": "Suivre Ann dans le passage souterrain de Shibuya",
    "enter Practice Building": "entrer dans le bâtiment d'entraînement",
    "Go down the stairs": "Descendre l'escalier",
    "follow Ryuji into the PE Faculty Office": "suivre Ryuji dans le bureau des profs de sport",
    "Clean your desk and make one Lock Pick": "Nettoyer votre bureau et fabriquer un crochet",
    "Buy the SP Recovery items from the vending machines": "Acheter les objets de récupération de PC aux distributeurs",
    "When you are ready, go to sleep": "Quand vous êtes prêt, allez dormir",
    "Go south then east": "Aller au sud puis à l'est",
    "The goal is": "L'objectif est",
    "necessary for": "nécessaire pour",
    "matching Persona": "Persona correspondante",
    "without consuming a time slot": "sans consommer de temps",
    "rainy day bonus": "bonus jour de pluie",
    "fast travel to": "voyage rapide vers",
    "teachers will ask you questions": "les professeurs poseront des questions",
    "answer correctly, you will gain points towards": "répondre correctement pour gagner des points de",
    "Hang out with": "Passer du temps avec",
    "Speak with": "Parler avec",
    "Talk with": "Parler avec",
    "First Castle Infiltration": "Première infiltration du château",
    "Second Castle Infiltration": "Deuxième infiltration du château",
    "Third Castle Infiltration": "Troisième infiltration du château",
    "Fourth Castle Infiltration": "Quatrième infiltration du château"
};

const words = {
    "Go to": "Aller à",
    "Buy": "Acheter",
    "Rent": "Louer",
    "Watch": "Regarder",
    "Read": "Lire",
    "Study": "Étudier",
    "Examine": "Examiner",
    "Answer": "Réponse",
    "Borrow": "Emprunter",
    "Leave": "Quitter",
    "Enter": "Entrer dans",
    "into": "dans",
    "with": "avec",
    "the": "le",
    "and": "et",
    "for": "pour",
    "is": "est",
    "are": "sont",
    "then": "puis",
    "after": "après",
    "from": "de",
    "near": "près de"
};

const terms = {
    "Knowledge": "Connaissance",
    "Guts": "Courage",
    "Proficiency": "Maîtrise",
    "Kindness": "Gentillesse",
    "Charm": "Charme",
    "Confidant": "Confident",
    "Rank": "Rang",
    "Level": "Niveau",
    "Library": "Bibliothèque",
    "Bathhouse": "Bains publics",
    "Home Shopping": "Télé-achat",
    "Infiltration Tools": "Outils d'infiltration",
    "Underground Walkway": "Passage souterrain",
    "Central Street": "Rue centrale",
    "Faculty Office": "Bureau des professeurs",
    "Rooftop": "Toit",
    "Lock Pick": "Crochet",
    "Vending machines": "Distributeurs",
    "Crossword puzzle": "Mots croisés",
    "Mementos": "Mémento",
    "Palace": "Palais",
    "Calling Card": "Carte de visite",
    "Treasure": "Trésor",
    "Boss": "Boss",
    "Request": "Requête",
    "Metro": "Métro",
    "Subway": "Métro",
    "Classroom": "Classe",
    "Store": "Magasin",
    "Shop": "Boutique",
    "Backstreets": "Ruelles",
    "Shujin Academy": "Académie Shujin",
    "Teikyu building": "bâtiment Teikyu",
    "Ginza Line Gate": "ligne Ginza",
    "Castle": "château",
    "Tutorial": "tutoriel",
    "Mini-Boss": "mini-boss",
    "Save file": "sauvegarde",
    "Item": "objet",
    "Aptitude Cards": "Cartes de compétence",
    "Armor": "Armure",
    "Money": "Argent",
    "Yen": "Yens",
    "Fool": "Le Mat",
    "Magician": "Le Bateleur",
    "Priestess": "La Papesse",
    "Empress": "L'Impératrice",
    "Emperor": "L'Empereur",
    "Hierophant": "Le Pape",
    "Lovers": "L'Amoureux",
    "Chariot": "Le Chariot",
    "Justice": "La Justice",
    "Hermit": "L'Ermite",
    "Fortune": "La Fortune",
    "Strength": "La Force",
    "Hanged Man": "Le Pendu",
    "Death": "La Mort",
    "Temperance": "La Tempérance",
    "Devil": "Le Diable",
    "Tower": "La Tour",
    "Star": "L'Étoile",
    "Moon": "La Lune",
    "Sun": "Le Soleil",
    "Judgement": "Le Juge",
    "Faith": "La Foi",
    "Councillor": "Le Consultant"
};

const schedule = JSON.parse(fs.readFileSync('src/data/master_schedule.json', 'utf8'));

for (let date in schedule) {
    let daytime = schedule[date].daytime;
    let evening = schedule[date].evening;

    // 1. Exact phrases first
    for (let eng in full_phrases) {
        const regex = new RegExp(eng.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
        daytime = daytime.replace(regex, full_phrases[eng]);
        evening = evening.replace(regex, full_phrases[eng]);
    }

    // 2. Official Terms with word boundaries
    for (let eng in terms) {
        const regex = new RegExp('\\b' + eng + '\\b', 'gi');
        daytime = daytime.replace(regex, terms[eng]);
        evening = evening.replace(regex, terms[eng]);
    }

    // 3. Verbs and Connectives with word boundaries
    for (let eng in words) {
        const regex = new RegExp('\\b' + eng + '\\b', 'gi');
        daytime = daytime.replace(regex, words[eng]);
        evening = evening.replace(regex, words[eng]);
    }

    // Final Grammar Cleanups
    const clean = (text) => {
        return text
            .replace(/\bà le\b/gi, 'au')
            .replace(/\bà la\b/gi, 'à la')
            .replace(/\bde le\b/gi, 'du')
            .replace(/\bdans le le\b/gi, 'dans le')
            .replace(/\ble le\b/gi, 'le')
            .replace(/\ble les\b/gi, 'les')
            .replace(/\ble Ruelles\b/gi, 'les ruelles')
            .replace(/\ble escaliers\b/gi, 'les escaliers')
            .replace(/\ble distributeurs\b/gi, 'les distributeurs')
            .replace(/\ble tutoriels\b/gi, 'les tutoriels')
            .replace(/\ble bonus\b/gi, 'les bonus')
            .replace(/\ble objets\b/gi, 'les objets')
            .replace(/\ble items\b/gi, 'les objets')
            .replace(/\ble questions\b/gi, 'les questions')
            .replace(/\ble teachers\b/gi, 'les professeurs')
            .replace(/\ble Ranks\b/gi, 'les rangs')
            .replace(/\ble levels\b/gi, 'les niveaux')
            .replace(/\bShibuya\b/gi, 'Shibuya'); // Ensure Shibuya is never corrupted
    };

    schedule[date].daytime = clean(daytime);
    schedule[date].evening = clean(evening);
}

fs.writeFileSync('src/data/master_schedule.json', JSON.stringify(schedule, null, 2));
console.log('Final Human-Quality translation complete.');
