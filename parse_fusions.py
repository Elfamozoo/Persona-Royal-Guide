import json
import re
from bs4 import BeautifulSoup

def translate_text(text, persona_map, skill_map, other_map):
    if not text:
        return ""
    
    # Sort keys by length descending to avoid partial matches
    for old, new in sorted(other_map.items(), key=lambda x: len(x[0]), reverse=True):
        text = re.sub(r'\b' + re.escape(old) + r'\b', new, text, flags=re.IGNORECASE)
    
    for old, new in sorted(persona_map.items(), key=lambda x: len(x[0]), reverse=True):
        text = re.sub(r'\b' + re.escape(old) + r'\b', new, text, flags=re.IGNORECASE)
        
    for old, new in sorted(skill_map.items(), key=lambda x: len(x[0]), reverse=True):
        text = re.sub(r'\b' + re.escape(old) + r'\b', new, text, flags=re.IGNORECASE)
        
    return text

def parse_guide():
    with open('E:/Travail Dev/Persona/docs/100perfectrun.htm', 'r', encoding='utf-8') as f:
        html = f.read()
    
    soup = BeautifulSoup(html, 'html.parser')
    
    persona_map = {
        "Regent": "Régent", "Queen's Necklace": "Collier de la Reine", "Stone of Scone": "Pierre de Scone",
        "Koh-i-Noor": "Koh-i-Noor", "Orlov": "Orlov", "Emperor's Amulet": "Amulette de l'Empereur",
        "Hope Diamond": "Diamant de l'Espoir", "Crystal Skull": "Crâne de Cristal", "Orichalcum": "Orichalque",
        "Hecatoncheires": "Hécatonchire", "Belphegor": "Belphégor", "White Rider": "Cavalier blanc",
        "Red Rider": "Cavalier rouge", "Lachesis": "Lachésis", "Sandman": "Marchand de sable",
        "Ganesha": "Ganesh", "Ose": "Osé", "Phoenix": "Phénix", "Unicorn": "Licorne",
        "Thunderbird": "Oiseau de tonnerre", "Melchizedek": "Melchisédech", "Pale Rider": "Cavalier pâle",
        "Black Rider": "Cavalier noir", "Trumpeter": "Trompettiste", "Norn": "Nornes",
        "King Frost": "Roi Givre", "Raphael": "Raphaël", "Dionysus": "Dionysos", "Messiah": "Messie",
        "Cybele": "Cybèle", "Eligor": "Éligor", "Vishnu": "Vishnou", "Oberon": "Obéron",
        "Beelzebub": "Belzébuth", "Archangel": "Archange", "Principality": "Principauté",
        "Metatron": "Métatron", "Michael": "Michaël", "Cu Chulainn": "Cú Chulainn", "Arsene": "Arsène"
    }
    
    skill_map = {
        "Amrita Drop": "Goutte d'Amrita", "Amrita Shower": "Pluie d'Amrita", "Energy Drop": "Goutte d'Énergie",
        "Energy Shower": "Pluie d'Énergie", "Concentrate": "Concentration", "Rebellion": "Rébellion",
        "Revolution": "Révolution", "Debilitate": "Débilitation", "Life Aid": "Aide vitale",
        "Victory Cry": "Cri de victoire", "Arms Master": "Maître d'armes", "Spell Master": "Maître spirituel",
        "Sharp Student": "Élève appliqué", "Apt Pupil": "Fin limier", "Dodge Fire": "Esquive feu",
        "Evade Fire": "Évitement feu", "Null Fire": "Absorb feu", "Resist Fire": "Résistance feu",
        "Repel Fire": "Renvoi feu", "Drain Fire": "Absorption feu", "Fire Boost": "Boost feu",
        "Fire Amp": "Amplification feu", "Burn Boost": "Boost Brûlure", "Freeze Boost": "Boost Gel",
        "Shock Boost": "Boost Choc", "Forget Boost": "Boost Oubli", "Sleep Boost": "Boost Sommeil",
        "Confuse Boost": "Boost Confusion", "Fear Boost": "Boost Effroi", "Despair Boost": "Boost Désespoir",
        "Rage Boost": "Boost Rage", "Brainwash Boost": "Boost Lavage de cerveau", "Speed Reader": "Lecture rapide",
        "Divine Grace": "Grâce divine", "Angelic Grace": "Grâce angélique", "Insta-Heal": "Guérison instantanée",
        "Ali Dance": "Ali Dance", "Firm Stance": "Posture ferme", "Enduring Soul": "Âme endurante",
        "Endure": "Endurance", "High Counter": "Contre féroce", "Counterstrike": "Contre-offensive",
        "Counter": "Contre", "One-Shot Kill": "Frappe létale", "Triple Down": "Triple menace",
        "Riot Gun": "Déluge de balles", "Morning Star": "Étoile du matin", "Black Viper": "Vipère noire",
        "Die For Me!": "Meurs pour moi !", "Vacuum Wave": "Vide sidéral", "Blazing Hell": "Enfer flamboyant",
        "Ice Age": "Âge de glace", "Wild Thunder": "Tonnerre sauvage", "Psycho Force": "Force psychique",
        "Psycho Blast": "Rafale psychique", "Atomic Flare": "Éclat atomique", "Cosmic Flare": "Éclat cosmique",
        "Divine Judgement": "Jugement divin", "Demonic Decree": "Décret démoniaque", "Abyss Walker": "Marcheur de l'abîme",
        "Myriad Slashes": "Myriade de coups", "Vorpal Blade": "Lame vorpale", "Megaton Raid": "Raid mégatonne",
        "Gigantomachia": "Gigantomachie", "Sword Dance": "Danse de l'épée", "Brave Blade": "Lame courageuse",
        "God's Hand": "Main de Dieu", "Evade Bless": "Évitement Béni", "Dodge Bless": "Esquive Béni",
        "Bless Boost": "Boost Béni", "Bless Amp": "Amplification Bénie", "Curse Boost": "Boost Maudit",
        "Curse Amp": "Amplification Maudite", "Dodge Curse": "Esquive Maudit", "Evade Curse": "Évitement Maudit",
        "Ice Boost": "Boost Glace", "Ice Amp": "Amplification Glace", "Elec Boost": "Boost Élec",
        "Elec Amp": "Amplification Élec", "Wind Boost": "Boost Vent", "Wind Amp": "Amplification Vent",
        "Psy Boost": "Boost Psy", "Psy Amp": "Amplification Psy", "Nuke Boost": "Boost Nucléaire",
        "Nuke Amp": "Amplification Nucléaire", "Gun Boost": "Boost Arme à feu", "Gun Amp": "Amplification Arme à feu",
        "Phys": "Physique", "Null Elec": "Nul Élec", "Drain Ice": "Absorption Glace", "Drain Bless": "Absorption Bénie",
        "Repel Nuke": "Renvoi Nucléaire", "Repel Psy": "Renvoi Psy", "Repel Phys": "Renvoi Physique",
        "Repel Curse": "Renvoi Maudit", "Drain Curse": "Absorption Maudite", "Repel Wind": "Renvoi Vent",
        "Auto-Mataru": "Auto-Mataru", "Auto-Maraku": "Auto-Maraku", "Auto-Masuku": "Auto-Masuku",
        "Hama Boost": "Boost Hama", "Mudo Boost": "Boost Mudo"
    }
    
    other_map = {
        "Sacrifice (Alarm)": "Sacrifice (Alarme)", "Sacrifice": "Sacrifice",
        "Advanced Fusion": "Fusion avancée", "Requirement see below": "Condition voir ci-dessous",
        "Requirement, see below": "Condition voir ci-dessous", "Give to": "Donner à",
        "Strength Rank": "Rang de la Force", "Requirement": "Condition",
        "For sacrifice only": "Pour sacrifice uniquement", "Weapon for": "Arme pour",
        "Gun for": "Arme à feu pour", "Best weapon for": "Meilleure arme pour",
        "Best gun for": "Meilleure arme à feu pour", "Best armor for": "Meilleure armure pour",
        "Save and reload until you get it": "Sauvegarder et recharger jusqu'à l'obtenir",
        "This is a Free DLC Persona": "C'est une Persona DLC gratuite",
        "you can summon it from the Compendium": "vous pouvez l'invoquer depuis le Compendium",
        "males and females": "hommes et femmes", "males": "hommes", "females": "femmes"
    }

    # Find Fusion Path Table
    fusion_header = soup.find('h3', string='Recommended Fusion Path')
    fusion_table = fusion_header.find_next('table')
    
    recommended_fusions = []
    for row in fusion_table.find_all('tr')[1:]: # Skip header
        cols = row.find_all('td')
        if len(cols) >= 4:
            level_text = cols[0].get_text(strip=True)
            try:
                level = int(level_text)
            except ValueError:
                level = level_text # Keep "-" or other strings
            
            p1 = translate_text(cols[1].get_text(" ", strip=True), persona_map, skill_map, other_map)
            p2 = translate_text(cols[2].get_text(" ", strip=True), persona_map, skill_map, other_map)
            result = translate_text(cols[3].get_text(" ", strip=True), persona_map, skill_map, other_map)
            notes = translate_text(cols[4].get_text(" ", strip=True), persona_map, skill_map, other_map) if len(cols) > 4 else ""
            
            recommended_fusions.append({
                "level": level,
                "p1": p1,
                "p2": p2,
                "result": result,
                "notes": notes
            })
            
    # Find Treasure Demons Table
    td_header = soup.find('h3', string='Treasure Demons')
    td_table = td_header.find_next('table')
    
    treasure_demons = []
    for row in td_table.find_all('tr')[1:]:
        cols = row.find_all('td')
        if len(cols) >= 6:
            name = translate_text(cols[0].get_text(strip=True), persona_map, skill_map, other_map)
            level = int(cols[1].get_text(strip=True))
            arcana = cols[2].get_text(strip=True)
            where = cols[3].get_text(" ", strip=True)
            weakness = cols[4].get_text(strip=True)
            skills = translate_text(cols[5].get_text(" ", strip=True), persona_map, skill_map, other_map)
            
            treasure_demons.append({
                "name": name,
                "level": level,
                "arcana": arcana,
                "where": where,
                "weakness": weakness,
                "skills": skills
            })
            
    # Save fusions as requested
    with open('E:/Travail Dev/Persona/src/data/recommended_fusions.json', 'w', encoding='utf-8') as f:
        json.dump(recommended_fusions, f, ensure_ascii=False, indent=2)
        
    # Save treasure demons too
    with open('E:/Travail Dev/Persona/src/data/treasure_demons.json', 'w', encoding='utf-8') as f:
        json.dump(treasure_demons, f, ensure_ascii=False, indent=2)

if __name__ == "__main__":
    parse_guide()
