import bs4
import json
import re

def parse_htm(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        soup = bs4.BeautifulSoup(f, 'html.parser')
    
    schedule = {}
    sections = soup.find_all('div', id=re.compile(r'SectionContainer\d+'))
    
    for section in sections:
        # Some sections are months, some are other info
        title_h3 = section.find('h3')
        if not title_h3:
            continue
        
        # Check if it's a month section
        # The titles are like "April", "May", etc.
        # But some are "January/February"
        
        tables = section.find_all('table')
        for table in tables:
            rows = table.find_all('tr')
            for row in rows:
                cells = row.find_all('td')
                if len(cells) >= 2:
                    date_text = cells[0].get_text().strip()
                    # Match MM/DD
                    match = re.search(r'(\d{2}/\d{2})', date_text)
                    if match:
                        mm_dd = match.group(1)
                        mm, dd = mm_dd.split('/')
                        if mm in ['01', '02', '03']:
                            year = '2023'
                        else:
                            year = '2022'
                        full_date = f"{year}-{mm}-{dd}"
                        
                        daytime = ""
                        evening = ""
                        
                        if len(cells) == 3:
                            daytime = cells[1].get_text(separator='\n').strip()
                            evening = cells[2].get_text(separator='\n').strip()
                        elif len(cells) == 2:
                            if cells[1].get('colspan') == '2' or 'colspan' in str(cells[1]):
                                daytime = cells[1].get_text(separator='\n').strip()
                                evening = daytime
                            else:
                                daytime = cells[1].get_text(separator='\n').strip()
                                evening = ""
                        
                        # Clean up text
                        daytime = " ".join(daytime.split())
                        evening = " ".join(evening.split())
                        
                        schedule[full_date] = {
                            "daytime": daytime,
                            "evening": evening
                        }
    
    return schedule

if __name__ == "__main__":
    data = parse_htm('docs/100perfectrun.htm')
    final_data = {}
    for date in sorted(data.keys()):
        mm = int(date.split('-')[1])
        if mm >= 4 or mm <= 2:
            final_data[date] = data[date]
            
    with open('raw_schedule.json', 'w', encoding='utf-8') as f:
        json.dump(final_data, f, indent=2, ensure_ascii=False)
