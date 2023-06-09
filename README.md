# Developer's Notebook

Developer's Notebook is intended to be a cross-platform, open-source application that provides developers a series of organizational tools.

## Release Notes

### 0.1.0
- [x] Get the base program running with Vue.js
- [x] Base structure and functionality
    - [x] Setup Sqlite database
    - [x] Setup database migration functionality
    - [x] Saved window status (size, position, maximized, etc) in separate JSON file
    - [x] Nav column on the left that switches views
    - [x] Light and dark themes and the ability to switch between them
    - [x] Main menu
- [ ] Categories
    - [x] Create categories
    - [x] Edit & delete categories
    - [x] Archive categories
    - [x] Pagination
    - [ ] Blank category overview page
    - [x] Sort categories
- [ ] Clients
    - [ ] Create clients
    - [ ] Edit & delete clients
    - [ ] Archive clients
    - [ ] Pagination
    - [ ] Blank client overview page
    - [ ] Add clients module to category overview page
    - [ ] Sort clients
- [ ] Preferences
    - [ ] Switch themes
    - [ ] Move database (similar to iTerm2's preferences)
- [x] Add Vue Routing to remember where the user was when the program is next launched. Save the user's location in localStorage when switching routes.
- [x] About modal
- [x] Back and forward navigation button using Vue's routing
- [x] Figure out a better way to have two themes with Vue's Single File Components
- [x] Component for showing notifications (errors, information, etc)


## Roadmap

### 0.2.0
- [ ] Projects
    - [ ] Create projects
    - [ ] Edit & delete projects
    - [ ] Finish projects
    - [ ] Pagination
    - [ ] Create project overview page
        - [ ] How much time did the project take?
            - Add up the time taken by issues and to dos
            - Start and end date of the project
    - [ ] Add projects to client overview page
    - [ ] Sort projects
- [ ] Issues
    - [ ] Pagination
- [ ] Allow raw SQL queries for clients, projects, to dos & issues. Show the database schema in a sidebar.
- [ ] Update category, client and project overview pages
- [ ] Search for projects, to dos, issues

### 0.3.0
- [ ] Dashboard
    - [ ] Logo?
    - [ ] Links to creating new projects, clients, to dos and issues
    - [ ] List of projects, to dos and issues due within the next week
- [ ] Tools (color picker/converter, image and file compression, etc)
- [ ] To dos
    - [ ] Pagination
- [ ] Update category, client and project overview pages
- [ ] Daily planning section

### 0.4.0
- [ ] Notes
    - [ ] Pagination
- [ ] Code cache
    - [ ] Pagination
- [ ] Allow raw SQL queries for notes & code cache. Show the database schema in a sidebar.
- [ ] Update category, client and project overview pages
- [ ] Search for code cache, notes
- [ ] Update dashboard with links to creating notes and new code stashes

### 0.5.0
- [ ] Collapsible utility sidebar (on the right side) with quick access to notes and todos
- [ ] Project status on the project overview page
    - [ ] Graph showing how much is finished/left based on how many issues and todos assigned to the project are finished
    - [ ] Time spent so far on project (or entirely on project if the project is finished)

### 1.0.0
- [ ] Command palette
- [ ] Spell checker: https://github.com/atom/node-spellchecker
- [ ] Check for updates
- [ ] When archiving a client, project or category, prompt the user to archive everything else assigned to it. If it is unarchived, prompt the user to unarchive everything assigned to it.

### 1.1.0
- [ ] Journal
    - [ ] Pagination
- [ ] Allow raw SQL queries for journal. Show the database schema in a sidebar.
- [ ] Update category, client and project overview pages
- [ ] Search for journal
- [ ] Update dashboard with links to creating journal entries

### 1.2.0
- [ ] Bookmarks
    - [ ] Pagination
- [ ] Allow raw SQL queries for bookmarks. Show the database schema in a sidebar.
- [ ] Search for bookmarks


### Future Ideas
- [ ] Custom UI theme
- [ ] Support for multiple databases


## Notes

- [TypeScript and Vue.js](https://github.com/Microsoft/TypeScript-Vue-Starter)
- Icons from https://glyph.smarticons.co and https://material.io/tools/icons/?style=sharp

---

Alex Seifert - https://www.alexseifert.com
