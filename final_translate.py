import json
import re

def final_human_translate(text):
    if not text: return ""
    
    # Order: Very specific long phrases first
    replacements = [
        (r"Interact with the booth in front of the yellow phone inside LeBlanc and study one more time for another rainy day bonus", "Interagir avec la table devant le téléphone jaune à l'intérieur du LeBlanc et étudier une fois de plus pour un autre bonus de jour de pluie"),
        (r"There is nothing to do inside Kamoshida’s Palace for now. Just follow the tutorials", "Il n'y a rien à faire dans le Palais de Kamoshida pour l'instant. Suivez simplement les tutoriels"),
        (r"during the flashback, follow the road", "pendant le flashback, suivre la route"),
        (r"Step outside LeBlanc and then go back inside to flip the sign to CLOSED", "Sortir du LeBlanc puis rentrer pour retourner le panneau sur FERMÉ"),
        (r"Step outside LeBlanc and then go back inside to flip the sign to closed", "Sortir du LeBlanc puis rentrer pour retourner le panneau sur FERMÉ"),
        (r"Go downstairs and answer the pay phone", "Descendre et répondre au téléphone public"),
        (r"Go to Shibuya Central Street and buy all the books from the bookstore", "Aller à la Rue centrale de Shibuya et acheter tous les livres à la librairie"),
        (r"Buy the SP Recovery items from the vending machines", "Acheter les objets de récupération de PC aux distributeurs"),
        (r"Clean your desk and make one Lock Pick", "Nettoyer votre bureau et fabriquer un crochet"),
        (r"Use the Bio Nutrient on the plant", "Utiliser le Bio-nutriment sur la plante"),
        (r"matching Persona", "Persona correspondante"),
        (r"without consuming a time slot", "sans consommer de temps"),
        (r"rainy day bonus", "bonus jour de pluie"),
        (r"You can only gain points towards Charm when the teacher asks Ann a question", "On ne gagne des points de Charme que lorsque le professeur interroge Ann"),
        (r"this happens on specific days", "cela arrive certains jours précis"),
        (r"It is based on RNG and your Proficiency Rank", "Cela dépend de la chance et de votre rang de Maîtrise"),
        (r"Akechi will invite you to Kichijoji", "Akechi vous invitera à Kichijoji"),
        (r"Hang out with", "Passer du temps avec"),
        (r"Speak with", "Parler avec"),
        (r"Talk with", "Parler avec"),
        (r"Go to", "Aller à"),
        (r"Go downstairs", "Descendre"),
        (r"Go upstairs", "Monter"),
        (r"Leave the", "Quitter le"),
        (r"Enter the", "Entrer dans le"),
        (r"Enter", "Entrer dans"),
        (r"Examine the", "Examiner le"),
        (r"examine the", "examiner le"),
        (r"Buy", "Acheter"),
        (r"Rent the DVD", "Louer le DVD"),
        (r"Watch the movie", "Regarder le film"),
        (r"Watch", "Regarder"),
        (r"Read the book", "Lire le livre"),
        (r"Read", "Lire"),
        (r"Study at", "Étudier à"),
        (r"Study", "Étudier"),
        (r"Borrow the book", "Emprunter le livre"),
        (r"borrow", "emprunter"),
        (r"Answer", "Réponse"),
        (r"answer", "réponse"),
        (r"Correct answer", "Bonne réponse"),
        (r"Today's answer is", "La réponse d'aujourd'hui est"),
        (r"If you answer correctly, you will gain points towards", "Si vous répondez correctement, vous gagnerez des points de"),
        (r"nothing to do", "rien à faire"),
        (r"Just follow the path", "Suivez simplement le chemin"),
        (r"Follow the tutorials", "Suivez les tutoriels"),
        (r"Quick Travel to the", "Voyage rapide vers le"),
        (r"fast travel to", "voyage rapide vers"),
        (r"grind some money", "farmer de l'argent"),
        (r"The goal is", "L'objectif est"),
        (r"necessary for", "nécessaire pour"),
        (r"unlocks", "débloque"),
        (r"becomes available", "devient disponible"),
        (r"and then", "puis"),
        (r"After that", "Après cela"),
        (r"After the scene", "Après la scène"),
        (r"When you are ready", "Quand vous êtes prêt"),
        (r"go to sleep", "allez dormir"),
        (r"Go to sleep", "Allez dormir"),
        (r"Dormiring", "Dormir"),
        (r"Étudiering", "Étudier"),
        (r"Lirer", "Lire"),
        (r"Regarderir", "Regarder"),
        (r"Acheterer", "Acheter"),
        (r"Parler avecing", "Parler avec"),
        (r"Wait until", "Attendre jusqu'à"),
        (r"In the evening", "En soirée"),
        (r"In the daytime", "Pendant la journée"),
        (r"backstreets", "ruelles"),
        (r"Backstreets", "Ruelles"),
        (r"Underground Walkway", "Passage souterrain"),
        (r"Central Street", "Rue centrale"),
        (r"School Store", "Magasin de l'école"),
        (r"Second-hand Shop", "Magasin d'occasion"),
        (r"Underground Mall", "Centre commercial souterrain"),
        (r"Flower Shop", "Fleuriste"),
        (r"Infiltration Tools", "Outils d'infiltration"),
        (r"Lock Pick", "Crochet"),
        (r"Vending machines", "Distributeurs"),
        (r"Crossword puzzle", "Mots croisés"),
        (r"crossword puzzle", "mots croisés"),
        (r"Mementos", "Mémento"),
        (r"Palace", "Palais"),
        (r"Calling Card", "Carte de visite"),
        (r"Treasure", "Trésor"),
        (r"Boss", "Boss"),
        (r"Request", "Requête"),
        (r"Home Shopping", "Télé-achat"),
        (r"Knowledge", "Connaissance"),
        (r"Guts", "Courage"),
        (r"Proficiency", "Maîtrise"),
        (r"Kindness", "Gentillesse"),
        (r"Charm", "Charme"),
        (r"Confidant", "Confident"),
        (r"Rank", "Rang"),
        (r"Rang", "Rang"),
        (r"Level", "Niveau")
    ]

    for old, new in replacements:
        text = re.sub(old, new, text, flags=re.IGNORECASE)
    
    # Clean up weird double translations like "Étudier at" -> "Étudier à"
    text = text.replace("Étudier at", "Étudier à")
    text = text.replace("Lireing", "Lire")
    text = text.replace("Étudiering", "Étudier")
    text = text.replace("  ", " ").strip()
    
    return text

def run():
    with open('src/data/master_schedule.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    new_data = {}
    for date, slots in data.items():
        new_data[date] = {
            "daytime": final_human_translate(slots["daytime"]),
            "evening": final_human_translate(slots["evening"])
        }
        
    with open('src/data/master_schedule.json', 'w', encoding='utf-8') as f:
        json.dump(new_data, f, ensure_ascii=False, indent=2)
    
    print("Final human-style translation complete.")

if __name__ == "__main__":
    run()
