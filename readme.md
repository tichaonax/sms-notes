## SMS-Notes

SMS-Notes is a simple typescript react app to create searchable notes content. The notes are stored is browser localStorage. So why SMS?, well if you are in my industry no doubt over a long period of time you do gather a lot of knowledge an documentation that you use at work on a day to day basis or even for personal use. 

For those gifted in documentation skill that becomes helpful if you want to refer to it at a letter stage; for example how do I add a new column in a SQL table using C# its been a while since I did that?


##### Enter SMS-Notes; ```Senior Memory Search```
I have forgotten how to do that. If you just remember a few keywords to what you previously saved you can get to what you want in an instant. SMS comes with a few notes that you can add or remove.

In a work environment security is important, you may not store sensitive information online, you just need it on your computer. Here are the key features of SMS-Notes

```
1. Store notes in browser localStorage.
2. Add delete notes
3. Search capability
4. Import and export notes to share with others
5. Support for markdown and mermaid documentation
```
SMS-Notes can be hosted on a server in a work environment so everyone can access it but you have your own copy of notes which can be added to system notes to be available to others.
You can also run it locally on your workstation.

## Installation

```bash
git clone 
```

## Usage

```ts
navigate to where the code base is
npm run start
```
- Add Markdown notes "Ctrl M" or click "MD" on toolbar
- Add Mermaid diagram "Ctrl G" or click "GR" on toolbar
- To search notes "Ctrl S" the search box gets focus, filters as you type. Match count reflects hits
- To clear the search box "Ctrl X"
- To toggle theme click the "Set Theme" button, your setting persists in localStorage.
- Select from the dropdown to set the limit of visible notes header on the master page, this also stored in localStorage.
- You can export the current notes to pdf
- Click on the menu on the toolbar to see more options.
- Export and import of notes are in a simple json text file.
- You can make your notes part of the code-base by adding them to the file ```sms-notes\src\state\system\systemNotes.ts```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)