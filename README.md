# turtle <img src="./images/turtle.png" alt="turtle" style="width: 32px; height: 32px;">

turtle is a Google Chrome extension that enhances bookmarking by allowing users to tag their bookmarks for easy organization and retrieval. The extension provides a simple and intuitive interface for adding tags to bookmarks, making it easier to categorize and find them later.

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

Follow these steps to load the extension in Google Chrome

Step 1: Navigate to Chromes extensions settings
  ![alt text](./images/Screenshot 2024-02-28 at 21.06.57.png)
Step 2: Click on `Load unpacked`
  ![alt text](./images/Screenshot 2024-02-28 at 21.07.18.png)
Step 3: Select the build folder
  ![alt text](./images/Screenshot 2024-02-28 at 21.07.49.png)
Step 4: The extensions will load up here
  ![alt text](./images/Screenshot 2024-02-28 at 21.07.58.png)
