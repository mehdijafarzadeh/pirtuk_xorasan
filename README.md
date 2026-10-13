# Pirtûk Xorasan: audio website

A free audio website for the textbook's listening exercises. GitHub Pages hosts it, so there is no server, no paid hosting and no API keys.

- `index.html`: list of all exercises, grouped by unit
- `listen.html?id=…`: the page for one exercise, with a player, slower speeds, "back 5 s", an optional transcript and previous/next links
- `qr.html`: printable QR codes for every exercise
- `data/exercises.json`: **the only file you edit to change the content**
- `audio/`: the MP3 recordings

## 1. The content file: `data/exercises.json`

```json
{
  "site": { "title": "Pirtûk Xorasan — Audio", "subtitle": "Listening exercises for the textbook" },
  "units": [
    {
      "unit": 1,
      "title": "Unit 1",
      "exercises": [
        {
          "id": "1-1",
          "number": 1,
          "title": "Zimanê Me 1",
          "instructions": "Listen and repeat.",
          "audio": "audio/zimane-me-01.mp3",
          "transcript": "First line\nSecond line"
        }
      ]
    }
  ]
}
```

| Field | Required | Meaning |
|---|---|---|
| `id` | yes | The permanent ID used in the exercise's web address and QR code. **Never change it after printing.** It must be unique. |
| `number` | yes | The exercise number shown on the page, for example "Exercise 2". |
| `title` | yes | The exercise title. Kurdish, Persian and other right-to-left text displays correctly. |
| `audio` | yes | The path to the MP3 in the `audio/` folder. |
| `instructions` | no | A short line shown above the player. |
| `transcript` | no | Shown behind a "Show transcript" button. Use `\n` for a new line. Leave it empty to hide the button. |

Mind the JSON punctuation. Every item except the last one in a list ends with a comma, and text goes in "double quotes". If the site shows "Loading…" forever or an error after you edit the file, paste the file into <https://jsonlint.com> to find the mistake.

## 2. Adding a new exercise

1. Convert the recording to MP3 and put it in the `audio/` folder (see below).
2. In `data/exercises.json`, copy an existing exercise block and change `id`, `number`, `title` and `audio`.
3. To start a new unit, copy a whole unit block (`"unit": …, "title": …, "exercises": [ … ]`).
4. Save, commit and push (see below). The site updates in about a minute.

You can also do all of this on github.com. To upload MP3s, open the `audio/` folder and use **Add file → Upload files**. To edit `data/exercises.json`, open it, click the pencil icon, edit, then click **Commit changes**.

To make an MP3 from a WAV file on a Mac (needs `ffmpeg`, installed with `brew install ffmpeg`):

```bash
ffmpeg -i "input.wav" -codec:a libmp3lame -b:a 128k audio/new-file.mp3
```

Upload MP3s, not WAV files. WAV files are about 15 times larger and load slowly on phones. GitHub rejects files over 100 MB, and a Pages site should stay under 1 GB. At 128 kbps that is roughly 17 hours of audio.

## 3. QR codes for the printed book

Each exercise has a permanent address:

```
https://mehdijafarzadeh.github.io/pirtuk_xorasan/listen.html?id=1-1
```

Open `qr.html` on the live site to get a QR code for every exercise. You can print the page, or download each code as a PNG for your book layout. The codes keep working as long as you:

- never change or reuse an exercise's `id`,
- keep the repository name `pirtuk_xorasan`.

You can change everything else at any time: titles, audio links, transcripts and order.

## 4. Deployment (GitHub Pages)

The site is already deployed from the `main` branch. To publish changes from your computer:

```bash
cd /Users/mehdijafarzadeh/temp/pirtuk_xorasan
git add -A
git commit -m "Add exercise 2-3"
git push
```

To set it up again from scratch: create a **public** GitHub repository, push these files, then go to **Settings → Pages** and choose **Deploy from a branch → `main` / `(root)`**.

To preview locally before pushing (opening `index.html` directly does not work, because browsers block reading the JSON from a file):

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000>.

The original WAV recordings in `audios/` are not uploaded (see `.gitignore`), because they are too large for GitHub.
