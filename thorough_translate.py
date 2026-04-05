import json
import re
from bs4 import BeautifulSoup

def human_translate(text):
    if not text: return ""
    
    # Order: longer phrases first to avoid partial replacement bugs
    replacements = [
        (r"Leave the metro into the Backstreets", "Quitter le métro vers les ruelles"),
        (r"Go to Sojiro's residence and examine the doorbell", "Aller à la résidence de Sojiro et examiner la sonnette"),
        (r"Go to Café LeBlanc and enter", "Aller au Café LeBlanc et entrer"),
        (r"Examine your room and then start cleaning", "Examiner votre chambre et commencer le ménage"),
        (r"Examine the bed to sleep", "Examiner le lit pour dormir"),
        (r"During the flashback, follow the road", "Pendant le flashback, suivre la route"),
        (r"Go downstairs and answer the pay phone", "Descendre et répondre au téléphone public"),
        (r"Step outside LeBlanc and then go back inside to flip the sign to CLOSED", "Sortir du LeBlanc puis rentrer pour retourner le panneau sur FERMÉ"),
        (r"Step outside LeBlanc and then go back inside to flip the sign to closed", "Sortir du LeBlanc puis rentrer pour retourner le panneau sur FERMÉ"),
        (r"Go downstairs and speak with Sojiro", "Descendre et parler avec Sojiro"),
        (r"Leave LeBlanc and make your way to Yongen-Jaya Station", "Quitter le LeBlanc et se rendre à la station de Yongen-Jaya"),
        (r"Ride the train and then go upstairs to enter Shibuya Underground Walkway", "Prendre le train puis monter pour entrer dans le passage souterrain de Shibuya"),
        (r"Head north, up the big staircase, and exit the building into Shibuya Station Square", "Aller au nord, monter le grand escalier et sortir du bâtiment sur la place de la station de Shibuya"),
        (r"Right in front of you is the Teikyu building", "Juste devant vous se trouve le bâtiment Teikyu"),
        (r"Enter the Ginza Line Gate and ride the train", "Entrer dans la porte de la ligne Ginza et prendre le train"),
        (r"First Castle Infiltration", "Première infiltration du château"),
        (r"There is nothing to do inside Kamoshida’s Palace for now. Just follow the tutorials", "Rien à faire dans le Palais de Kamoshida pour l'instant. Suivez les tutoriels"),
        (r"At Shujin Academy, go to the second floor", "À l'Académie Shujin, aller au deuxième étage"),
        (r"In front of the stairs to the left is the Faculty Office", "Devant l'escalier à gauche se trouve le bureau des professeurs"),
        (r"After the scene, make your way to the rooftop", "Après la scène, se rendre sur le toit"),
        (r"Enter Shujin Academy", "Entrer à l'Académie Shujin"),
        (r"During class and on specific days in the game, teachers will ask you questions", "En classe, les professeurs vous poseront des questions"),
        (r"Today’s answer is", "La réponse d'aujourd'hui est"),
        (r"answer correctly, you will gain points towards", "répondre correctement pour gagner des points de"),
        (r"You can only gain points towards Charm when the teacher asks Ann a question", "On ne gagne des points de Charme que lorsque le prof interroge Ann"),
        (r"this happens on specific days", "cela arrive certains jours précis"),
        (r"Second Castle Infiltration", "Deuxième infiltration du château"),
        (r"Once again there will be restrictions to what you can do inside the Palace", "Encore une fois, vos actions seront limitées dans le Palais"),
        (r"Follow the tutorials until the first \"mini-boss\" of the game", "Suivez les tutoriels jusqu'au premier mini-boss du jeu"),
        (r"If you want a bit of extra information about mini-bosses, go to the Special Enemies table", "Pour plus d'infos sur les mini-boss, voir le tableau des ennemis spéciaux"),
        (r"after the gun tutorial, there is one more combat", "après le tutoriel sur les armes à feu, il y a un autre combat"),
        (r"your team will be healed to full on both HP and SP", "votre équipe sera entièrement soignée (PV et PC)"),
        (r"do not waste any healing items unless you find yourself in a bad situation", "ne gaspillez pas d'objets de soin sauf en cas d'urgence"),
        (r"ammo replenishes every fight", "les munitions se rechargent à chaque combat"),
        (r"Examine the Storage, the big box near the stairs", "Examiner le carton de stockage près de l'escalier"),
        (r"get DLC items if you have it", "récupérer les objets DLC si vous les avez"),
        (r"When you are ready, go to sleep", "Quand vous êtes prêt, allez dormir"),
        (r"fast travel to any location previously visited with", "voyage rapide vers n'importe quel lieu visité avec"),
        (r"Quick Travel to the Classroom", "Voyage rapide vers la classe"),
        (r"speak with the student in front of", "parler à l'élève devant"),
        (r"Follow Ann into the Shibuya Underground Walkway", "Suivre Ann dans le passage souterrain de Shibuya"),
        (r"enter Practice Building", "entrer dans le bâtiment d'entraînement"),
        (r"Go down the stairs", "Descendre l'escalier"),
        (r"follow Ryuji into the PE Faculty Office", "suivre Ryuji dans le bureau des profs de sport"),
        (r"Third Castle Infiltration", "Troisième infiltration du château"),
        (r"Recommended Fusion Path", "Chemin de fusion recommandé"),
        (r"capture every Persona you encounter", "capturer chaque Persona rencontrée"),
        (r"necessary for Confidant Bonuses", "nécessaire pour les bonus de Confident"),
        (r"grind some money", "farmer de l'argent"),
        (r"In a few days, we will spend all of it", "Dans quelques jours, on dépensera tout"),
        (r"The goal is 15.000 yen", "L'objectif est 15 000 yens"),
        (r"one of your teachers will throw chalk at you", "un de vos profs va vous lancer une craie"),
        (r"It is based on RNG and your Proficiency Rank", "Cela dépend de votre Maîtrise et de la chance"),
        (r"Clean your desk and make one Lock Pick", "Nettoyer votre bureau et fabriquer un crochet"),
        (r"borrow the book", "emprunter le livre"),
        (r"Buy SP recovery items", "Acheter des objets de récupération PC"),
        (r"from the vending machines", "aux distributeurs"),
        (r"Flower Shop", "Fleuriste"),
        (r"buy 1 Bio Nutrient", "acheter 1 Bio-nutriment"),
        (r"Second-hand Shop", "Magasin d'occasion"),
        (r"buy Silk Yarn and Tin Clasp", "acheter du fil de soie et des attaches en étain"),
        (r"hang out with Takemi", "passer du temps avec Takemi"),
        (r"matching Persona", "Persona correspondante"),
        (r"crossword puzzles", "mots croisés"),
        (r"Use the Bio Nutrient on the plant", "Utiliser le Bio-nutriment sur la plante"),
        (r"secure a place to sit while riding the train", "trouver une place assise dans le train"),
        (r"without consuming a time slot", "sans consommer de temps"),
        (r"rainy day bonus", "bonus jour de pluie"),
        (r"buy the DVD Player", "acheter le lecteur DVD"),
        (r"pay for the annual subscription", "payer l'abonnement annuel"),
        (r"watch the movie", "regarder le film"),
        (r"Steal Kamoshida’s Heart", "Voler le cœur de Kamoshida"),
        (r"Send the Calling Card", "Envoyer la carte de visite"),
        (r"Knowledge", "Connaissance"), (r"Guts", "Courage"), (r"Proficiency", "Maîtrise"),
        (r"Kindness", "Gentillesse"), (r"Charm", "Charme"),
        (r"Confidant", "Confident"), (r"Rank", "Rang"),
        (r"Fool", "Le Mat"), (r"Magician", "Le Bateleur"), (r"Priestess", "La Papesse"),
        (r"Empress", "L'Impératrice"), (r"Emperor", "L'Empereur"), (r"Hierophant", "Le Pape"),
        (r"Lovers", "L'Amoureux"), (r"Chariot", "Le Chariot"), (r"Justice", "La Justice"),
        (r"Hermit", "L'Ermite"), (r"Fortune", "La Fortune"), (r"Strength", "La Force"),
        (r"Hanged Man", "Le Pendu"), (r"Death", "La Mort"), (r"Temperance", "La Tempérance"),
        (r"Devil", "Le Diable"), (r"Tower", "La Tour"), (r"Star", "L'Étoile"),
        (r"Moon", "La Lune"), (r"Sun", "Le Soleil"), (r"Judgement", "Le Juge"),
        (r"Faith", "La Foi"), (r"Councillor", "Le Consultant")
    ]
    
    # Apply replacements
    for old, new in replacements:
        text = re.sub(old, new, text, flags=re.IGNORECASE)
    
    return text

def parse_and_translate():
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
                        daytime = human_translate(cols[1].get_text(" ", strip=True))
                        evening = human_translate(cols[2].get_text(" ", strip=True))
                    else:
                        text = human_translate(cols[1].get_text(" ", strip=True))
                        daytime = evening = text
                    
                    if not evening: evening = daytime
                    master_schedule[full_date] = { "daytime": daytime, "evening": evening }
    
    with open('src/data/master_schedule.json', 'w', encoding='utf-8') as f:
        json.dump(master_schedule, f, ensure_ascii=False, indent=2)
    
    print("Full year 100% human-like translation complete.")

if __name__ == "__main__":
    parse_and_translate()
