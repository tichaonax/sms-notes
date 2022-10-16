export const systemNotes =
[
	{
		"uuid": "f1b1e-6e14-c5f3-a664-7a022bd07a2",
		"title": "SMS Notes quick help",
		"note": "Your notes are persisted to browser localstorage.\nHere are the key functions:\n\n1. Add / Update / Delete / Search notes\n2. Export notes to file\n3. Export notes to clipboard\n4. Import notes from file\n5. Import notes from clipboard\n6. Toggle theme light/dark, selection persisted.\n7. Drop down limit master list viewable area.\n8. Create a pdf of the current note\n\nexport/import is json text file\n flowchart LR\n    SMS-Notes --- LocalStorage\n\n",
		"docType": 0,
		"lastModified": 1665261003590
	},
	{
		"uuid": "8f07a53-1026-761-8fe0-d46ecee8",
		"title": "git cheatsheet",
		"note": "#### git rm [file]\n```delete the file from project and stage the removal for commit```\n\n# SHARE & UPDATE\nRetrieving updates from another repository and updating local repos\n\n#### git remote add [alias] [url]\n```add a git URL as an alias```\n\n#### git fetch [alias]\n```fetch down all the branches from that Git remote```\n\n#### git merge [alias]/[branch]\n```merge a remote branch into your current branch to bring it up to date```\n\n#### git push [alias] [branch]\n```Transmit local branch commits to the remote repository branch```\n\n#### git pull\n```fetch and merge any commits from the tracking remote branch```\n\n# SETUP\nConfiguring user information used across all local repositories\n\n#### git config --global user.name “[firstname lastname]”\n```git config --global user.name \"Tichaona Hwandaza\" set a name that is identifiable for credit when review version history```\n\n#### git config --global user.email “[valid-email]”\n```git config --global user.email tichaonax@gmail.com set an email address that will be associated with each history marker```\n\n#### git config --global color.ui auto\n```set automatic command line coloring for Git for easy reviewing```\n\n#### git status \n```show file status```\n\n#### git status -s \n```show short file status```\n\n#### git add <filename> \n```add the particular file to staging area```\n\n#### git add . \n```add all the file to the staging area```\n\n#### git commit --amend \n```add these changes to the last commit ```\n\n#### git commit -m \"message\"\n```commit the files in the staging area```\n\n#### git commit -am \"message\"\n```commit without adding the file to the staging area```\n\n#### git checkout --<filename>\n```restore last committed file```\n\n#### git checkout .\n```restore all files with last commit```\n\n#### git checkout -f \n```all the files will be replaced with last commit```\n\n#### git checkout -b <branch name>\n```create a branch from the current one```\n\n#### git branch\n```list local branches```\n\n#### git branch -a\n```list remote branches```\n\n#### git branch -d <branch name>\n```delete a branch```\n\n#### git branch -D <branch name>\n```delete a branch```\n\n#### git branch -v \n```show the branch and its last commit```\n\n#### git branch --merged \n```show the branches that are merged```\n\n#### git reset --merge\n```screw previous merge\"```\n\n#### git merge --abort\n``` same as above abort merge```\n\n#### git branch --no-merged\n```show the branches that are not merged```\n\n#### git merge <branch name>\n``merge another branch to the current branch```\n\n#### git log \n```show all the commits```\n\n# This will destroy any local modifications.\n# Don't do it if you have uncommitted work you want to keep.\n#### git reset --hard <some commit>\n\n# Alternatively, if there's work to keep:\n#### git stash\n\n#### git reset --hard <some commit>\n\n#### git stash pop\n# This saves the modifications, then reapplies that patch after resetting.\n# You could get merge conflicts, if you've modified things which were\n# changed since the commit you reset to.\n\n#### git stash list --all\n```list stashes```\n\n#### git stash drop\n```The drop command will delete stash entries one at a time```\n\n#### git stash clear\n```remove all stashed entries```\n\n#### git log -n \n```n can be replaced by any number \"will show last n commits\"```\n\n#### git log -p \n```show detailed description of the commits```\n\n#### git log -p -n\n ```use of n is similar as described above```\n\n#### git log --stat \n```will show short detailing of the commits``` \n\n#### git log --stat -n \n ```use of n is similar as described above```    \n\n#### git log --since=n.days \n```commit of last n days/weeks/months \"days can be replaced by weeks,months\"```\n\n#### git rm --cached <filename>\n```will remove to file from the tracking area```\n\n#### git rm -rf \n ```will uninitialized the current repository```   \n\n#### git rm <filename> \n```will delete the file```  \n\n#### git mv <Present filename> <The filename after the change>\n```to Rename the file```\n\n#### git clone <URL>  \n```cloning a repository to the current folder```\n\n#### git clone <URL> foldername  \n```cloning the repository to named folder (Folder will be created by itself)``` \n\n#### git config --global alias. <new name> 'old command'\n```create an alias command for the given command```\n\n#### git remote \n```show all the name of remote repository```\n\n#### git remote -v \n```show all the path (fetch/push) of the remote repository```\n\n#### git remote add <name> url\n```add a remote repository```\n\n#### git remote rm <name>\t\n```remove a remote branch```\n\n#### git push <remote name> <branch name>\n```push a branch to remote repository```\n\n#### git push <remote name> <branch name>: \n```<branch name you want to have in the remote repository>```\n\n#### git push --set-upstream origin <branch>\n```The current branch has no upstream branch. this pushes the current branch and set the remote as upstream, next time you simply use the git push command```\n\n#### git reset HEAD\n```to move to a previous commit```",
		"docType": 0,
		"lastModified": 1665261112491
	},
	{
		"uuid": "647c1af-7263-42a4-f840-e37604fc3803",
		"title": "VSCode cheatsheet",
		"note": "Set of must know vs-code productivity short-cuts",
		"docType": 0,
		"lastModified": 1664760133561
	},
	{
		"uuid": "75fbb7-dd3-d47-4a5a-2f4c08803ff",
		"title": "html cheatsheet",
		"note": "[visit Html cheatsheet](https://htmlcheatsheet.com/)\n\n[visit css cheatsheet](https://htmlcheatsheet.com/css/)\n\n[visit Javascript cheatsheet](https://htmlcheatsheet.com/js/)\n\n[visit JQuery cheatsheet](https://htmlcheatsheet.com/jquery/)",
		"docType": 0,
		"lastModified": 1664757628884
	},
	{
		"uuid": "0d806-da07-3f53-6a7-cef721f24824",
		"title": "Configure kdiff3 merge tool",
		"note": "### configure windows \n#### download from https://download.kde.org/stable/kdiff3/\n\n**please check the install folder of kdiff3**\n\n\ngit config --global merge.tool kdiff3\n\ngit config --global mergetool.kdiff3.path \"C:/Program Files/KDiff3/bin/kdiff3.exe\"\n\ngit config --global mergetool.kdiff3.trustExitCode false\n\ngit config --global diff.guitool kdiff3\n\ngit config --global difftool.kdiff3.path \"C:/Program Files/KDiff3/bin/kdiff3.exe\"\n\ngit config --global difftool.kdiff3.trustExitCode false\n\n### configure ubuntu\nsudo apt install kdiff3\n\ngit config --global merge.tool kdiff3\n\ngit config --global mergetool.kdiff3.path \"/usr/bin/kdiff3\"\n\ngit config --global mergetool.kdiff3.trustExitCode false\n\ngit config --global diff.guitool kdiff3\n\ngit config --global difftool.kdiff3.path \"/user/bin/kdiff3\"\n\ngit config --global difftool.kdiff3.trustExitCode false\n\n### to invoke merge run\ngit mergetool --tool=kdiff3",
		"docType": 0,
		"lastModified": 1664558325708
	},
	{
		"uuid": "647c1af-7263-42a4-f840-e37604fc3803",
		"title": "VSCode cheatsheet",
		"note": "Set of must know vs-code productivity short-cuts\n\n#### command pallet\n```CTRL + P ```\n\n\n#### global search all symbols including methods in all files\n```CTRL + P then start your search with #```\n\n```CTRL + T ```\n\n\n#### search for symbols in the same file\n\n```CTRL + P then start your search with @```\n\n```CTRL + SHIFT + O ```\n\n\n#### go to line number in current file\n\n```CTRL + G```\n\n\n#### open new terminal widow.\n```CTRL + ` ```\n\n#### move one word left or right on terminal command.\n```CTRL + <```\n\n```CTRL + >```\n",
		"docType": 0,
		"lastModified": 1665936042811
	}
]