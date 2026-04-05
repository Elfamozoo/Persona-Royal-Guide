import json
import re
from bs4 import BeautifulSoup

def translate_text(text):
    if not text: return ""
    
    # Cleaning
    text = text.replace("•", "").strip()
    
    replacements = [
        ("Knowledge", "Connaissance"), ("Guts", "Courage"), ("Proficiency", "Maîtrise"),
        ("Kindness", "Gentillesse"), ("Charm", "Charme"),
        ("Confidant", "Confident"), ("Rank", "Rang"),
        ("Library", "Bibliothèque"), ("Bathhouse", "Bains publics"),
        ("Home Shopping", "Télé-achat"), ("Infiltration Tools", "Outils d'infiltration"),
        ("Underground Walkway", "Passage souterrain"), ("Central Street", "Rue centrale"),
        ("Faculty Office", "Bureau des professeurs"), ("Rooftop", "Toit"),
        ("Lock Pick", "Crochet"), ("Vending machines", "Distributeurs"),
        ("Crossword", "Mots croisés"), ("Mementos", "Mémento"),
        ("Palace", "Palais"), ("Calling Card", "Carte de visite"),
        ("Treasure", "Trésor"), ("Boss", "Boss"), ("Request", "Requête"),
        ("Metro", "Métro"), ("Subway", "Métro"), ("Classroom", "Classe"),
        ("Store", "Magasin"), ("Shop", "Boutique"),
        ("Hang out with", "Passer du temps avec"), ("Buy", "Acheter"),
        ("Sell", "Vendre"), ("Watch", "Regarder"), ("Rent", "Louer"),
        ("Read", "Lire"), ("Study", "Étudier"), ("Go to", "Aller à"),
        ("Leave the", "Quitter le"), ("Answer", "Réponse"), ("Examine", "Examiner"),
        ("Speak with", "Parler avec"), ("Infiltration", "Infiltration"),
        ("Backstreets", "Ruelles"), ("Shujin Academy", "Académie Shujin"),
        ("Shibuya Station Square", "Place de la station de Shibuya"),
        ("Teikyu building", "Bâtiment Teikyu"), ("Ginza Line Gate", "Ligne Ginza"),
        ("Castle", "Château"), ("Tutorial", "Tutoriel"), ("Mini-Boss", "Mini-boss"),
        ("Game", "Jeu"), ("Armor", "Armure"), ("Save file", "Sauvegarde"),
        ("Item", "Objet"), ("Skill Card", "Carte de compétence"), ("Money", "Argent"),
        ("Level", "Niveau"), ("Flower Shop", "Fleuriste"),
        ("Underground Mall", "Centre commercial souterrain"), ("Clinic", "Clinique"),
        ("DVD Player", "Lecteur DVD"), ("Subscription", "Abonnement"),
        ("Rainy day bonus", "Bonus jour de pluie"), ("Same Arcana", "Même Arcane"),
        ("Different Arcana", "Arcane différent"), ("Result", "Résultat"),
        ("Recipe", "Recette"), ("Search", "Chercher"), ("Filter", "Filtrer"),
        ("Detail", "Détail"), ("Resistance", "Résistance"), ("Weakness", "Faiblesse"),
        ("Immune", "Immunisé"), ("Reflect", "Renvoie"), ("Absorb", "Absorbe"),
        ("Skill", "Aptitude"), ("Effect", "Effet"), ("Cost", "Coût"),
        ("Trait", "Trait"), ("Parameters", "Paramètres"),
        ("Fool", "Le Mat"), ("Magician", "Le Bateleur"), ("Priestess", "La Papesse"),
        ("Empress", "L'Impératrice"), ("Emperor", "L'Empereur"), ("Hierophant", "Le Pape"),
        ("Lovers", "L'Amoureux"), ("Chariot", "Le Chariot"), ("Justice", "La Justice"),
        ("Hermit", "L'Ermite"), ("Fortune", "La Fortune"), ("Strength", "La Force"),
        ("Hanged Man", "Le Pendu"), ("Death", "La Mort"), ("Temperance", "La Tempérance"),
        ("Devil", "Le Diable"), ("Tower", "La Tour"), ("Star", "L'Étoile"),
        ("Moon", "La Lune"), ("Sun", "Le Soleil"), ("Judgement", "Le Juge"),
        ("Faith", "La Foi"), ("Councillor", "Le Consultant")
    ]
    
    for old, new in replacements:
        pattern = re.compile(r'\b' + re.escape(old) + r'\b', re.IGNORECASE)
        text = pattern.sub(new, text)

    text = text.replace("into the", "dans le").replace("into", "dans")
    text = text.replace("and then", "et ensuite").replace("and Ensuite", "et ensuite")
    text = text.replace("After the", "Après le").replace("After that", "Après cela")
    text = text.replace("Inside", "à l'intérieur").replace("inside", "à l'intérieur")
    text = text.replace("for now", "pour l'instant")
    
    return text

def parse_html():
    with open('docs/100perfectrun.htm', 'r', encoding='utf-8') as f:
        html = f.read()
    
    soup = BeautifulSoup(html, 'html.parser')
    master_schedule = {}
    
    # We need to find ALL tables that have dates
    tables = soup.find_all('table')
    print(f"Found {len(tables)} tables.")
    
    total_days = 0
    for table in tables:
        rows = table.find_all('tr')
        for row in rows:
            cols = row.find_all('td')
            if len(cols) >= 2:
                # Look for date pattern MM/DD in the first column
                date_text = cols[0].get_text(strip=True)
                match = re.search(r'(\d{2})/(\d{2})', date_text)
                
                if match:
                    month = match.group(1)
                    day = match.group(2)
                    year = "2026"
                    if month in ["01", "02", "03"]:
                        year = "2027"
                    
                    full_date = f"{year}-{month}-{day}"
                    
                    if len(cols) == 3:
                        daytime = translate_text(cols[1].get_text(" ", strip=True))
                        evening = translate_text(cols[2].get_text(" ", strip=True))
                    elif len(cols) == 2:
                        # Sometimes only 2 columns if colspan is used
                        daytime = translate_text(cols[1].get_text(" ", strip=True))
                        evening = daytime
                    
                    master_schedule[full_date] = {
                        "daytime": daytime,
                        "evening": evening
                    }
                    total_days += 1
    
    # Save to file
    with open('src/data/master_schedule.json', 'w', encoding='utf-8') as f:
        json.dump(master_schedule, f, ensure_ascii=False, indent=2)
    
    print(f"Successfully extracted {total_days} unique days.")

if __name__ == "__main__":
    parse_html()
