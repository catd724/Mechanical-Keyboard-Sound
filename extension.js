'use strict';
const vscode = require('vscode');
const fs = require('fs');
const path = require('path');
const sound = require('sound-play');

let isActive = true;

// Activate extension
function activate(context) {
    console.log('Mechanical Keyboard Sound Extension Activated!');

    // Listen for any text changes in the workspace
    const disposable = vscode.workspace.onDidChangeTextDocument(event => {
        if (!isActive || event.contentChanges.length === 0) return;

        const keyPressed = event.contentChanges[0].text;
        playSound(getSoundFile(keyPressed));
    });

    context.subscriptions.push(disposable);
}

// Get sound file based on key
function getSoundFile(key) {
    const basePath = path.join(__dirname, 'sounds');

    // Enter key
    if (key === '\n' || key === '\r\n') {
        return path.join(basePath, 'enter1.wav');
    }

    // Default key press
    return path.join(basePath, 'key.wav');
}

// Play the sound quickly
function playSound(filePath) {
    if (!fs.existsSync(filePath)) {
        console.error(`❌ Sound file not found: ${filePath}`);
        return;
    }

    // Play asynchronously, low delay
    sound.play(filePath).catch(err => console.error('❌ Sound Error:', err));
}

// Optional deactivate
function deactivate() {
    isActive = false;
}

module.exports = { activate, deactivate };
