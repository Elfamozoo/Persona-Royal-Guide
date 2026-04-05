import json
import re
from bs4 import BeautifulSoup

def translate_text(text):
    if not text: return ""
    
    # Cleaning
    text = text.replace("•", "").strip()
    
    # Stats
    text = text.replace("Knowledge", "Connaissance")
    text = text.replace("Guts", "Courage")
    text = text.replace("Proficiency", "Maîtrise")
    text = text.replace("Kindness", "Gentillesse")
    text = text.replace("Charm", "Charme")
    
    # Common Terms
    text = text.replace("Confidant", "Confident")
    text = text.replace("Rank", "Rang")
    text = text.replace("Library", "Bibliothèque")
    text = text.replace("Bathhouse", "Bains publics")
    text = text.replace("Home Shopping", "Télé-achat")
    text = text.replace("Infiltration Tools", "Outils d'infiltration")
    text = text.replace("Underground Walkway", "Passage souterrain")
    text = text.replace("Central Street", "Rue centrale")
    text = text.replace("School Store", "Magasin de l'école")
    text = text.replace("Second-hand Shop", "Magasin d'occasion")
    text = text.replace("Beef Bowl", "Bols de bœuf")
    text = text.replace("Crossword", "Mots croisés")
    text = text.replace("Study", "Étudier")
    text = text.replace("Hang out with", "Passer du temps avec")
    text = text.replace("Read", "Lire")
    text = text.replace("Rent", "Louer")
    text = text.replace("Watch", "Regarder")
    text = text.replace("Metro", "Métro")
    text = text.replace("Subway", "Métro")
    text = text.replace("Underground Mall", "Centre commercial souterrain")
    text = text.replace("Faculty Office", "Bureau des professeurs")
    text = text.replace("Rooftop", "Toit")
    text = text.replace("Classroom", "Classe")
    
    # Arcanas (Official P5R FR)
    text = text.replace("Fool", "Le Mat")
    text = text.replace("Magician", "Le Bateleur")
    text = text.replace("Priestess", "La Papesse")
    text = text.replace("Empress", "L'Impératrice")
    text = text.replace("Emperor", "L'Empereur")
    text = text.replace("Hierophant", "Le Pape")
    text = text.replace("Lovers", "L'Amoureux")
    text = text.replace("Chariot", "Le Chariot")
    text = text.replace("Justice", "La Justice")
    text = text.replace("Hermit", "L'Ermite")
    text = text.replace("Fortune", "La Fortune")
    text = text.replace("Strength", "La Force")
    text = text.replace("Hanged Man", "Le Pendu")
    text = text.replace("Hanged", "Le Pendu")
    text = text.replace("Death", "La Mort")
    text = text.replace("Temperance", "La Tempérance")
    text = text.replace("Devil", "Le Diable")
    text = text.replace("Tower", "La Tour")
    text = text.replace("Star", "L'Étoile")
    text = text.replace("Moon", "La Lune")
    text = text.replace("Sun", "Le Soleil")
    text = text.replace("Judgement", "Le Juge")
    text = text.replace("Faith", "La Foi")
    text = text.replace("Councillor", "Le Consultant")
    
    # Verbs and common phrases
    text = text.replace("Leave the", "Quitter le")
    text = text.replace("Go to", "Aller à")
    text = text.replace("examine the", "examiner le")
    text = text.replace("Examine the", "Examiner le")
    text = text.replace("Enter", "Entrer dans")
    text = text.replace("Ride the train", "Prendre le train")
    text = text.replace("Wait until", "Attendre jusqu'à")
    text = text.replace("Talk with", "Parler avec")
    text = text.replace("Speak with", "Parler avec")
    text = text.replace("Answer", "Réponse")
    text = text.replace("Borrow the book", "Emprunter le livre")
    
    return text

def parse_html():
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
                    month = match.group(1)
                    day = match.group(2)
                    year = "2026"
                    if month in ["01", "02", "03"]:
                        year = "2027"
                    
                    full_date = f"{year}-{month}-{day}"
                    
                    if len(cols) == 3:
                        daytime = translate_text(cols[1].get_text(" ", strip=True))
                        evening = translate_text(cols[2].get_text(" ", strip=True))
                    else:
                        text = translate_text(cols[1].get_text(" ", strip=True))
                        daytime = text
                        evening = text
                    
                    # Prevent empty slots if colspan was used
                    if not evening and daytime:
                        evening = daytime
                    
                    master_schedule[full_date] = {
                        "daytime": daytime,
                        "evening": evening
                    }
    
    with open('src/data/master_schedule.json', 'w', encoding='utf-8') as f:
        json.dump(master_schedule, f, ensure_ascii=False, indent=2)
    
    print(f"Successfully parsed and translated {len(master_schedule)} days.")

if __name__ == "__main__":
    parse_html()
