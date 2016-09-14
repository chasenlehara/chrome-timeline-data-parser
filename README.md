# Chrome Timeline Data Parser

This script parses the JSON produced by Chrome’s Timeline.

You can call the script with either a directory or a file, as well as an event message name.

For example:

```
node index.js ~/file.json "Event name"
```

…will output all the timestamps for that event name to the console.

Similarly:

```
node index.js ~/files/ "Event name"
```

…will parse all the files in that directory and output the timestamps to the console.