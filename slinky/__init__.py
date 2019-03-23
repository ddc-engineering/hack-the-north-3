
small_words = []

with open('small_words.txt') as f:
    for word in f.readlines():
        small_words.append(word.replace("\n", ""))

