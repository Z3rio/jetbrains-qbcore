![Thumbnail](https://user-images.githubusercontent.com/54480523/192335576-6f39af0c-21f8-43e7-91e7-c7f6e31a40ac.png)

# Jetbrains QBCore FiveM Addon

![Javascript](https://badges.frapsoft.com/javascript/code/javascript.png)
![License](https://img.shields.io/github/license/Z3rio/jetbrains-qbcore.svg)
![LastReleases](https://img.shields.io/github/release/Z3rio/jetbrains-qbcore.svg?label=Last%20releases&style=flat)
![OpenIssue](https://img.shields.io/github/issues/Z3rio/jetbrains-qbcore?style=flat)

This repostitory / addon allows you to have self-completion for the QBCore FiveM Framework in any Jetbrains product.

## Requirements:

- Any valid jetbrains product
- [EmmyLua extension](https://plugins.jetbrains.com/plugin/9768-emmylua) for that jetbrains product
- [Node.js](https://nodejs.org/)

# Installation Guide:

1. Install and unpack this repository to its own folder.
2. Open the console and navigate to the folder you put these files into.
3. Run `npm i` and then `npm run build` in the console window.
4. Open your IntelliJ product and open any project using lua.
5. Right click Emmylua under External Libraries and choose "Open Library Settings"
   <img src="https://user-images.githubusercontent.com/54480523/192336789-f1c6ddd3-6b9f-445d-beaa-7dc1acf9e848.png" width="50%">
6. Click the + under classpath and add the build folder as a path there.
   <img src="https://user-images.githubusercontent.com/54480523/192336974-51a31b01-dbf1-45f0-bc31-5f49f01d52ad.png" width="50%">
   <img src="https://user-images.githubusercontent.com/54480523/192337089-3b68cb7e-218c-4c13-bba4-482157a56e61.png" width="50%">

# Todo:

- Add auto completion for events and not only functions.
