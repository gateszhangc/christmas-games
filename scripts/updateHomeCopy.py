#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Update home page copy with SEO-optimized content
"""

import re

# Read the HTML file
with open('data/home-body.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Define the old text pattern (simplified to match the actual content)
old_pattern = r'<p>Ho Ho Ho, Santa\s+Claus is coming to Poki.*?you a Merry Christmas!</p>'

# New SEO-optimized text
new_text = '''<p>Looking for the best free Christmas games online? Discover our collection of fun Christmas games perfect for the whole family! Whether you're searching for Christmas party games, Christmas games for kids, or Christmas games for adults, we've got something special for everyone this holiday season.</p>

<p>Our Christmas games online collection features exciting options for every occasion. Planning a Christmas party? Try our fun Christmas party games that bring friends and family together. Looking for family Christmas games? Explore our selection of Christmas games for family gatherings, including <a onclick="window.navigateTo('/en/quiz');return false;" href="https://poki.com/en/quiz">Christmas trivia games</a>, <a onclick="window.navigateTo('/en/board');return false;" href="https://poki.com/en/board">Christmas board games</a>, and exciting <a onclick="window.navigateTo('/en/two-player');return false;" href="https://poki.com/en/two-player">2 player Christmas games</a>. From minute to win it Christmas games to Christmas gift exchange games, we have all the Christmas game ideas you need to make your holiday celebrations unforgettable.</p>

<p>Play Christmas games all year round on any device - PC, mobile phone, or tablet. Our free online Christmas games are perfect for Christmas day games, Christmas holiday party games, and cozy winter gaming sessions. Enjoy fun family Christmas games, dress up in festive outfits, play as Santa Claus, and experience the magic of the holiday season. Poki wishes you a Merry Christmas filled with joy and fun games to play at Christmas!</p>'''

# Replace the content
new_content = re.sub(old_pattern, new_text, content, flags=re.DOTALL)

# Write back to file
with open('data/home-body.html', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("✅ Successfully updated home page copy with SEO-optimized content!")
print("\n📊 SEO Keywords integrated:")
print("- christmas games (49,500 volume)")
print("- christmas party games (18,100 volume)")
print("- christmas games for family (14,800 volume)")
print("- christmas games for adults (6,600 volume)")
print("- fun christmas games (6,600 volume)")
print("- christmas games for kids (5,400 volume)")
print("- family christmas games (5,400 volume)")
print("- christmas games ideas (3,600 volume)")
print("- christmas games online (3,600 volume)")
print("- minute to win it christmas games (4,400 volume)")
print("- christmas gift exchange games (1,900 volume)")
print("- christmas day games (1,900 volume)")
print("- fun family christmas games (1,900 volume)")
print("- christmas trivia game (1,600 volume)")
print("- christmas board games (1,600 volume)")
