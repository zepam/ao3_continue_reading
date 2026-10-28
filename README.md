# AO3 Continue Reading

A Firefox extension that automatically resumes from your last read chapter when you load an Archive of Our Own (AO3) work.

## Features

- Saves the last chapter you read for each work
- Prompts you to resume when you load a work
- Works across browser restarts
- Per-work tracking (no mixing up different fics)
- Lightweight and privacy-focused (all data stored locally)

## Installation

### Option 1: Load Locally (for testing/development)

1. Clone or download this repository
2. Open Firefox and go to `about:debugging`
3. Click **"This Firefox"** in the sidebar
4. Click **"Load Temporary Add-on"**
5. Select the `manifest.json` file from this folder

**Note:** Temporary add-ons unload when Firefox restarts. For permanent installation, see Option 2.

### Option 2: Package as .xpi (permanent installation)

1. Install the [web-ext](https://github.com/mozilla/web-ext) tool:
   ```bash
   npm install --save-dev web-ext
   ```

2. From the extension folder, run:
   ```bash
   npx web-ext build
   ```

3. This creates a `.xpi` file. Open it with Firefox to install permanently.

### Option 3: Use Greasemonkey

1. Install the [Greasemonkey](https://www.greasespot.net/) browser extension for Firefox or [Tampermonkey](https://www.tampermonkey.net/) for other browsers.
2. Copy the contents of `ao3continuereading_user_script.js` into a New User Script.

## How It Works

- Every time you read a chapter, the extension saves that chapter ID for that work
- When you load a work's page, if it's a new chapter from what you last read, it prompts you to resume
- Click **OK** to jump to your last chapter, or **Cancel** to stay on chapter 1
- Data is stored locally in Firefox and never synced anywhere

## File Structure

```
ao3-continue-reading/
├── manifest.json       # Extension configuration
├── content.js          # Main script that runs on AO3
├── ao3continuereading_user_script.js # user script for a web extension
├── icons/
│   └── icon-128.png   # Extension icon
└── README.md          # This file
```

## Troubleshooting

**"The extension isn't saving chapters"**
- Open Firefox Console (F12 → Console tab)
- Load a chapter and check for `[AO3 Script]` messages
- Make sure the extension is enabled in `about:addons`

**"It's asking to resume the wrong work's chapter"**
- Check browser console—post an issue on GitHub with the log output

**"The extension stopped working after I closed Firefox"**
- If you loaded it temporarily (Option 1), it unloads on restart. Use Option 2 for permanent installation.

## Privacy

All data is stored locally in your Firefox profile. Nothing is sent to external servers or trackers.

## License

MIT

## Contributing

Found a bug or have a feature idea? Open an issue or submit a pull request!
