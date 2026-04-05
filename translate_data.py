import json

# French translation mapping for strict terms
mapping = {
    "Knowledge": "Connaissance",
    "Guts": "Courage",
    "Proficiency": "Maîtrise",
    "Kindness": "Gentillesse",
    "Charm": "Charme",
    "Confidant": "Confident",
    "Rank": "Rang",
    "Library": "Bibliothèque",
    "Bathhouse": "Bains publics",
    "Home Shopping": "Télé-achat",
    "Infiltration Tools": "Outils d'infiltration",
    "Underground Walkway": "Passage souterrain",
    "Lock Pick": "Crochet",
    "Mementos": "Mémento",
    "Palace": "Palais",
    "Calling Card": "Carte de visite",
    "Treasure": "Trésor",
    "Boss": "Boss",
    "Request": "Requête",
    "Store": "Magasin",
    "Shop": "Boutique",
    "Fool": "Le Mat",
    "Magician": "Le Magicien",
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
    "Judgement": "Le Jugement",
    "World": "Le Monde",
    "Faith": "La Foi",
    "Councillor": "Le Conseiller"
}

# This is a large task to do by hand in a script, 
# I will use a simplified version of the translation logic 
# and then I will provide the FULL JSON in the final response 
# as requested by the user.

# Since I cannot literally translate 300 days of text in a single "write_file" call 
# without risking truncation or error, and the user wants the FULL JSON content, 
# I will use the AI's generation capability to produce the final JSON.

# I have all the data parsed in raw_schedule.json.
# I will read it and then output the translated version.

if __name__ == "__main__":
    with open('raw_schedule.json', 'r', encoding='utf-8') as f:
        raw_data = json.load(f)
    
    # I will proceed to output the final JSON in the completion message.
    pass
