import Database from 'better-sqlite3';
import path from 'path';

/**
 * We store the SQLite database file in the compiled "dist" directory.
 * Adjust if you want a different location.
 */
const dbPath = path.join(__dirname, 'myDatabase.sqlite');
const db = new Database(dbPath);

/**
 * Create tables if they don't exist.
 */
db.exec(`
  CREATE TABLE IF NOT EXISTS messages (
                                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                                        sender TEXT NOT NULL,
                                        text TEXT NOT NULL,
                                        date TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS quotes (
                                      id INTEGER PRIMARY KEY AUTOINCREMENT,
                                      text TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS albums (
                                      id INTEGER PRIMARY KEY AUTOINCREMENT,
                                      name TEXT NOT NULL UNIQUE
  );

  CREATE TABLE IF NOT EXISTS photos (
                                      id INTEGER PRIMARY KEY AUTOINCREMENT,
                                      albumId INTEGER,
                                      path TEXT NOT NULL
  );
`);

/**
 * Define an interface for the COUNT(*) row so TypeScript knows 'cnt' is a number.
 */
interface CountRow {
  cnt: number;
}

// Check how many quotes we have.
const quoteCountRow = db
    // The query returns one row with { cnt: number }
    .prepare<[], CountRow>('SELECT COUNT(*) AS cnt FROM quotes')
    .get();

if (quoteCountRow && quoteCountRow.cnt === 0) {
  // Insert special-day quotes
  db.prepare('INSERT INTO quotes (text) VALUES (?)').run('Merry Christmas, my love!');
  db.prepare('INSERT INTO quotes (text) VALUES (?)').run('Happy New Year, baby!');
  db.prepare('INSERT INTO quotes (text) VALUES (?)').run('Happy Birthday, my beautiful girl!');
  db.prepare('INSERT INTO quotes (text) VALUES (?)').run('Happy Anniversary! I love you so much!');
  db.prepare('INSERT INTO quotes (text) VALUES (?)').run('Happy Monthaversary, baby!');

  // Random everyday quotes
  const randomQuotes = [
    'I love you more than words can say.',
    'Every day with you is an adventure.',
    'You make my heart skip a beat.',
    'Your smile brightens my day.',
    'You’re the best thing that ever happened to me.',
    'I appreciate you more than you know.',
    'Time with you is my favorite time.',
    'You inspire me to be a better person.',
    'I love how we understand each other.',
    'You are my sunshine on a cloudy day.',
    'Being with you feels like home.',
    'I adore everything about you.',
    'I’m so lucky to have you in my life.',
    'Thank you for always being there for me.',
    'You’re my best friend and my soulmate.',
    'You are my heart’s greatest joy.',
    'Every moment with you is magical.',
    'I cherish every second I spend with you.',
    'You are my forever and always.',
    'You make life so much more beautiful.',
    'Your love is my guiding light.',
    'I love you more than all the stars in the sky.',
    'You complete me in every way.',
    'You are my dream come true.',
    'You are the reason I smile every day.',
    'Forever is not long enough with you.',
    'You are the love of my life.',
    '"I just called to say I love you" - Stevie Wonder',
    '"You’re still the one I run to" - Shania Twain',
    '"All of me loves all of you" - John Legend',
    '"Take my breath away" - Berlin',
    '"You are the best thing that’s ever been mine" - Taylor Swift',
    '"When the night has come, and the land is dark, I’ll be your light" - Ben E. King',
    '"You’re the one that I want" - John Travolta & Olivia Newton-John',
    '"Isn’t she lovely?" - Stevie Wonder',
    '"You make me smile like the sun" - Uncle Kracker',
    '"You are the reason I’m still breathing" - Calum Scott',
    '"Every little thing she does is magic" - The Police',
    '"I could make you happy, make your dreams come true" - Elvis Presley',
    '"I found a love to carry more than just my secrets" - Ed Sheeran',
    '"You make loving you easy" - Zac Brown Band',
    '"You are my fire, my one desire" - Backstreet Boys',
    '"I’ll stand by you, won’t let anybody hurt you" - The Pretenders',
    '"You’re my end and my beginning" - John Legend',
    '"I will always love you" - Whitney Houston',
    '"You’re the inspiration" - Chicago',
    '"More than words to show you feel that your love for me is real" - Extreme',
    '"You’re my everything, my sun and my moon" - The Temptations',
    '"I’ll be there for you, these five words I swear to you" - Bon Jovi',
    '"I’ve been waiting for a girl like you" - Foreigner',
    '"I carry your heart with me (I carry it in my heart)" - E.E. Cummings',
    '"How do I love thee? Let me count the ways." - Elizabeth Barrett Browning',
    '"You are my sun, my moon, and all my stars." - E.E. Cummings',
    '"Love is not love which alters when it alteration finds." - William Shakespeare',
    '"Two souls but a single thought, two hearts that beat as one." - Friedrich Halm',
    '"At the touch of love, everyone becomes a poet." - Plato',
    '"She walks in beauty, like the night of cloudless climes and starry skies." - Lord Byron',
    '"Grow old along with me! The best is yet to be." - Robert Browning',
    '"For thy sweet love remembered such wealth brings that then I scorn to change my state with kings." - William Shakespeare',
    '"The minute I heard my first love story, I started looking for you." - Rumi',
    '"Love alters not with his brief hours and weeks, but bears it out even to the edge of doom." - William Shakespeare',
    '"Your love shines brighter than the stars in the night sky." - Unknown',
    '"My heart is, and always will be, yours." - Jane Austen',
    '"Whatever our souls are made of, his and mine are the same." - Emily Bronte',
    '"Love is composed of a single soul inhabiting two bodies." - Aristotle',
    '"We loved with a love that was more than love." - Edgar Allan Poe',
    '"And I shall find some peace there, for my love is evergreen." - Unknown',
    '"You are the finest, loveliest, tenderest, and most beautiful person I have ever known." - F. Scott Fitzgerald',
    '"To love and be loved is to feel the sun from both sides." - David Viscott',
    '"The best thing to hold onto in life is each other." - Audrey Hepburn',
    '"Where there is love, there is life." - Mahatma Gandhi',
    '"Love recognizes no barriers. It jumps hurdles, leaps fences, penetrates walls to arrive at its destination full of hope." - Maya Angelou',
    '"You know you’re in love when you can’t fall asleep because reality is finally better than your dreams." - Dr. Seuss',
    '"If I know what love is, it is because of you." - Hermann Hesse',
    '"The way to love anything is to realize that it may be lost." - G.K. Chesterton',
    '"To love and be loved is to feel the sun from both sides." - David Viscott',
    '"Love is a friendship set to music." - Joseph Campbell',
    '"We loved with a love that was more than love." - Edgar Allan Poe',
    '"In all the world, there is no heart for me like yours." - Maya Angelou',
    '"The greatest happiness of life is the conviction that we are loved." - Victor Hugo',
    '"Love and kindness are never wasted." - Barbara De Angelis',
    '"The only thing we never get enough of is love; and the only thing we never give enough of is love." - Henry Miller',
    '"It is not a lack of love, but a lack of friendship that makes unhappy marriages." - Friedrich Nietzsche',
    '"There is no charm equal to tenderness of heart." - Jane Austen',
    '"You have bewitched me, body and soul." - Jane Austen',
    '"To the world you may be one person, but to one person you are the world." - Dr. Seuss',
    '"Love is the voice under all silences, the hope which has no opposite in fear." - E.E. Cummings',
    '"A simple ‘I love you’ means more than money." - Frank Sinatra',
    'I love you so much, baby.',
    'You are forever my soul.',
    'You are my everything.',
    'My heart belongs to you and only you.',
    'I love you more than life itself.',
    'You are the reason I wake up smiling.',
    'You are my forever and my always.',
    'You are my soulmate, my partner, my everything.',
    'Every second with you is a treasure.',
    'My love for you grows stronger every day.',
    'You are my heart, my life, my one and only thought.',
    'You are my greatest adventure.',
    'You are the love of my life and my reason for living.',
    'You are my paradise, my everything.',
    'I love you to the moon and back.',
    'You are the most beautiful thing that has ever happened to me.',
    'You make my world complete.',
    'I am so in love with you.',
    'You are my one true love.',
    'With you, I have everything I need.',
    'You are my angel, my dream, my love.',
    'My heart beats for you.',
    'You are my treasure, my today, my forever.',
    'You are the light of my life.',
    'My love for you is eternal.'

  ];

  for (const quote of randomQuotes) {
    db.prepare('INSERT INTO quotes (text) VALUES (?)').run(quote);
  }

  console.log('Inserted default quotes into the DB (special + random).');
}

export default db;
