import json
import re
from bs4 import BeautifulSoup

def translate_row(text):
    if not text: return ""
    
    # Cleaning
    text = text.replace("•", "").strip()
    
    # Order: longer phrases first to avoid partial replacement bugs
    replacements = [
        (r"Leave the metro into the backstreets", "Quitter le métro vers les ruelles"),
        (r"Go to Sojiro's residence and examine the doorbell", "Aller à la résidence de Sojiro et examiner la sonnette"),
        (r"Go to Café LeBlanc and enter", "Aller au Café LeBlanc et entrer"),
        (r"Examine your room and then start cleaning", "Examiner votre chambre et commencer le ménage"),
        (r"Examine the bed to sleep", "Examiner le lit pour dormir"),
        (r"During the flashback, follow the road", "Pendant le flashback, suivre la route"),
        (r"Go downstairs and answer the pay phone", "Descendre et répondre au téléphone public"),
        (r"Step outside LeBlanc and then go back inside to flip the sign to CLOSED", "Sortir du LeBlanc puis rentrer pour retourner le panneau sur FERMÉ"),
        (r"Go downstairs and speak with Sojiro", "Descendre et parler avec Sojiro"),
        (r"Leave LeBlanc and make your way to Yongen-Jaya Station", "Quitter le LeBlanc et se rendre à la station de Yongen-Jaya"),
        (r"Ride the train and then go upstairs to enter Shibuya Underground Walkway", "Prendre le train puis monter pour entrer dans le passage souterrain de Shibuya"),
        (r"Head north, up the big staircase, and exit the building into Shibuya Station Square", "Aller au nord, monter le grand escalier et sortir du bâtiment sur la place de la station de Shibuya"),
        (r"Right in front of you is the Teikyu building", "Juste devant vous se trouve le bâtiment Teikyu"),
        (r"Enter the Ginza Line Gate and ride the train", "Entrer dans la porte de la ligne Ginza et prendre le train"),
        (r"First Castle Infiltration", "Première infiltration du château"),
        (r"Second Castle Infiltration", "Deuxième infiltration du château"),
        (r"Third Castle Infiltration", "Troisième infiltration du château"),
        (r"Fourth Castle Infiltration", "Quatrième infiltration du château"),
        (r"There is nothing to do inside Kamoshida’s Palace for now. Just follow the tutorials", "Il n'y a rien à faire dans le Palais de Kamoshida pour l'instant. Suivez les tutoriels"),
        (r"At Shujin Academy, go to the second floor", "À l'Académie Shujin, aller au deuxième étage"),
        (r"In front of the stairs to the left is the Faculty Office", "Devant l'escalier à gauche se trouve le bureau des professeurs"),
        (r"After the scene, make your way to the rooftop", "Après la scène, se rendre sur le toit"),
        (r"Enter Shujin Academy", "Entrer à l'Académie Shujin"),
        (r"During class and on specific days in the game, teachers will ask you questions", "En classe, les professeurs vous poseront des questions"),
        (r"Today’s answer is", "La réponse d'aujourd'hui est"),
        (r"answer correctly, you will gain points towards", "répondre correctement pour gagner des points de"),
        (r"When you are ready, go to sleep", "Quand vous êtes prêt, allez dormir"),
        (r"Quick Travel to the", "Voyage rapide vers le"),
        (r"speak with the student in front of", "parler à l'élève devant"),
        (r"Follow Ann into the Shibuya Underground Walkway", "Suivre Ann dans le passage souterrain de Shibuya"),
        (r"enter Practice Building", "entrer dans le bâtiment d'entraînement"),
        (r"Go down the stairs", "Descendre l'escalier"),
        (r"follow Ryuji into the PE Faculty Office", "suivre Ryuji dans le bureau des profs de sport"),
        (r"Clean your desk and make one Lock Pick", "Nettoyer votre bureau et fabriquer un crochet"),
        (r"Buy the SP Recovery items from the vending machines", "Acheter les objets de récupération de PC aux distributeurs"),
        (r"Use the Bio Nutrient on the plant", "Utiliser le Bio-nutriment sur la plante"),
        (r"Hang out with", "Passer du temps avec"),
        (r"Speak with", "Parler avec"),
        (r"Talk with", "Parler avec"),
        (r"Go back downstairs", "Redescendre"),
        (r"Go south then east", "Aller au sud puis à l'est"),
        (r"The goal is", "L'objectif est"),
        (r"necessary for", "nécessaire pour"),
        (r"matching Persona", "Persona correspondante"),
        (r"without consuming a time slot", "sans consommer de temps"),
        (r"rainy day bonus", "bonus jour de pluie"),
        (r"fast travel to", "voyage rapide vers")
    ]

    for eng, fr in replacements:
        text = re.sub(eng, fr, text, flags=re.IGNORECASE)

    # Dictionary of official terms (Word boundaries)
    terms = {
        "Knowledge": "Connaissance", "Guts": "Courage", "Proficiency": "Maîtrise",
        "Kindness": "Gentillesse", "Charm": "Charme", "Confidant": "Confident",
        "Rank": "Rang", "Level": "Niveau", "Library": "Bibliothèque",
        "Bathhouse": "Bains publics", "Home Shopping": "Télé-achat",
        "Infiltration Tools": "Outils d'infiltration", "Underground Walkway": "Passage souterrain",
        "Central Street": "Rue centrale", "Faculty Office": "Bureau des professeurs",
        "Rooftop": "Toit", "Lock Pick": "Crochet", "Vending machines": "Distributeurs",
        "Crossword puzzle": "Mots croisés", "Mementos": "Mémento",
        "Palace": "Palais", "Calling Card": "Carte de visite",
        "Treasure": "Trésor", "Boss": "Boss", "Request": "Requête",
        "Metro": "Métro", "Subway": "Métro", "Classroom": "Classe",
        "Store": "Magasin", "Shop": "Boutique", "Shibuya": "Shibuya",
        "Yongen-Jaya": "Yongen-Jaya", "Teikyu building": "bâtiment Teikyu",
        "Ginza Line Gate": "ligne Ginza", "Castle": "château",
        "Tutorial": "tutoriel", "Mini-Boss": "mini-boss", "Save file": "sauvegarde",
        "Item": "objet", "Armor": "Armure", "Money": "Argent", "Yen": "Yens",
        "Fool": "Le Mat", "Magician": "Le Bateleur", "Priestess": "La Papesse",
        "Empress": "L'Impératrice", "Emperor": "L'Empereur", "Hierophant": "Le Pape",
        "Lovers": "L'Amoureux", "Chariot": "Le Chariot", "Justice": "La Justice",
        "Hermit": "L'Ermite", "Fortune": "La Fortune", "Strength": "La Force",
        "Hanged Man": "Le Pendu", "Death": "La Mort", "Temperance": "La Tempérance",
        "Devil": "Le Diable", "Tower": "La Tour", "Star": "L'Étoile",
        "Moon": "La Lune", "Sun": "Le Soleil", "Judgement": "Le Juge",
        "Faith": "La Foi", "Councillor": "Le Consultant"
    }

    for eng, fr in terms.items():
        text = re.sub(r'\b' + re.escape(eng) + r'\b', fr, text, flags=re.IGNORECASE)

    # General Verbs and Connectives
    connectives = [
        (r"\bGo to\b", "Aller à"), (r"\bLeave\b", "Quitter"), (r"\bEnter\b", "Entrer dans"),
        (r"\bBuy\b", "Acheter"), (r"\bRent\b", "Louer"), (r"\bWatch\b", "Regarder"),
        (r"\bRead\b", "Lire"), (r"\bStudy\b", "Étudier"), (r"\bAnswer\b", "Réponse"),
        (r"\bExamine\b", "Examiner"), (r"\binto the\b", "dans le"), (r"\binto\b", "dans"),
        (r"\band\b", "et"), (r"\bwith\b", "avec"), (r"\bthe\b", "le"), (r"\bfor\b", "pour"),
        (r"\bis\b", "est"), (r"\bare\b", "sont"), (r"\bthen\b", "puis"), (r"\bto\b", "à")
    ]

    for eng, fr in connectives:
        text = re.sub(eng, fr, text, flags=re.IGNORECASE)

    # Grammar Cleanup
    text = text.replace("à le", "au").replace("à la", "à la").replace("le le", "le").replace("le les", "les")
    text = text.replace("dans le le", "dans le")
    
    return text

def run():
    with open('docs/100perfectrun.htm', 'r', encoding='utf-8') as f:
        html = f.read()
    
    soup = BeautifulSoup(html, 'html.parser')
    master_schedule = {}
    
    tables = soup.find_all('table')
    for table in tables:
        rows = table.find_all('tr')
        for row in rows:
            cols = row.find_all('td')
            if len(cols) >= 2:
                date_text = cols[0].get_text(strip=True)
                match = re.search(r'(\d{2})/(\d{2})', date_text)
                if match:
                    month, day = match.group(1), match.group(2)
                    year = "2026" if month not in ["01", "02", "03"] else "2027"
                    full_date = f"{year}-{month}-{day}"
                    
                    if len(cols) == 3:
                        daytime = translate_row(cols[1].get_text(" ", strip=True))
                        evening = translate_row(cols[2].get_text(" ", strip=True))
                    else:
                        text = translate_row(cols[1].get_text(" ", strip=True))
                        daytime = evening = text
                    
                    if not evening: evening = daytime
                    master_schedule[full_date] = { "daytime": daytime, "evening": evening }
    
    with open('src/data/master_schedule.json', 'w', encoding='utf-8') as f:
        json.dump(master_schedule, f, ensure_ascii=False, indent=2)
    
    print("Clean human-like extraction and translation complete.")

if __name__ == "__main__":
    run()
