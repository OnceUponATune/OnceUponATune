import nltk
from nltk.sentiment import SentimentAnalyzer
from nltk.classify import NaiveBayesClassifier
from nltk.sentiment.vader import SentimentIntensityAnalyzer
from nltk.corpus import subjectivity
from nltk.sentiment.util import *
from flask import Flask
import re
try:
    # For Python 3.0 and later
    from urllib.request import urlopen
except ImportError:
    # Fall back to Python 2's urllib2
    from urllib2 import urlopen
from bs4 import BeautifulSoup

app = Flask(__name__)

@app.route('/')
def index():
    return "Hello, World!"

@app.route('/getNER',methods=['GET'])
def getStory():
    story = request.form['story']
    tokens = nltk.word_tokenize(story)
    tagged = nltk.pos_tag(tokens)
    entities = nltk.chunk.ne_chunk(tagged)
    return "Hello, World!"

@app.route('/postStory',methods=['POST'])
def postStory():
    story = request.form['story']
    return "Hello, World!"

def features(sentence):
    words = sentence.lower().split()
    for w in words:
        return dict(('contains(%s)' % w, True))

def get_lyrics(artist,song_title):
    artist = artist.lower()
    song_title = song_title.lower()
    # remove all except alphanumeric characters from artist and song_title
    artist = re.sub('[^A-Za-z0-9]+', "", artist)
    song_title = re.sub('[^A-Za-z0-9]+', "", song_title)
    if artist.startswith("the"):    # remove starting 'the' from artist e.g. the who -> who
        artist = artist[3:]
    url = "http://azlyrics.com/lyrics/"+artist+"/"+song_title+".html"

    try:
        content = urlopen(url)
        soup = BeautifulSoup(content, 'html.parser')
        lyrics = str(soup)
        # lyrics lies between up_partition and down_partition
        up_partition = '<!-- Usage of azlyrics.com content by any third-party lyrics provider is prohibited by our licensing agreement. Sorry about that. -->'
        down_partition = '<!-- MxM banner -->'
        lyrics = lyrics.split(up_partition)[1]
        lyrics = lyrics.split(down_partition)[0]
        lyrics = lyrics.replace('<br>','').replace('<','').replace('br','').replace('/>','').replace('i>','').replace('</div>','').replace('/','').strip().lower()
        lyrics = re.sub(r'\[(.*?)\]','',lyrics)
        arr = lyrics.splitlines()
        tokens_arr = list(map(nltk.word_tokenize,arr))
        def ripOutEmpty(arr):
            return arr and len(arr) > 0
        tokens_arr = filter(ripOutEmpty, tokens_arr)

        def appendSubj(arr):
            return (arr,'obj')

        tokens_arr = map(appendSubj,tokens_arr)
        print(tokens_arr)

        n_instances = 100
        subj_docs = [(sent, 'subj') for sent in subjectivity.sents(categories='subj')[:n_instances]]
        obj_docs = [(sent, 'obj') for sent in subjectivity.sents(categories='obj')[:n_instances]]

        print subj_docs

        len(subj_docs), len(obj_docs)
        train_subj_docs = subj_docs[:80]
        test_subj_docs = subj_docs[80:100]
        train_obj_docs = obj_docs[:80]
        test_obj_docs = obj_docs[80:100]

        training_docs = train_subj_docs+train_obj_docs
        testing_docs = test_subj_docs+test_obj_docs
        # print 'testing docs', testing_docs
        sentim_analyzer = SentimentAnalyzer()
        all_words_neg = sentim_analyzer.all_words([mark_negation(doc) for doc in training_docs])
        unigram_feats = sentim_analyzer.unigram_word_feats(all_words_neg, min_freq=4)
        len(unigram_feats)
        # print "unigram_feat ", unigram_feats

        sentim_analyzer.add_feat_extractor(extract_unigram_feats, unigrams=unigram_feats)
        training_set = sentim_analyzer.apply_features(training_docs)
        test_set = sentim_analyzer.apply_features(testing_docs)
        trainer = NaiveBayesClassifier.train
        classifier = sentim_analyzer.train(trainer, training_set)
        # print(arr)
        print testing_docs
        fake = ['0']*len(arr)
        # print(arr)
        # tuples = list(map(features, arr))
        feature = sentim_analyzer.apply_features(tokens_arr, True)
        # print feature
        # print(test_set)
        # print(tuples)
        # print(arr)
        for key,value in sorted(sentim_analyzer.evaluate(feature).items()):
            print('{0}: {1}'.format(key, value))

        sim = SentimentIntensityAnalyzer()
        for sentence in arr:
            print(sentence)
            ss = sim.polarity_scores(sentence)
            for k in sorted(ss):
                print k, ss[k]
        # story = lyrics
        # tokens = nltk.word_tokenize(story)
        # tagged = nltk.pos_tag(tokens)
        # entities = nltk.chunk.ne_chunk(tagged)
        # return entities
    except Exception as e:
        # print e
        return "Exception occurred \n" +str(e)

if __name__ == '__main__':
    print(get_lyrics('kanyewest','Spaceship'))
    app.run(debug=True)
