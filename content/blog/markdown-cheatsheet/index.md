---
title: Markdown Cheatsheet
date: "2020-02-04"
description: "All the formatting options for markdown in a single post"
banner: "./banner.png"
---

## Headings

---

```markdown
# Heading 1

## Heading 2

### Heading 3

#### Heading 4

##### Heading 5

###### Heading 6
```

# Heading 1

## Heading 2

### Heading 3

#### Heading 4

##### Heading 5

###### Heading 6

## Emphasis

---

```markdown
**bold**
_italics_
~~strikethrough~~
```

**bold**
_italics_
~~strikethrough~~

```markdown
> Quoted Text
```

> Quoted Text

## Links

---

```markdown
A line with a [Link](akhilaariyachandra.com).
A line with a [Link with Title](akhilaariyachandra.com "Link Title")
```

A line with a [Link](akhilaariyachandra.com).
A line with a [Link with Title](akhilaariyachandra.com "Link Title")

## Images

---

```markdown
![alt text](https://camo.githubusercontent.com/1f8dec51cb01842d7bb7a7cd50ade17c75c5e3bd/68747470733a2f2f6173736574732e7a6569742e636f2f696d6167652f75706c6f61642f76313533383336313039312f7265706f7369746f726965732f6e6578742d6a732f6e6578742d6a732e706e67 "Image Title")
```

![alt text](https://camo.githubusercontent.com/1f8dec51cb01842d7bb7a7cd50ade17c75c5e3bd/68747470733a2f2f6173736574732e7a6569742e636f2f696d6167652f75706c6f61642f76313533383336313039312f7265706f7369746f726965732f6e6578742d6a732f6e6578742d6a732e706e67 "Image Title")

## Code

---

```markdown
Example of `inline code`.
```

Example of `inline code`.

### Code Block with Syntax Highlighting

````markdown
```javascript
const test = "JavaScript Example";
console.log(test);
```

```html
<html>
  <head>
    <title>Example</title>
  </head>
  <body>
    HTML Example
  </body>
</html>
```

```
No Language specified example
```
````

```javascript
const test = "JavaScript Example";
console.log(test);
```

```html
<html>
  <head>
    <title>Example</title>
  </head>
  <body>
    HTML Example
  </body>
</html>
```

```
No Language specified example
```

## Tables

---

```markdown
| Column Header 1 | Column Header 2 | Column Header 3 |
| --------------- | :-------------: | --------------: |
| Left Aligned    | Center Aligned  |   Right Aligned |
| No need         |    to format    |         columns |
| Column 1        |    Column 2     |        Column 3 |
```

| Column Header 1 | Column Header 2 | Column Header 3 |
| --------------- | :-------------: | --------------: |
| Left Aligned    | Center Aligned  |   Right Aligned |
| No need         |    to format    |         columns |
| Column 1        |    Column 2     |        Column 3 |

## Lists

---

### Ordered List

```markdown
1. First Item
2. Second Item
3. Third Item

OR

1. First Item
1. Second Item
1. Third Item
```

1. First Item
2. Second Item
3. Third Item

### Unordered List

```markdown
- First Item
- Second Item
- Third Item

OR

- First Item
- Second Item
- Third Item

OR

- First Item
- Second Item
- Third Item
```

- First Item
- Second Item
- Third Item
