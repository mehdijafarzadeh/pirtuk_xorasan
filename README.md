# Pirtûk Xorasan: audio website

A free audio website for the textbook's listening exercises. GitHub Pages hosts it, so there is no server, no paid hosting and no API keys.

- `index.html`: list of all exercises, grouped by unit
- `listen.html?id=…`: the page for one exercise, with a player, slower speeds, "back 5 s", an optional transcript and previous/next links
- `qr.html`: printable QR codes for every exercise
- `data/exercises.json`: **the only file you edit to change the content**
- `audio/`: MP3 copies of the recordings, used when there is no Drive link or when Drive fails

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
          "title": "زمان ما 1",
          "instructions": "Listen and repeat.",
          "drive": "https://drive.google.com/file/d/FILE_ID/view?usp=sharing",
          "audio": "audio/zaman-ma-01.mp3",
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
| `drive` | no | A Google Drive share link, or just the file ID. |
| `audio` | no | The path to an MP3 in this repository, or any other direct audio URL. |
| `instructions` | no | A short line shown above the player. |
| `transcript` | no | Shown behind a "Show transcript" button. Use `\n` for a new line. Leave it empty to hide the button. |

Each exercise needs at least one of `drive` or `audio`.

**Which file gets played:** the page first tries the Google Drive file in the normal player. If Drive refuses, it uses the `audio` file. If there is no `audio` file, it shows Google Drive's own embedded player instead.

Mind the JSON punctuation. Every item except the last one in a list ends with a comma, and text goes in "double quotes". If the site shows "Loading…" forever or an error after you edit the file, paste the file into <https://jsonlint.com> to find the mistake.

## 2. Using your Google Drive files

The site cannot read your Drive folder by itself, because that would need an API key. Add one link per exercise instead.

### Set the sharing permission (one time)

1. Open the folder in Google Drive.
2. Right-click the folder and choose **Share → Share**.
3. Under **General access**, choose **Anyone with the link**, with the role **Viewer**, and click **Done**.

The files inside inherit this setting. If a file still won't play, check that file's own sharing setting.

### Get a link for each file

1. Right-click an audio file and choose **Share → Copy link**.
2. Paste the link into the exercise's `"drive"` field. It looks like `https://drive.google.com/file/d/1AbC…XyZ/view?usp=sharing`, and the site works out the file ID itself.

Repeat this for every file.

**Tips**
- Upload **MP3** (or M4A) files to Drive, not WAV. WAV files are about 15 times larger. They load slowly on phones, and Drive may refuse to stream them in the normal player. The MP3s in `audio/` are ready to upload.
- Files over about 100 MB trigger Drive's "can't scan for viruses" page, and then they will only play in the embedded Drive player.
- Drive limits how often a popular file can be downloaded. That is why keeping the MP3 in `audio/` as a backup is a good idea: if Drive fails, the backup plays automatically.

## 3. Adding a new exercise

1. Put the audio in Google Drive and copy its share link (see above), **or** copy the MP3 into the `audio/` folder.
2. In `data/exercises.json`, copy an existing exercise block and change `id`, `number`, `title` and `drive`/`audio`.
3. To start a new unit, copy a whole unit block (`"unit": …, "title": …, "exercises": [ … ]`).
4. Save, commit and push (see below). The site updates in about a minute.

You can edit `data/exercises.json` directly on github.com: open the file, click the pencil icon, edit, then click **Commit changes**. For new MP3s use **Add file → Upload files** in the `audio/` folder.

To make an MP3 from a WAV file on a Mac (needs `ffmpeg`, installed with `brew install ffmpeg`):

```bash
ffmpeg -i "input.wav" -codec:a libmp3lame -b:a 128k audio/new-file.mp3
```

## 4. QR codes for the printed book

Each exercise has a permanent address:

```
https://mehdijafarzadeh.github.io/pirtuk_xorasan/listen.html?id=1-1
```

Open `qr.html` on the live site to get a QR code for every exercise. You can print the page, or download each code as a PNG for your book layout. The codes keep working as long as you:

- never change or reuse an exercise's `id`,
- keep the repository name `pirtuk_xorasan`.

You can change everything else at any time: titles, audio links, transcripts and order.

## 5. Deployment (GitHub Pages)

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
