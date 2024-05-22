# turtle <img src="./images/turtle.png" alt="turtle" style="width: 32px; height: 32px;">

turtle is a Google Chrome extension that enhances bookmarking by allowing users to tag their bookmarks for easy organization and retrieval. The extension provides a simple and intuitive interface for adding tags to bookmarks, making it easier to categorize and find them later.

### Screenshots
- Login
![alt text](<./documentation/Screenshot 2024-05-22 at 23.02.08.png>)

- Bookmarking
![Bookmarking](<./documentation/Screenshot 2024-05-22 at 23.01.57.png>)

- Lisiting Bookmarked Pages
![LisitingBookmarkedPages](<./documentation/Screenshot 2024-05-22 at 23.01.46.png>)


### Demo : [video](https://www.loom.com/share/aba116b65b3b4c1b8303cf9fc27b81fb?sid=add931b9-8987-45bc-b052-92978ea6ff5c)

### How to setup

- Clone the project

```bash
 git clone https://github.com/H4K3R13/turtle.git
```

- Change the directory

```bash
cd turtle
```

- Install node modules

```bash
yarn
```

- Build the project

```bash
yarn run build
```

- Create the .env.local in the root folder

```env
VITE_SECRET=<BASEROW_AUTH_TOKEN>
```

### Follow these steps to load the extension in Google Chrome

Step 1: Navigate to Chromes extensions settings
  ![image1](./images/Screenshot%202024-02-28%20at%2021.06.57.png)
Step 2: Click on `Load unpacked`
  ![image2](./images/Screenshot%202024-02-28%20at%2021.07.18.png)
Step 3: Select the build folder
  ![image3](./images/Screenshot%202024-02-28%20at%2021.07.49.png)
Step 4: The extensions will load up here
  ![image4](./images/Screenshot%202024-02-28%20at%2021.07.58.png)
