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

![image](https://user-images.githubusercontent.com/1031407/194779900-d0dc5201-f347-4569-bbe6-9a9e3bb36a3c.png)

## Installation

```bash
git clone https://github.com/tichaonax/sms-notes.git
navigate to "sms-notes" folder
npm i
npm run start
```

If you are a developer who uses port 3000 or port 3001 in your work projects then you want to start your sms-notes app running on another port. From git bash for example running on port 4000

```PORT=4000 npm run start```

Keep in mind that sms-notes are stored in localStorage and that location is different for each port or domain. So if you see that you are missing some notes that is most likely the culprit. In a situation like that, before running on another port, export your current notes to a json file and reimport in the other port. The exported has the following format
```note-export--2022-10-15T16-30-19.373Z.json```

**If you have port collision your other app might not work if it does port forwarding on port 3000**

React default port is 3000.
## Usage


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
